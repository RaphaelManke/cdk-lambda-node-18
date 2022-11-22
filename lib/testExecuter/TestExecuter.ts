import { Duration, RemovalPolicy } from "aws-cdk-lib";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { LogGroup, RetentionDays } from "aws-cdk-lib/aws-logs";
import {
  Pass,
  Chain,
  Parallel,
  Wait,
  WaitTime,
  StateMachine,
  StateMachineType,
  LogLevel,
} from "aws-cdk-lib/aws-stepfunctions";
import {
  CallAwsService,
  LambdaInvoke,
} from "aws-cdk-lib/aws-stepfunctions-tasks";
import { Construct } from "constructs";
import { resolve } from "path";

export class TestExecuter extends Construct {
  constructor(
    scope: Construct,
    id: string,
    {
      chunks,
      chunkSize,
      delayBetweenChunks,
      lambdaFunction,
    }: {
      chunks: number;
      chunkSize: number;
      delayBetweenChunks: Duration;
      lambdaFunction: Function;
    }
  ) {
    super(scope, id);
    const startState = new Pass(this, "Start");
    let definition = startState;
    let fanOutIterator: Chain | undefined = undefined;

    const updateLambdaConfigLambda = new NodejsFunction(
      this,
      "UpdateLambdaConfigLambda",
      {
        entry: resolve(__dirname,  "updateLambdaConfig.lambda.ts"),
        runtime: Runtime.NODEJS_16_X,
        environment: {
          LAMBDA_FUNCTION_NAME: lambdaFunction.functionName,
        },
      }
    );
    updateLambdaConfigLambda.addToRolePolicy(
      new PolicyStatement({
        actions: [
          "lambda:UpdateFunctionConfiguration",
          "lambda:GetFunctionConfiguration",
        ],
        resources: [lambdaFunction.functionArn],
      })
    );

    for (let chunk = 0; chunk < chunks; chunk++) {
      const modifyEnvVarInner = new LambdaInvoke(
        this,
        "UpdateFunctionConfiguration" + chunk,
        { lambdaFunction: updateLambdaConfigLambda }
      );
      const parrallelStates = new Parallel(this, "Fan out " + chunk);
      const fanOut = modifyEnvVarInner
        .next(
          new Wait(this, `Wait for lambda update ${chunk}`, {
            time: WaitTime.duration(delayBetweenChunks),
          })
        )
        .next(parrallelStates);

      for (let i = 0; i < chunkSize; i++) {
        const lambdaInvoke = new LambdaInvoke(
          this,
          `InvokeLambda-${chunk}-${i}`,
          {
            lambdaFunction: lambdaFunction,
            outputPath: "$.Payload",
          }
        );
        parrallelStates.branch(lambdaInvoke);
      }
      if (!fanOutIterator) {
        fanOutIterator = startState.next(fanOut);
      } else {
        fanOutIterator = fanOutIterator.next(fanOut);
      }
    }
    const logGroup = new LogGroup(this, "StateMachineLogs", {
      retention: RetentionDays.ONE_WEEK,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    new StateMachine(this, "StateMachine", {
      definition,
      stateMachineType: StateMachineType.EXPRESS,
      timeout: Duration.minutes(5),

      logs: {
        destination: logGroup,
        level: LogLevel.ALL,
        includeExecutionData: true,
      },
    });
  }
}

import { Stack, StackProps } from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";

export class CdkLambdaNode18Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new NodejsFunction(this, "Node18", {
      entry: "lib/lambda/node-18.ts",
      runtime: Runtime.NODEJS_18_X,
      bundling: {
        externalModules: ["@aws-sdk/*"],
      },
    });
  }
}

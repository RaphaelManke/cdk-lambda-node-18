import { Duration, Stack, StackProps } from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";

export class CdkLambdaNode18Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const node18 =  this.addFunction("Node18", "lib/lambda/node-18.ts");
    const node18Fetch = this.addFunction("Node18Fetch", "lib/lambda/node-18-fetch.ts");
    const node18AwsSdk = this.addFunction("Node18AwsSdk", "lib/lambda/node-18-aws-sdk.ts");

  }

  addFunction(
    id: string,
    entry: string,
    runtime: Runtime = Runtime.NODEJS_18_X
  ) {
    return new NodejsFunction(this, id, {
      entry,
      runtime,
      memorySize: 512,
      bundling: {
        externalModules: ["@aws-sdk/*"],
      },
    });
  }
}

import { Lambda } from "aws-sdk";
import { randomUUID } from "crypto";

const lambda = new Lambda();
export const handler = async () => {
  // read lambda function environment variables and update them
  const lambdaFunctionName = process.env["LAMBDA_FUNCTION_NAME"]!;
  const lambdaFunctionEnvironment = await lambda
    .getFunctionConfiguration({ FunctionName: lambdaFunctionName })
    .promise();
  const lambdaFunctionEnvironmentVariables =
    lambdaFunctionEnvironment.Environment?.Variables;

  console.log(
    "lambdaFunctionEnvironmentVariables",
    lambdaFunctionEnvironmentVariables
  );
  const newEnvVArs = {
    ...lambdaFunctionEnvironmentVariables,
    RANDOM_UUID: randomUUID(),
  };
  console.log("newEnvVArs", newEnvVArs);
  const resp = await lambda
    .updateFunctionConfiguration({
      FunctionName: lambdaFunctionName,
      Environment: { Variables: newEnvVArs },
    })
    .promise();
  console.log("resp", JSON.stringify(resp));
  return resp;
};

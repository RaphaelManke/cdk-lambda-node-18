import { STS } from "@aws-sdk/client-sts";

export const handler = async () => {
  const resp = await fetch("https://jsonplaceholder.typicode.com/todos/1").then(
    (response) => response.json()
  );
  const identity = await new STS({}).getCallerIdentity({});

  return { nodeVersion: process.version, fetchResult: resp, identity };
};

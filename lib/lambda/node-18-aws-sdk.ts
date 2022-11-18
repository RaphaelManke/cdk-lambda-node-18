import { STS } from "@aws-sdk/client-sts";

export const handler = async () => {
  const identity = await new STS({}).getCallerIdentity({});

  return { nodeVersion: process.version, identity };
};

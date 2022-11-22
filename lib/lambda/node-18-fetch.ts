export const handler = async () => {
  const resp = await fetch("https://jsonplaceholder.typicode.com/todos/1").then(
    (response) => response.json()
  );

  return { nodeVersion: process.version, fetchResult: resp };
};

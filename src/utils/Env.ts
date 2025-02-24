export const getEnvVariable = (key: string, defaultVar?: string): string => {
  let envVar = process.env[key] || defaultVar;

  if (!envVar) {
    throw new Error(`${key} is not defined in env`);
  }

  return envVar;
};

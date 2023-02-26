export const getEnvPath = (NODE_ENV: string) => {
  // if (NODE_ENV === "production") return ".env.production";
  console.log('NODE_ENV', NODE_ENV);
  return '.env.development'; // no env or env===prod
};

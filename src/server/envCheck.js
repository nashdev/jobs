const REQUIRED_PRODUCTION_CONFIGS = ["API_HOST"];

const checkForMissingConfigsProduction = (env) =>
  REQUIRED_PRODUCTION_CONFIGS.filter((configName) => !env[configName]);

// This could easily be extended for other environments or a composable set of
// base required environment variables
const missingRequiredConfigs = (env) => {
  if (env.NODE_ENV === "production") {
    return checkForMissingConfigsProduction(env);
  }
  return [];
};

// Why pass in the env? Injecting the object will make this easier to test if we
// wanted to unit test thist thing, as it would not require munging the test
// environment.
export default function ensureRequiredEnvVars(env) {
  const maybeMissingConfigs = missingRequiredConfigs(env);

  if (maybeMissingConfigs !== []) {
    return new Error(
      `Required configs missing: ${maybeMissingConfigs.join(", ")}`
    );
  }
  return true;
}

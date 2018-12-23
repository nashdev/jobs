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

// Why? This is to avoid the rake step
// (https://media.giphy.com/media/ghbWAmMQXZWV2/giphy.gif) of required
// environment variables not being set. In some cases those values fallback to
// defaults, but this function helps us fail fast so that it's easier to debug
// if something is missing that's required. As someone who has had to try to
// debug these issues only to find out it was a typo in an env var, I now try to
// add something like this to every project I work on.
//
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

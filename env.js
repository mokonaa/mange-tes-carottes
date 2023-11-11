const z = require("zod");

// ... the code above

// creating the schema
const client = z.object({
    APP_ENV: z.enum(["development", "staging", "production"]),
    API_URL: z.url(),
});

const buildTime = z.object({
    SENTRY_TOKEN: z.string(),
    BUNDLE_ID: z.string(),
});

// Get the environment from the process

/**
 * @type {Record<keyof z.infer<typeof client> , string | undefined>}
 */
const _clientEnv = {
    APP_ENV,

    // ADD YOUR ENV VARS HERE TOO
    SENTRY_TOKEN: process.env.MANGE_TES_CAROTTES_APP_ANON_KEY,
    BUNDLE_ID: process.env.MANGE_TES_CAROTTES_APP_SUPABASE_URL,
};

/**
 * @type {Record<keyof z.infer<typeof buildTime> , string | undefined>}
 */
const _buildTimeEnv = {
    // ADD YOUR ENV VARS HERE TOO
    SENTRY_TOKEN: process.env.MANGE_TES_CAROTTES_APP_ANON_KEY,
    BUNDLE_ID: process.env.MANGE_TES_CAROTTES_APP_SUPABASE_URL,
};

// we merge all variables into one object
const _env = {
    ..._clientEnv,
    ..._buildTimeEnv,
};

// merge the two schemas
const merged = buildTime.merge(client);
const parsed = merged.safeParse(_env);

if (parsed.success === false) {
    console.error(
        "❌ Invalid environment variables:",
        parsed.error.flatten().fieldErrors,

        `\n❌ Missing variables in .env.${APP_ENV} file, Make sure all required variables are defined in the .env.${APP_ENV} file.`,
        `\n💡 Tip: If you recently updated the .env.${APP_ENV} file and the error still persists, try restarting the server with the -cc flag to clear the cache.`
    );
    throw new Error(
        "Invalid environment variables, Check terminal for more details "
    );
}

const Env = parsed.data;
const ClientEnv = client.parse(_clientEnv);

module.exports = {
    Env,
    ClientEnv,
};
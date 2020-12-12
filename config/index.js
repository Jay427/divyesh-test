/**
 * Load env variable
 */
require("dotenv").config();

/**
 * Imports module
 */
const Joi = require('@hapi/joi');

/**
 * Env variable validation schema
 */
const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string()
        .allow('test', 'development', 'production')
        .default('development'),
    PORT: Joi.number().default(4000),
    BASE_URL: Joi.string().default('http://localhost:4000'),
    SQL_HOST: Joi.string().default('localhost'),
    SQL_DB_NAME: Joi.string().default('blog'),
    SQL_USERNAME: Joi.string().default('root'),
    SQL_PASSWORD: Joi.string().default(''),
}).unknown().required();

/**
 * Validate env variable
 */
const {
    error,
    value: envVars
} = envVarsSchema.validate(process.env);

if (error) {
    throw new Error(`Error :: Config validation error :: ${error.message}`);
}

/**
 * Config object
 */
const config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    baseUrl: envVars.BASE_URL,
    sql: {
        host: envVars.SQL_HOST,
        database: envVars.SQL_DB_NAME,
        user: envVars.SQL_USERNAME,
        password: envVars.SQL_PASSWORD,
    },
};

if (config.env === 'test') {

    config.sql.database = 'test_blog';

}

/**
 * Exports config
 */
module.exports = config;
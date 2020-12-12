/**
 * Import
 */
const config = require('./config');

/**
 * Sql configuration
 */
const sqlConnection = {
    client: 'mysql',
    connection: {
        host: config.sql.host,
        database: config.sql.database,
        user: config.sql.user,
        password: config.sql.password,
    },
    pool: {
        min: 2,
        max: 7
    },
    acquireConnectionTimeout: 60000,
    migrations: {
        tableName: 'migrations'
    }
};

/**
 * Export sql connection
 */
module.exports = sqlConnection;
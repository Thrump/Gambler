//Database setup
require('dotenv').config();
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: process.env.DATABASE
    },
    useNullAsDefault: true
});

module.exports.knex = knex;
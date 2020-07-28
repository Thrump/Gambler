# Gambler

[Link to Trello](https://trello.com/b/NU3IJV5r/droplootbot)



## Work in Progress Discord Bot


## Setting Up
* Create a development.sqlite3 file in the ./db subdirectory
* create a .env file with the properties: 
```
TOKEN="Your Discord Bot Key" 
DATABASE=./src/db/development.sqlite3
WET="Your openweather api key"
```
* create a config.json file with the properties: 
```json
{
    "prefix": "prefix of default bot",

    "ownerId": "Your discord ID"
}
```
* `npm install`
* `npm run migrate-up`
* `node main.js`

## Database Migrations

### Creating Migrations
When wanting to make changes to the database, you will need to create a database migration. To set it up, first create a migration file through this command:

`node node_modules/db-migrate/bin/db-migrate create MIGRATE_FILE_NAME --config src/db/database.json`

A new file should appear in the `./migrations` directory. Edit the file to reflect what you want to change in the database. ([Documentation for Migration API](https://db-migrate.readthedocs.io/en/latest/API/SQL/))


### Applying Migrations
To apply the migration to your database, run this in the console:

`node node_modules/db-migrate/bin/db-migrate up --config src/db/database.json`





# LootDropBot

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
* npm install
* node main.js





const knex = require('../db/knex').knex;

class User {
    // = Column =========================================
    userid;
    currency;

    // = Constructor ====================================
    constructor(userid) {
        this.userid = userid;
    }

    // = Update Methods =================================
    async update() {
        const exists = await knex.schema.hasTable('user');
        console.log(await knex.schema.hasTable('guild'));
        if (!exists) {
            await knex.schema.createTable('user', function(table) {
                table.bigInteger('user_id');
                table.integer('currency');
            })
        }

        let rows = await knex('user').select('*').where('user_id', '=', this.userid);
        if (rows.length == 0) {
            this.currency = 0;
            const user = {
                user_id: this.userid,
                currency: this.currency
            };
            await knex('user').insert(user);
        } else {
            this.currency = rows[0].currency
        }
        return this
    }

    async updateValue(key, value) {
        await knex('user').where('user_id', '=', this.userid).update({
            [key]: value
        })
    }

    // = Getters and Setters =============================

    setCurrency(currency) {
        this.currency = currency;
        this.updateValue('currency', currency);
    }
}

module.exports = {
    User: User
}
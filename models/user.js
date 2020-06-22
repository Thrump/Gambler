const knex = require('../main').knex;

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
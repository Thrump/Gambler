const knex = require('../main').knex;

class User {
    // = Column =========================================
    userid;
    currency;

    // = Constructor ====================================
    constructor(userid) {
        this.update(userid);
    }

    // = Update Methods =================================
    update(userid) {
        this.userid = userid
        knex('user').select('*').where('user_id', '=', this.userid)
            .then((rows) => {
                if (rows.length == 0) {
                    console.log('new user');
                    this.currency = 0;
                    const user = {
                        user_id: this.userid,
                        currency: this.currency
                    };
                    knex('user').insert(user)
                        .then(console.log("data inserted"))
                        .catch((err) => { console.log(err); throw err })
                        .finally(() => { knex.destroy() });
                } else {
                    console.log('existing user');
                    console.log(rows);
                    this.currency = rows[0].currency
                    console.log(rows[0].currency);
                }
            })
            .catch((err) => { console.log(err); throw err })
    }

    updateValue(key, value) {
        knex('user').where('user_id', '=', this.userid).update({
                [key]: value
            })
            .catch((err) => { console.log(err); throw err })
    }

    // = Getters and Setters =============================

    setCurrency(currency) {
        this.updateValue('currency', currency);
        this.currency = currency;
    }
}

module.exports = {
    User: User
}
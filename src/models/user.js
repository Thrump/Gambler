const knex = require('../db/knex').knex;

class User {
    // = Column =========================================
    userid;
    currency;
    rank;
    wins;
    losses;

    // = Constructor ====================================
    constructor(userid) {
        this.userid = userid;
    }

    // = Update Methods =================================
    async update() {
        let rows = await knex('user').select('*').where('user_id', '=', this.userid);
        if (rows.length == 0) {
            this.currency = 0;
            this.rank = 1;
            this.wins = 0;
            this.losses = 0;
            const user = {
                user_id: this.userid,
                currency: this.currency,
                rank: this.rank,
                wins: this.wins,
                losses: this.losses
            };
            await knex('user').insert(user);
        } else {
            this.currency = rows[0].currency
            this.rank = rows[0].rank;
            this.wins = rows[0].wins;
            this.losses = rows[0].losses;
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

    setRank(rank) {
        this.rank = rank;
        this.updateValue('rank', rank);
    }

    setWins(wins) {
        this.wins = wins;
        this.updateValue('wins', wins);
    }

    setLosses(losses) {
        this.losses = losses;
        this.updateValue('losses', losses);
    }

    static async getUsers() {
        const list = await knex.select().from('user');
        return list.map(x => {
            return {
                user_id: x.user_id.toString(),
                currency: x.currency,
                rank: x.rank,
                wins: x.wins,
                losses: x.losses
            }
        })
    }
}

module.exports = {
    User: User
}
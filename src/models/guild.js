const knex = require('../db/knex').knex;

class Guild {
    // = Column =========================================
    guildid;
    prefix;
    dropToggle;
    simpListener;

    // = Constructor ====================================
    constructor(guildid) {
        this.guildid = guildid;
    }

    // = Update Methods =================================
    async update() {
        const exists = await knex.schema.hasTable('guild');
        if (!exists) {
            await knex.schema.createTable('guild', function(table) {
                table.bigInteger('guild_id');
                table.string('prefix');
                table.boolean('drop_toggle');
                table.boolean('simp_listener');
            })
        }

        let row = await knex('guild').select('*').where('guild_id', '=', this.guildid);
        if (row.length == 0) {
            this.prefix = '$';
            this.dropToggle = false;
            this.simpListener = false;
            const guild = {
                guild_id: this.guildid,
                prefix: this.prefix,
                drop_toggle: this.dropToggle,
                simp_listener: this.simpListener
            };
            await knex('guild').insert(guild);
        } else {
            this.prefix = row[0].prefix;
            this.dropToggle = row[0].drop_toggle;
            this.simpListener = row[0].simp_listener;
        }
        return this
    }

    async updateValue(key, value) {
        await knex('guild').where('guild_id', '=', this.guildid).update({
            [key]: value
        })
    }

    // = Getters and Setters =============================

    setPrefix(prefix) {
        this.prefix = prefix;
        this.updateValue('prefix', prefix);
    }

    setDropToggle(dropToggle) {
        this.dropToggle = dropToggle;
        this.updateValue('drop_toggle', dropToggle);
    }

    setSimpListener(simp) {
        this.simpListener = simp;
        this.updateValue('simp_listener', simp);
    }
}

module.exports = {
    Guild: Guild
}
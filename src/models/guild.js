const knex = require('../db/knex').knex;

class Guild {
    // = Column =========================================
    guildid;
    prefix;
    dropToggle;

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
            })
        }

        let row = await knex('guild').select('*').where('guild_id', '=', this.guildid);
        if (row.length == 0) {
            this.prefix = '$';
            this.dropToggle = false;
            const guild = {
                guild_id: this.guildid,
                prefix: this.prefix,
                drop_toggle: this.dropToggle
            };
            await knex('guild').insert(guild);
        } else {
            this.prefix = row[0].prefix;
            this.dropToggle = row[0].drop_toggle;
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
}

module.exports = {
    Guild: Guild
}
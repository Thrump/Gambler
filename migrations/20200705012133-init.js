'use strict';

var dbm;
var type;
var seed;

var async = require('async');
/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
    dbm = options.dbmigrate;
    type = dbm.dataType;
    seed = seedLink;
};

exports.up = function(db, callback) {
    async.series([
        db.createTable.bind(db, 'user', {
            user_id: { type: 'bigint', primaryKey: true, notNull: true },
            currency: { type: 'bigint', notNull: true, defaultValue: 1 }
        }),
        db.createTable.bind(db, 'guild', {
            guild_id: { type: 'bigint', primaryKey: true, notNull: true },
            prefix: { type: 'string', notNull: true, defaultValue: '$' },
            drop_toggle: { type: 'boolean', notNull: true, defaultValue: false },
        })
    ], callback);
};

exports.down = function(db, callback) {
    async.series([
        db.dropTable.bind(db, 'user'),
        db.dropTable.bind(db, 'guild')
    ], callback)
};

exports._meta = {
    "version": 1
};
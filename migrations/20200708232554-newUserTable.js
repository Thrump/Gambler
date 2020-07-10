'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
    dbm = options.dbmigrate;
    type = dbm.dataType;
    seed = seedLink;
};

exports.up = function(db) {
    return db.runSql('CREATE TABLE user(user_id TEXT PRIMARY KEY,' +
        '\ncurrency INTEGER NOT NULL DEFAULT 0,\nrank INTEGER NOT NULL DEFAULT 1,' +
        '\nwins INTEGER NOT NULL DEFAULT 0,\nlosses INTEGER NOT NULL DEFAULT 0)')
};

exports.down = function(db) {
    return null;
};

exports._meta = {
    "version": 1
};
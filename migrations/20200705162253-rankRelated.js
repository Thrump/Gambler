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
        db.addColumn.bind(db, 'user', 'rank', {
            type: 'int',
            notNull: true,
            defaultValue: 1
        }),
        db.addColumn.bind(db, 'user', 'wins', {
            type: 'int',
            notNull: true,
            defaultValue: 0
        }),
        db.addColumn.bind(db, 'user', 'losses', {
            type: 'int',
            notNull: true,
            defaultValue: 0
        }),
    ], callback)
};

exports.down = function(db, callback) {
    async.series([
        db.removeColumn('db', 'user', 'rank'),
        db.removeColumn('db', 'user', 'wins'),
        db.removeColumn('db', 'user', 'losses'),
    ], callback)
};

exports._meta = {
    "version": 1
};
"use strict";

var test = require('tape');
var insertAt = require('./');

test('exist', function(t) {
    t.equal(typeof insertAt, 'function');
    t.end();
});

test('do nothing', function(t) {
    t.equal(insertAt(), undefined);
    t.equal(insertAt(null), undefined);
    t.equal(insertAt({}), undefined);
    t.equal(insertAt({
        style: {}
    }), undefined);
    t.end();
});

test('insert a number', function(t) {
    t.deepEqual(insertAt([], 2, 1), [2]);
    t.deepEqual(insertAt([3], 2, -1), [2, 3]);
    t.deepEqual(insertAt([3], 2, 0), [2, 3]);
    t.deepEqual(insertAt([3], 2, 1), [3, 2]);
    t.deepEqual(insertAt([1, 2], 3, 1), [1, 3, 2]);
    t.end();
});

test('insert a string', function(t) {
    t.deepEqual(insertAt(["a", "c"], "b", 1), ["a", "b","c"]);
    t.end();
});

test('insert an object', function(t) {
    t.deepEqual(insertAt([{a:1}, {b:2}], {c:3}, 1), [{a:1},{c:3},{b:2}]);
    t.end();
});

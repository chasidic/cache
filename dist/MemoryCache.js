"use strict";
const tslib_1 = require("tslib");
class MemoryCache {
    constructor() {
        this.memory = new Map();
    }
    clear() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.memory.clear();
        });
    }
    has(key) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.memory.has(key);
        });
    }
    remove(key) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.memory.delete(key);
        });
    }
    get(key) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.memory.get(key) || null;
        });
    }
    set(key, value) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.memory.set(key, value);
        });
    }
}
exports.MemoryCache = MemoryCache;

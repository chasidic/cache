"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
class MemoryCache {
    constructor() {
        this.memory = new Map();
    }
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            this.memory.clear();
        });
    }
    has(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.memory.has(key);
        });
    }
    remove(key) {
        return __awaiter(this, void 0, void 0, function* () {
            this.memory.delete(key);
        });
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.memory.get(key) || null;
        });
    }
    set(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            this.memory.set(key, value);
        });
    }
}
exports.MemoryCache = MemoryCache;

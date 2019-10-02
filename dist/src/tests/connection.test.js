"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const index_1 = require("../index");
const assert = require("assert");
describe('=> Repository connection', () => {
    it('Should connect to github repository', () => __awaiter(void 0, void 0, void 0, function* () {
        const Gitorm = new index_1.default({
            token: process.env.GIT_TOKEN,
            repository: process.env.GIT_REPOSITORY,
            owner: process.env.GIT_OWNER,
            log: false
        });
        yield Gitorm.connect();
        assert.notStrictEqual(Gitorm.status, false);
    }));
    it('Should fail to connect with incorrect [owner]', () => __awaiter(void 0, void 0, void 0, function* () {
        const Gitorm = new index_1.default({
            token: process.env.GIT_TOKEN,
            repository: process.env.GIT_REPOSITORY,
            owner: 'process.env.GIT_OWNER'
        });
        yield Gitorm.connect();
        assert.strictEqual(Gitorm.status, false);
    }));
    it('Should fail to connect with incorrect [repository]', () => __awaiter(void 0, void 0, void 0, function* () {
        const Gitorm = new index_1.default({
            token: process.env.GIT_TOKEN,
            repository: 'process.env.GIT_REPOSITORY',
            owner: process.env.GIT_OWNER
        });
        yield Gitorm.connect();
        assert.strictEqual(Gitorm.status, false);
    }));
    it('Should fail to connect with incorrect [token]', () => __awaiter(void 0, void 0, void 0, function* () {
        const Gitorm = new index_1.default({
            token: 'process.env.GIT_TOKEN',
            repository: process.env.GIT_REPOSITORY,
            owner: process.env.GIT_OWNER
        });
        yield Gitorm.connect();
        assert.strictEqual(Gitorm.status, false);
    }));
});
//# sourceMappingURL=connection.test.js.map
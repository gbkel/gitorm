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
describe('=> GET Request', () => {
    let Gitorm;
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        Gitorm = new index_1.default({
            token: process.env.GIT_TOKEN,
            repository: process.env.GIT_REPOSITORY,
            owner: process.env.GIT_OWNER
        });
        yield Gitorm.connect();
    }));
    it('Should get a file', () => __awaiter(void 0, void 0, void 0, function* () {
        const file = yield Gitorm.find({ path: 'src/' + 'index.txt' });
        assert.notStrictEqual(file, false);
    }));
    it('Should fail to get file with incorrect [path]', () => __awaiter(void 0, void 0, void 0, function* () {
        const file = yield Gitorm.find({ path: 'src/123/' + 'index.txt' });
        assert.strictEqual(file, false);
    }));
    it('Should fail to get file with incorrect [name]', () => __awaiter(void 0, void 0, void 0, function* () {
        const file = yield Gitorm.find({ path: 'src/' + 'index.png' });
        assert.strictEqual(file, false);
    }));
});
//# sourceMappingURL=find.test.js.map
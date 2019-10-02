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
const RandomNumber_1 = require("../utils/RandomNumber");
describe('=> PUT Request', () => {
    let Gitorm;
    let fileName;
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        Gitorm = new index_1.default({
            token: process.env.GIT_TOKEN,
            repository: process.env.GIT_REPOSITORY,
            owner: process.env.GIT_OWNER
        });
        yield Gitorm.connect();
        fileName = `test${RandomNumber_1.default(0, 1e10)}`;
    }));
    it('Should update a file', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = JSON.stringify({ teste: 123 });
        const file = yield Gitorm.create({
            data,
            path: 'src/' + `${fileName}.json`
        });
        const newData = JSON.stringify({ teste: 321 });
        const updatedFile = yield Gitorm.update({
            data: newData,
            path: file.path
        });
        assert.notStrictEqual(updatedFile, false);
    }));
});
//# sourceMappingURL=update.test.js.map
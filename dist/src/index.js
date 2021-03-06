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
const Api_1 = require("./modules/Api");
class Gitorm {
    constructor({ token, repository, owner, log = false }) {
        this._token = token;
        this._repository = repository;
        this._owner = owner;
        if (!log) {
            console.error = () => {
                return;
            };
        }
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const status = yield Api_1.default.get(`/repos/${this._owner}/${this._repository}`, {
                    headers: {
                        Authorization: 'token ' + this._token
                    }
                });
                this._status =
                    status && status.data && status.data.git_url
                        ? status.data.git_url
                        : false;
            }
            catch (error) {
                this._status = false;
                console.error(error);
            }
        });
    }
    find({ path }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._status)
                return false;
            try {
                const response = yield Api_1.default.get(`/repos/${this._owner}/${this._repository}/contents/${path}`, {
                    headers: {
                        Authorization: 'token ' + this._token
                    }
                });
                if (response.status !== 200)
                    return false;
                const file = response.data;
                if (!file)
                    return false;
                return {
                    name: file.name,
                    path: file.path,
                    sha: file.sha,
                    size: file.size,
                    url: file.url,
                    html_url: file.html_url,
                    git_url: file.git_url,
                    download_url: file.download_url,
                    type: file.type
                };
            }
            catch (error) {
                console.error(error);
                return false;
            }
        });
    }
    findAll({ path }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._status)
                return false;
            try {
                const response = yield Api_1.default.get(`/repos/${this._owner}/${this._repository}/contents/${path}`, {
                    headers: {
                        Authorization: 'token ' + this._token
                    }
                });
                if (response.status !== 200)
                    return false;
                const files = response.data;
                if (!files || files.length === 0)
                    return false;
                return files;
            }
            catch (error) {
                console.error(error);
                return false;
            }
        });
    }
    create({ data, path, message = 'Create', branch = 'master' }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._status)
                return false;
            try {
                const fileExists = yield this.find({ path });
                if (fileExists)
                    return false;
                const response = yield Api_1.default.put(`/repos/${this._owner}/${this._repository}/contents/${path}`, {
                    message,
                    content: Buffer.from(data).toString('base64'),
                    branch
                }, {
                    headers: {
                        Authorization: 'token ' + this._token
                    }
                });
                if (response.status !== 200 &&
                    response.status !== 201 &&
                    response.status !== 422)
                    return false;
                const file = response.data.content;
                return {
                    name: file.name,
                    path: file.path,
                    sha: file.sha,
                    size: file.size,
                    url: file.url,
                    html_url: file.html_url,
                    git_url: file.git_url,
                    download_url: file.download_url,
                    type: file.type
                };
            }
            catch (error) {
                console.error(error);
                return false;
            }
        });
    }
    update({ data, path, message = 'Update' }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._status)
                return false;
            try {
                const fileExists = yield this.find({ path });
                if (!fileExists)
                    return false;
                const response = yield Api_1.default.put(`/repos/${this._owner}/${this._repository}/contents/${fileExists.path}`, {
                    message,
                    content: Buffer.from(data).toString('base64'),
                    sha: fileExists.sha
                }, {
                    headers: {
                        Authorization: 'token ' + this._token
                    }
                });
                if (response.status !== 200)
                    return false;
                const file = response.data.content;
                return {
                    name: file.name,
                    path: file.path,
                    sha: file.sha,
                    size: file.size,
                    url: file.url,
                    html_url: file.html_url,
                    git_url: file.git_url,
                    download_url: file.download_url,
                    type: file.type
                };
            }
            catch (error) {
                console.error(error);
                return false;
            }
        });
    }
    delete({ path, message = 'Delete' }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._status)
                return false;
            try {
                const fileExists = yield this.find({ path });
                if (!fileExists)
                    return false;
                const response = yield Api_1.default.delete(`/repos/${this._owner}/${this._repository}/contents/${fileExists.path}`, {
                    data: {
                        message,
                        sha: fileExists.sha
                    },
                    headers: {
                        Authorization: 'token ' + this._token
                    }
                });
                if (response.status !== 200)
                    return false;
                return true;
            }
            catch (error) {
                console.error(error);
                return false;
            }
        });
    }
    get status() {
        return this._status;
    }
}
exports.default = Gitorm;
module.exports = Gitorm;
module.exports.default = Gitorm;
//# sourceMappingURL=index.js.map
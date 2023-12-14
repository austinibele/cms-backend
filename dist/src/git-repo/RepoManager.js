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
exports.RepoManager = void 0;
const rest_1 = require("@octokit/rest");
const js_base64_1 = require("js-base64");
class RepoManager {
    constructor(args) {
        this.owner = args.owner;
        this.repo = args.repo;
        this.branch = args.branch;
        this.commitMessage = args.commitMessage;
        this.rootPath = args.rootPath;
        this.octokit = new rest_1.Octokit(Object.assign({ auth: args.token }, (args.octokitOptions || {})));
    }
    onPut(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            let sha;
            const path = this.rootPath ? `${this.rootPath}/${key}` : key;
            try {
                const { 
                // @ts-ignore
                data: { sha: existingSha }, } = yield this.octokit.repos.getContent({
                    owner: this.owner,
                    repo: this.repo,
                    path: path,
                    ref: this.branch,
                });
                sha = existingSha;
            }
            catch (e) {
                // Will error if file is not on remote, but that's ok
            }
            try {
                yield this.octokit.repos.createOrUpdateFileContents({
                    owner: this.owner,
                    repo: this.repo,
                    path: path,
                    message: this.commitMessage || 'Edited with AustinCMS',
                    content: js_base64_1.Base64.encode(value),
                    branch: this.branch,
                    sha,
                });
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    onDelete(key) {
        return __awaiter(this, void 0, void 0, function* () {
            let sha;
            const path = this.rootPath ? `${this.rootPath}/${key}` : key;
            try {
                const { 
                // @ts-ignore
                data: { sha: existingSha }, } = yield this.octokit.repos.getContent({
                    owner: this.owner,
                    repo: this.repo,
                    path: path,
                    ref: this.branch,
                });
                sha = existingSha;
            }
            catch (e) { }
            if (sha) {
                yield this.octokit.repos.deleteFile({
                    owner: this.owner,
                    repo: this.repo,
                    path: path,
                    message: this.commitMessage || 'Edited with AustinCMS',
                    branch: this.branch,
                    sha,
                });
            }
            else {
                throw new Error(`Could not find file ${path} in repo ${this.owner}/${this.repo}`);
            }
        });
    }
}
exports.RepoManager = RepoManager;

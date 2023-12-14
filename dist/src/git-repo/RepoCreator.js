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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepoCreator = void 0;
const rest_1 = require("@octokit/rest");
const auth_token_1 = require("@octokit/auth-token");
const fs_1 = require("fs");
const child_process_1 = require("child_process");
const util_1 = require("util");
const path_1 = __importDefault(require("path"));
const execAsync = (0, util_1.promisify)(child_process_1.exec);
class RepoCreator {
    constructor(args) {
        this.owner = args.owner;
        this.token = args.token;
        this.octokitOptions = args.octokitOptions;
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            const auth = (0, auth_token_1.createTokenAuth)(this.token);
            const { token } = yield auth();
            this.octokit = new rest_1.Octokit(Object.assign({ auth: token }, (this.octokitOptions || {})));
        });
    }
    createRemoteRepo(repoName, repoDescription = '', isPrivate = true) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.octokit.repos.createForAuthenticatedUser({
                    name: repoName,
                    description: repoDescription,
                    private: isPrivate,
                });
                return response;
            }
            catch (error) {
                console.error('Error creating repository:', error);
                throw error;
            }
        });
    }
    createLocalRepo(repoPath, remoteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fs_1.promises.mkdir(repoPath, { recursive: true });
                yield execAsync('git init', { cwd: repoPath });
                yield execAsync(`git remote add origin ${remoteUrl}`, { cwd: repoPath });
                console.log(`Repository initialized and linked to remote at ${repoPath}`);
            }
            catch (error) {
                console.error('Error setting up local repository:', error);
                throw error;
            }
        });
    }
    createRepoLocalAndRemote(repoName, localPath, repoDescription = '', isPrivate = true) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const remoteRepoData = yield this.createRemoteRepo(repoName, repoDescription, isPrivate);
                const remoteUrl = `https:github.com/${this.owner}/${repoName}.git`;
                yield this.createLocalRepo(localPath, remoteUrl);
                const gitDir = path_1.default.join(localPath, '.git');
                const gitDirExists = yield fs_1.promises.stat(gitDir).then(() => true).catch(() => false);
                if (!gitDirExists) {
                    throw new Error('Error creating local repository');
                }
                console.log(`Local and remote repositories for '${repoName}' created successfully.`);
                return { success: gitDirExists };
            }
            catch (error) {
                console.error('Error creating local and remote repositories:', error);
                throw error;
            }
        });
    }
}
exports.RepoCreator = RepoCreator;

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
const RepoCreator_1 = require("../../src/git-repo/RepoCreator");
const chai_1 = require("chai");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
require("dotenv").config({ path: "../cms/.env.local" });
describe('RepoCreator Tests', () => {
    xit('should create a new repository', () => __awaiter(void 0, void 0, void 0, function* () {
        const args = {
            owner: process.env.GITHUB_OWNER,
            token: process.env.GITHUB_TOKEN,
        };
        const repoCreator = new RepoCreator_1.RepoCreator(args);
        yield repoCreator.initialize();
        const repoData = yield repoCreator.createRemoteRepo('test-repo', 'test-description');
        (0, chai_1.expect)(repoData.status).to.equal(201);
    }));
    xit('should fail to create repository with same name', () => __awaiter(void 0, void 0, void 0, function* () {
        const args = {
            owner: process.env.GITHUB_OWNER,
            token: process.env.GITHUB_TOKEN,
        };
        const repoCreator = new RepoCreator_1.RepoCreator(args);
        yield repoCreator.initialize();
        try {
            const repoData = yield repoCreator.createRemoteRepo('test-repo', 'test-description');
            throw new Error('Expected method to throw an error due to duplicate repo name, but it did not');
        }
        catch (error) {
            (0, chai_1.expect)(error.response.status).to.equal(422); // Asserting the status code is 422
        }
    }));
    xit('should create a local repository and link it to remote', () => __awaiter(void 0, void 0, void 0, function* () {
        const args = {
            owner: process.env.GITHUB_OWNER,
            token: process.env.GITHUB_TOKEN,
        };
        const repoCreator = new RepoCreator_1.RepoCreator(args);
        yield repoCreator.initialize();
        const localPath = '../test-repo';
        const remoteUrl = 'https://github.com/austinibele/test-repo.git';
        yield repoCreator.createLocalRepo(localPath, remoteUrl);
        // Check if the directory exists
        const dirExists = yield fs_1.promises.stat(localPath).then(() => true).catch(() => false);
        (0, chai_1.expect)(dirExists, 'Local repository directory should exist').to.be.true;
        // Check if the directory is a Git repository
        const gitDir = path_1.default.join(localPath, '.git');
        const gitDirExists = yield fs_1.promises.stat(gitDir).then(() => true).catch(() => false);
        (0, chai_1.expect)(gitDirExists, 'Local repository should be a git repository').to.be.true;
        // Cleanup: Delete the local repository
        yield fs_1.promises.rm(localPath, { recursive: true, force: true });
    }));
    xit('should create a local and remote repository and link them', () => __awaiter(void 0, void 0, void 0, function* () {
        const args = {
            owner: process.env.GITHUB_OWNER,
            token: process.env.GITHUB_TOKEN,
        };
        const repoCreator = new RepoCreator_1.RepoCreator(args);
        yield repoCreator.initialize();
        const repoName = 'test-repo';
        const localPath = `../${repoName}`;
        const repoDescription = 'This is a test repository';
        const res = yield repoCreator.createRepoLocalAndRemote(repoName, localPath, repoDescription);
        (0, chai_1.expect)(res.success).to.be.true;
    }));
});

import { RepoCreator } from '../../src/git-repo/RepoCreator';
import { expect } from "chai";
import { promises as fs } from 'fs';
import path from 'path';
require("dotenv").config({ path: "../cms/.env.local" });

describe('RepoCreator Tests', () => {

  
  xit('should create a new repository', async () => { // xit skips the test

    const args = {
        owner: process.env.GITHUB_OWNER as string,
        token: process.env.GITHUB_TOKEN as string,
    }
    const repoCreator = new RepoCreator(args)    
    await repoCreator.initialize();
    
    const repoData = await repoCreator.createRemoteRepo('test-repo', 'test-description');
    expect(repoData.status).to.equal(201);
  });

  xit('should fail to create repository with same name', async () => {

    const args = {
        owner: process.env.GITHUB_OWNER as string,
        token: process.env.GITHUB_TOKEN as string,
    }
    const repoCreator = new RepoCreator(args)    
    await repoCreator.initialize();
    
    try {
      const repoData = await repoCreator.createRemoteRepo('test-repo', 'test-description');
      throw new Error('Expected method to throw an error due to duplicate repo name, but it did not');
    } catch (error: any) {
      expect(error.response.status).to.equal(422); // Asserting the status code is 422
    }
  });

  xit('should create a local repository and link it to remote', async () => { // xit skips the test
    const args = {
      owner: process.env.GITHUB_OWNER as string,
      token: process.env.GITHUB_TOKEN as string,
    }
    const repoCreator = new RepoCreator(args);    
    await repoCreator.initialize();
    
    const localPath = '../test-repo';
    const remoteUrl = 'https://github.com/austinibele/test-repo.git';
    await repoCreator.createLocalRepo(localPath, remoteUrl);

    // Check if the directory exists
    const dirExists = await fs.stat(localPath).then(() => true).catch(() => false);
    expect(dirExists, 'Local repository directory should exist').to.be.true;

    // Check if the directory is a Git repository
    const gitDir = path.join(localPath, '.git');
    const gitDirExists = await fs.stat(gitDir).then(() => true).catch(() => false);
    expect(gitDirExists, 'Local repository should be a git repository').to.be.true;

    // Cleanup: Delete the local repository
    await fs.rm(localPath, { recursive: true, force: true });
  });

  xit('should create a local and remote repository and link them', async () => {
    const args = {
      owner: process.env.GITHUB_OWNER as string,
      token: process.env.GITHUB_TOKEN as string,
    }
    const repoCreator = new RepoCreator(args);    
    await repoCreator.initialize();

    const repoName = 'test-repo';
    const localPath = `../${repoName}`;
    const repoDescription = 'This is a test repository';

    const res = await repoCreator.createRepoLocalAndRemote(repoName, localPath, repoDescription);
    expect(res.success).to.be.true;
  });

});

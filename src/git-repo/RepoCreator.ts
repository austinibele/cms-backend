import { Octokit } from '@octokit/rest';
import { createTokenAuth } from '@octokit/auth-token';
import { promises as fs } from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

type OctokitOptions = ConstructorParameters<typeof Octokit>[0];

export interface RepoCreatorOptions {
  owner: string;
  token: string;
  octokitOptions?: OctokitOptions;
}

export class RepoCreator {
  octokit!: Octokit;
  owner: string;
  private token: string;
  private octokitOptions?: OctokitOptions;

  constructor(args: RepoCreatorOptions) {
    this.owner = args.owner;
    this.token = args.token;
    this.octokitOptions = args.octokitOptions;
  }

  async initialize() {
    const auth = createTokenAuth(this.token);
    const { token } = await auth();
    this.octokit = new Octokit({
      auth: token,
      ...(this.octokitOptions || {}),
    });
  }

  async createRemoteRepo(repoName: string, repoDescription = '', isPrivate = true) {
    try {
      const response = await this.octokit.repos.createForAuthenticatedUser({
        name: repoName,
        description: repoDescription,
        private: isPrivate,
      });
      return response;
    } catch (error) {
      console.error('Error creating repository:', error);
      throw error;
    }
  }

  async createLocalRepo(repoPath: string, remoteUrl: string): Promise<void> {
    try {
      await fs.mkdir(repoPath, { recursive: true });
      await execAsync('git init', { cwd: repoPath });
      await execAsync(`git remote add origin ${remoteUrl}`, { cwd: repoPath });
      console.log(`Repository initialized and linked to remote at ${repoPath}`);
    } catch (error) {
      console.error('Error setting up local repository:', error);
      throw error;
    }
  }

  async createRepoLocalAndRemote(repoName: string, localPath: string, repoDescription = '', isPrivate = true) {
    try {
      const remoteRepoData = await this.createRemoteRepo(repoName, repoDescription, isPrivate);
      const remoteUrl = `https:github.com/${this.owner}/${repoName}.git`
      await this.createLocalRepo(localPath, remoteUrl);
      const gitDir = path.join(localPath, '.git');
      const gitDirExists = await fs.stat(gitDir).then(() => true).catch(() => false);
      if (!gitDirExists) {
        throw new Error('Error creating local repository');
      }
      console.log(`Local and remote repositories for '${repoName}' created successfully.`);
      return {success: gitDirExists}
    } catch (error) {
      console.error('Error creating local and remote repositories:', error);
      throw error;
    }
  }
}

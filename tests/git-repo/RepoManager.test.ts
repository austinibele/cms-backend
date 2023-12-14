import { expect } from 'chai';
import { RepoManager } from '../../src/git-repo/RepoManager';
import { Octokit } from '@octokit/rest';
import fs from 'fs';
require("dotenv").config({ path: "../cms/.env.local" });

describe('RepoManager Integration Tests', () => {

  const options = {
    owner: process.env.GITHUB_OWNER as string,
    repo: 'test-repo',
    token: process.env.GITHUB_TOKEN as string,
    branch: 'main',
    commitMessage: 'Integration test commit message',
    rootPath: '',
  };

  const repoManager = new RepoManager(options);

  xit('should create or update a file', async () => {
    const key = 'test-file.txt';
    const value = 'Hello World!';

    await repoManager.onPut(key, value);
    console.log('File created/updated successfully.')
    // Retrieve the file content to verify it was created/updated
    const octokit = new Octokit({ auth: options.token });
    const response = await octokit.repos.getContent({
      owner: options.owner,
      repo: options.repo,
      path: key,
      ref: options.branch,
    });

    // Assert the response is for a single file, not a directory
    const fileData = response.data as any; // Cast to 'any' to bypass TypeScript restrictions for demonstration purposes

    expect(fileData.content.replace("\n", "")).to.equal(Buffer.from(value).toString('base64').replace("\n", ""));
    expect(fileData.type).to.equal('file');
  });

  xit('should delete a file', async () => {
    const key = 'test-file.txt';
    
    // First ensure the file exists by creating it
    await repoManager.onPut(key, 'Content to delete');

    // Now delete the file
    await repoManager.onDelete(key);

    // Attempt to retrieve the file content to verify deletion
    const octokit = new Octokit({ auth: options.token });
    
    try {
      await octokit.repos.getContent({
        owner: options.owner,
        repo: options.repo,
        path: key,
        ref: options.branch,
      });
      fail('The file should have been deleted but was still found.');
    } catch (error: any) {
      expect(error.status).to.equal(404);
    }
  });
});




// import { RepoManager } from '../../src/git-repo/RepoManager';
// import { Octokit } from '@octokit/rest';

// jest.mock('@octokit/rest');

// const mockOctokit = Octokit as jest.MockedClass<typeof Octokit>;

// describe('RepoManager', () => {
//   const options = {
//     owner: 'test-owner',
//     repo: 'test-repo',
//     token: 'test-token',
//     branch: 'main',
//     commitMessage: 'Test commit message',
//     rootPath: '../test-repo',
//   };

//   let repoManager: RepoManager;

//   beforeEach(() => {
//     // Reset the mock state before each test
//     mockOctokit.prototype.repos.getContent.mockReset();
//     mockOctokit.prototype.repos.createOrUpdateFileContents.mockReset();
//     mockOctokit.prototype.repos.deleteFile.mockReset();

//     // Initialize the RepoManager instance before each test
//     repoManager = new RepoManager(options);
//   });

//   describe('onPut', () => {
//     it('should create a new file if it does not exist', async () => {
//       // Mock the getContent call to simulate a non-existent file
//       mockOctokit.prototype.repos.getContent.mockRejectedValueOnce(new Error());

//       await repoManager.onPut('new-file.txt', 'file content');

//       // Check if createOrUpdateFileContents was called with correct parameters
//       expect(mockOctokit.prototype.repos.createOrUpdateFileContents).toHaveBeenCalledWith({
//         owner: options.owner,
//         repo: options.repo,
//         path: `${options.rootPath}/new-file.txt`,
//         message: options.commitMessage,
//         content: expect.any(String),
//         branch: options.branch,
//         sha: undefined, // No SHA since it's a new file
//       });
//     });

//     it('should update an existing file', async () => {
//       const fakeSha = 'fakeSha123';
      
//       // Mock the getContent call to simulate an existing file with a SHA
//       mockOctokit.prototype.repos.getContent.mockResolvedValueOnce({
//         data: { sha: fakeSha },
//       });

//       await repoManager.onPut('existing-file.txt', 'updated content');

//       // Check if createOrUpdateFileContents was called with correct parameters including the SHA
//       expect(mockOctokit.prototype.repos.createOrUpdateFileContents).toHaveBeenCalledWith({
//         owner: options.owner,
//         repo: options.repo,
//         path: `${options.rootPath}/existing-file.txt`,
//         message: options.commitMessage,
//         content: expect.any(String),
//         branch: options.branch,
//         sha: fakeSha, // Existing SHA for the file to be updated
//       });
//     });
//   });

//   describe('onDelete', () => {
//     it('should delete an existing file', async () => {
//       const fakeSha = 'fakeSha123';

//       // Mock the getContent call to simulate an existing file with a SHA
//       mockOctokit.prototype.repos.getContent.mockResolvedValueOnce({
//         data: { sha: fakeSha },
//       });

//       await repoManager.onDelete('file-to-delete.txt');

//       // Check if deleteFile was called with correct parameters including the SHA
//       expect(mockOctokit.prototype.repos.deleteFile).toHaveBeenCalledWith({
//         owner: options.owner,
//         repo: options.repo,
//         path: `${options.rootPath}/file-to-delete.txt`,
//         message: options.commitMessage,
//         branch: options.branch,
//         sha: fakeSha, // SHA of the file to be deleted
//       });
//     });

//     it('should throw an error if the file does not exist', async () => {
//       // Mock the getContent call to simulate a non-existent file
//       mockOctokit.prototype.repos.getContent.mockRejectedValueOnce(new Error());

//       await expect(repoManager.onDelete('nonexistent-file.txt')).rejects.toThrowError();

//       // Ensure deleteFile was not called since the file does not exist
//       expect(mockOctokit.prototype.repos.deleteFile).not.toHaveBeenCalled();
//     });
//   });
// });
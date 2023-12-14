import fs from 'fs';
import fspromise from 'fs/promises';
import util from 'util';
import path from 'path';
import { CONTENT_DIRECTORY_PATH } from '../config';

const access = util.promisify(fs.access);
const readdir = util.promisify(fs.readdir);
const readFromFileSystem = util.promisify(fs.readFile);

class FileSystemUtils {
    static async fileExists(path: string): Promise<boolean> {
        try {
            await access(path, fs.constants.F_OK);
            return true;
        } catch {
            return false;
        }
    }

    static async listFilesInDirectory(directoryPath: string): Promise<string[]> {
        try {
            return await readdir(directoryPath);
        } catch (error) {
            throw new Error('Error reading directory');
        }
    }

    static async readFile(filePath: string): Promise<string> {
        try {
            return await readFromFileSystem(filePath, 'utf8');
        } catch (error: any) {
            if (error.code === 'ENOENT') {
                throw new Error('Content not found');
            }
            throw error;
        }
    }

    static async deleteFile(relativePath: string): Promise<void> {
        const filePath = path.resolve(CONTENT_DIRECTORY_PATH, relativePath);
        await fspromise.unlink(filePath);
    }

    static async saveFile(contentOption: string, segment: string, data: any): Promise<void> {
        const directoryPath = path.resolve(CONTENT_DIRECTORY_PATH, contentOption);
        const filePath = path.join(directoryPath, `${segment}.json`);
        await fspromise.writeFile(filePath, JSON.stringify(data, null, 2));
    }
}

export default FileSystemUtils;
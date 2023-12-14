// src/services/contentPaths.service.ts

import path from 'path';
import FileSystemUtils from '../utils/fileSystem.utils';
import { CONTENT_DIRECTORY_PATH } from '../config';

export const getContentPaths = async (contentOption: string): Promise<string[]> => {
    const directoryPath = path.resolve(CONTENT_DIRECTORY_PATH, contentOption);
    if (!(await FileSystemUtils.fileExists(directoryPath))) {
        throw new Error('Content option not found');
    }

    const files = await FileSystemUtils.listFilesInDirectory(directoryPath);
    return files.filter(file => path.extname(file) === '.json').map(file => path.basename(file, '.json'));
};
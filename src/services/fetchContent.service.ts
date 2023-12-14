// src/services/fetchContent.service.ts
import path from 'path';
import FileSystemUtils from '../utils/fileSystem.utils';
import { CONTENT_DIRECTORY_PATH } from '../config';

export const fetchContent = async (contentOption: string, segment: string): Promise<string> => {
    const filePath = path.resolve(CONTENT_DIRECTORY_PATH, contentOption, `${segment}.json`);
    return await FileSystemUtils.readFile(filePath);
};
import { Request, Response } from 'express';
import FileSystemUtils from '../utils/fileSystem.utils';

interface ContentItem {
    contentOption: string;
    segment: string;
    data: any;
}

export const saveDataController = async (req: Request<{}, {}, ContentItem>, res: Response) => {
    const { contentOption, segment, data } = req.body;

    if (!isValidContentOption(contentOption)) {
        res.status(400).json({ message: 'Invalid content option' });
        return;
    }

    try {
        await FileSystemUtils.saveFile(contentOption, segment, data);
        res.status(200).json({ message: 'Data saved successfully.' });
    } catch (error) {
        console.error('Error writing to file', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

const isValidContentOption = (contentOption: string): boolean => {
    return typeof contentOption === 'string' &&
           !contentOption.includes('/') &&
           !contentOption.includes('.json');
};
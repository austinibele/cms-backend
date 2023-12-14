import { Request, Response } from 'express';
import FileSystemUtils from '../utils/fileSystem.utils';

export const deleteDataController = async (req: Request, res: Response) => {
    const { deletePath } = req.body;

    try {
        await FileSystemUtils.deleteFile(deletePath);
        res.json({ message: 'Data deleted successfully.' });
    } catch (error: any) {
        console.error('Error deleting file', error);
        if (error.code === 'ENOENT') {
            res.status(404).json({ message: 'File not found' });
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};
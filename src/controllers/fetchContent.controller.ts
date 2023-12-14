// src/controllers/fetchContent.controller.ts

import { Request, Response } from 'express';
import { fetchContent } from '../services/fetchContent.service';

export const fetchContentController = async (req: Request, res: Response) => {
    const { contentOption, segment } = req.params;
    try {
        const content = await fetchContent(contentOption, segment);
        res.json(content);
    } catch (error: any) {
        if (error.message === 'Content not found') {
            res.status(404).send(error.message);
        } else {
            res.status(500).send('Error reading content');
        }
    }
};
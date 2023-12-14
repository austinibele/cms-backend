// src/controllers/contentPaths.controller.ts

import { Request, Response } from 'express';
import { getContentPaths } from '../services/contentPaths.service';

export const getContentPathsController = async (req: Request, res: Response) => {
    const { contentOption } = req.params;
    try {
        const segments = await getContentPaths(contentOption);
        res.json(segments);
    } catch (error: any) {
        if (error.message === 'Content option not found') {
            res.status(404).send(error.message);
        } else {
            res.status(500).send('Error processing request');
        }
    }
};
// src/middleware/fileExists.ts
import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

export const fileExists = (basePath: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { imageName } = req.params;
    const filePath = path.resolve(basePath, imageName);

    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        console.error('Error finding file:', err);
        res.status(404).send('Not Found');
      } else {
        // Store the resolved file path in the request object for later use
        res.locals.filePath = filePath;
        next();
      }
    });
  };
};
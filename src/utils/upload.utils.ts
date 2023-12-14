// src/utils/upload.ts
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const createFileFilter = (allowedTypes: RegExp) => {
  return (file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type!'));
    }
  };
};

export const createMulterUpload = (uploadDir: string, allowedTypes: RegExp) => {
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      fs.access(uploadDir, (err) => {
        if (err) {
          return fs.mkdir(uploadDir, { recursive: true }, (error) => cb(error, uploadDir));
        } else {
          return cb(null, uploadDir);
        }
      });
    },
    filename(req, file, cb) {
      cb(null, `${file.fieldname}-${uuidv4()}${path.extname(file.originalname)}`);
    },
  });

  return multer({
    storage,
    fileFilter(req, file, cb) {
      createFileFilter(allowedTypes)(file, cb);
    },
  });
};
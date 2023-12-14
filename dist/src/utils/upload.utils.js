"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMulterUpload = exports.createFileFilter = void 0;
// src/utils/upload.ts
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const createFileFilter = (allowedTypes) => {
    return (file, cb) => {
        const extname = allowedTypes.test(path_1.default.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        }
        else {
            cb(new Error('Invalid file type!'));
        }
    };
};
exports.createFileFilter = createFileFilter;
const createMulterUpload = (uploadDir, allowedTypes) => {
    const storage = multer_1.default.diskStorage({
        destination(req, file, cb) {
            fs_1.default.access(uploadDir, (err) => {
                if (err) {
                    return fs_1.default.mkdir(uploadDir, { recursive: true }, (error) => cb(error, uploadDir));
                }
                else {
                    return cb(null, uploadDir);
                }
            });
        },
        filename(req, file, cb) {
            cb(null, `${file.fieldname}-${(0, uuid_1.v4)()}${path_1.default.extname(file.originalname)}`);
        },
    });
    return (0, multer_1.default)({
        storage,
        fileFilter(req, file, cb) {
            (0, exports.createFileFilter)(allowedTypes)(file, cb);
        },
    });
};
exports.createMulterUpload = createMulterUpload;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileExists = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const fileExists = (basePath) => {
    return (req, res, next) => {
        const { imageName } = req.params;
        const filePath = path_1.default.resolve(basePath, imageName);
        fs_1.default.access(filePath, fs_1.default.constants.F_OK, (err) => {
            if (err) {
                console.error('Error finding file:', err);
                res.status(404).send('Not Found');
            }
            else {
                // Store the resolved file path in the request object for later use
                res.locals.filePath = filePath;
                next();
            }
        });
    };
};
exports.fileExists = fileExists;

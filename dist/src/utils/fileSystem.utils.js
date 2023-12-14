"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const promises_1 = __importDefault(require("fs/promises"));
const util_1 = __importDefault(require("util"));
const path_1 = __importDefault(require("path"));
const config_1 = require("../config");
const access = util_1.default.promisify(fs_1.default.access);
const readdir = util_1.default.promisify(fs_1.default.readdir);
const readFromFileSystem = util_1.default.promisify(fs_1.default.readFile);
class FileSystemUtils {
    static fileExists(path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield access(path, fs_1.default.constants.F_OK);
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
    static listFilesInDirectory(directoryPath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield readdir(directoryPath);
            }
            catch (error) {
                throw new Error('Error reading directory');
            }
        });
    }
    static readFile(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield readFromFileSystem(filePath, 'utf8');
            }
            catch (error) {
                if (error.code === 'ENOENT') {
                    throw new Error('Content not found');
                }
                throw error;
            }
        });
    }
    static deleteFile(relativePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const filePath = path_1.default.resolve(config_1.CONTENT_DIRECTORY_PATH, relativePath);
            yield promises_1.default.unlink(filePath);
        });
    }
    static saveFile(contentOption, segment, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const directoryPath = path_1.default.resolve(config_1.CONTENT_DIRECTORY_PATH, contentOption);
            const filePath = path_1.default.join(directoryPath, `${segment}.json`);
            yield promises_1.default.writeFile(filePath, JSON.stringify(data, null, 2));
        });
    }
}
exports.default = FileSystemUtils;

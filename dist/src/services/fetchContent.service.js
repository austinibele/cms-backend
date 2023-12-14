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
exports.fetchContent = void 0;
// src/services/fetchContent.service.ts
const path_1 = __importDefault(require("path"));
const fileSystem_utils_1 = __importDefault(require("../utils/fileSystem.utils"));
const config_1 = require("../config");
const fetchContent = (contentOption, segment) => __awaiter(void 0, void 0, void 0, function* () {
    const filePath = path_1.default.resolve(config_1.CONTENT_DIRECTORY_PATH, contentOption, `${segment}.json`);
    return yield fileSystem_utils_1.default.readFile(filePath);
});
exports.fetchContent = fetchContent;

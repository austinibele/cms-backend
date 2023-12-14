"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageRepository = void 0;
// src/repository/pageRepository.ts
const lowdb_1 = __importDefault(require("lowdb"));
const FileSync_1 = __importDefault(require("lowdb/adapters/FileSync"));
const path_1 = __importDefault(require("path"));
class PageRepository {
    static getPageDB(slug, locale) {
        const dbPath = path_1.default.resolve('../../database', 'pages', locale, slug, 'page.json');
        const adapter = new FileSync_1.default(dbPath);
        return (0, lowdb_1.default)(adapter);
    }
    static getPage(slug, locale) {
        const db = this.getPageDB(slug, locale);
        return db.value(); // get the entire JSON value since it's specific to the page
    }
}
exports.PageRepository = PageRepository;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveFilepath = void 0;
const retrieveFilepath = (req, res) => {
    console.log("/api/uploads route hit");
    // The filePath is already resolved by our fileExists middleware and stored in res.locals
    const filePath = res.locals.filePath;
    res.sendFile(filePath);
};
exports.retrieveFilepath = retrieveFilepath;

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
const chai_1 = require("chai");
const supertest_1 = __importDefault(require("supertest"));
const server = require("../../server");
const fs = require('fs');
// Helper function to check if a file exists
function checkFileExists(filepath) {
    return fs.existsSync(filepath);
}
describe('POST /api/saveData', () => {
    ////////////////////////////////////////
    ////////////////////////////////////////
    let originalConsoleError;
    beforeEach(() => {
        // Store the original console.error
        originalConsoleError = console.error;
    });
    afterEach(() => {
        // Restore the original console.error
        console.error = originalConsoleError;
    });
    ////////////////////////////////////////
    ////////////////////////////////////////
    const testFilename = 'blog/testfile.txt';
    const testFilePath = `../database/content/${testFilename}`;
    before(() => {
        // Ensure the test file exists before running the tests
        fs.writeFileSync(testFilePath, 'test data');
    });
    const expectedStatusCode = 200;
    it('Should delete the specified file', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const res = yield (0, supertest_1.default)(server)
                .post('/api/deleteData')
                .send({ deletePath: testFilename })
                .expect('Content-Type', /json/)
                .expect(expectedStatusCode);
            (0, chai_1.expect)(res.body).to.have.property('message', 'Data deleted successfully.');
            (0, chai_1.expect)(checkFileExists(testFilePath)).to.be.false;
        }
        catch (error) {
            console.error('Error in test:', error);
            throw error; // Re-throw the error
        }
    }));
    it('Should return an error if the file does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        console.error = function () { };
        try {
            const res = yield (0, supertest_1.default)(server)
                .post('/api/deleteData')
                .send({ deletePath: 'nonexistentfile.txt' })
                .expect(404);
            (0, chai_1.expect)(res.body).to.have.property('message', 'File not found');
        }
        catch (error) {
            console.error('Error in test:', error);
            throw error; // Re-throw the error
        }
    }));
    after(() => {
        // Cleanup: Delete the test file if it still exists
        if (checkFileExists(testFilePath)) {
            fs.unlinkSync(testFilePath);
        }
        server.close();
    });
});

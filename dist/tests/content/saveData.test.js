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
const fs = require('fs/promises');
const testName = 'POST /api/saveData';
describe(testName, () => {
    const params = {
        contentOption: "news",
        segment: "test",
        data: {
            title: 'Test Title',
            content: 'Test Content'
        }
    };
    const expectedPath = `../database/content/${params.contentOption}/${params.segment}.json`;
    const expectedStatusCode = 200;
    it('Should save data to a file', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const res = yield (0, supertest_1.default)(server)
                .post('/api/saveData')
                .send(params)
                .expect('Content-Type', /json/)
                .expect(expectedStatusCode);
            // Assertions
            (0, chai_1.expect)(res.body).to.have.property('message', 'Data saved successfully.');
            const data = yield fs.readFile(expectedPath, 'utf8');
            (0, chai_1.expect)(JSON.parse(data)).to.deep.equal(params.data);
        }
        catch (error) {
            // Log additional information here
            console.error(`Error in ${testName}:`, error);
            if (error.response) {
                console.error('Server response:', error.response.status, error.response.body);
            }
            throw error; // Rethrow the error for Mocha to handle
        }
    }));
    after(() => __awaiter(void 0, void 0, void 0, function* () {
        yield fs.unlink(expectedPath);
    }));
});
after(() => {
    server.close();
});

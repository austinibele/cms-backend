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
const testName = 'GET /api/fetchContent/:contentOption/:segment';
describe(testName, () => {
    const contentOption = 'blog';
    const segment = 'fixture';
    const expectedStatusCode = 200;
    it('Should fetch content successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const res = yield (0, supertest_1.default)(server)
                .get(`/api/fetchContent/${contentOption}/${segment}`)
                .expect('Content-Type', /json/)
                .expect(expectedStatusCode);
            const data = JSON.parse(res.body);
            (0, chai_1.expect)(data).to.have.property('postId');
            (0, chai_1.expect)(data).to.have.property('metadata');
            (0, chai_1.expect)(data).to.have.property('content');
        }
        catch (error) {
            // Log error details
            console.error(`Error in ${testName}:`, error);
            if (error.response) {
                console.error('Server response:', error.response.status, error.response.body);
            }
            throw error; // Re-throw error for Mocha to handle
        }
    }));
    const expectedStatusCode2 = 404;
    it('Should return 404 for non-existing content', () => __awaiter(void 0, void 0, void 0, function* () {
        const nonExistingSegment = 'non-existing-segment';
        try {
            const res = yield (0, supertest_1.default)(server)
                .get(`/api/fetchContent/${contentOption}/${nonExistingSegment}`)
                .expect(expectedStatusCode2);
            (0, chai_1.expect)(res.text).to.equal('Content not found');
        }
        catch (error) {
            // Log error details
            console.error(`Error in ${testName}:`, error);
            if (error.response) {
                console.error('Server response:', error.response.status, error.response.body);
            }
            throw error; // Re-throw error for Mocha to handle
        }
    }));
});
after(() => {
    server.close();
});

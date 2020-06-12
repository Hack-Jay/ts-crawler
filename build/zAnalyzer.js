"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var cheerio_1 = __importDefault(require("cheerio"));
var ZAnalyzer = /** @class */ (function () {
    function ZAnalyzer() {
    }
    ZAnalyzer.getInstance = function () {
        if (!this.instance) {
            this.instance = new ZAnalyzer();
        }
        return this.instance;
    };
    ZAnalyzer.prototype.analyze = function (html, filePath) {
        var courseInfo = this.getCourseInfo(html);
        var fileContent = this.generatorJson(courseInfo, filePath);
        return JSON.stringify(fileContent);
    };
    ZAnalyzer.prototype.getCourseInfo = function (html) {
        var $ = cheerio_1.default.load(html);
        var courseItem = $(".course-item");
        var courseArr = [];
        courseItem.map(function (index, element) {
            var desc = $(element).find(".course-desc");
            var title = desc.eq(0).text();
            var count = parseInt(desc.eq(1).text().split("：")[1], 10) || 0;
            courseArr.push({ title: title, count: count });
        });
        var result = {
            time: new Date().getTime(),
            data: courseArr,
        };
        return result;
    };
    ZAnalyzer.prototype.generateJsonContent = function (courseInfo, filePath) {
        var fileContent = {};
        if (fs_1.default.existsSync(filePath)) {
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
        }
        fileContent[courseInfo.time] = courseInfo.data;
        return fileContent;
    };
    ZAnalyzer.prototype.generatorJson = function (result, filePath) {
        var filePathContent = {};
        if (fs_1.default.existsSync(filePath)) {
            filePathContent = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
        }
        filePathContent[result.time] = result.data;
        return filePathContent;
    };
    return ZAnalyzer;
}());
exports.default = ZAnalyzer;

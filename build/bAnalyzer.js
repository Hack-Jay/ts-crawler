"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BAnalyzer = /** @class */ (function () {
    function BAnalyzer() {
    }
    BAnalyzer.prototype.analyze = function (html, filePath) {
        return JSON.stringify(html);
    };
    return BAnalyzer;
}());
exports.default = BAnalyzer;

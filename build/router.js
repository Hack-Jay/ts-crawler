"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var crowller_1 = __importDefault(require("./crowller"));
var zAnalyzer_1 = __importDefault(require("./zAnalyzer"));
var router = express_1.Router();
router.get("/", function (req, res) {
    res.end("express splider.");
});
router.get("/get-data", function (req, res) {
    var secret = "secretKey";
    var url = "http://www.dell-lee.com/typescript/demo.html?secret=" + secret;
    var zAnalyzer = zAnalyzer_1.default.getInstance();
    var crowller = new crowller_1.default(url, zAnalyzer);
    res.end("express get data.");
});
exports.default = router;

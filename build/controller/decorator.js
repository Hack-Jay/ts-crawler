"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.del = exports.put = exports.post = exports.get = exports.router = void 0;
var express_1 = require("express");
exports.router = express_1.Router();
var Mehtod;
(function (Mehtod) {
    Mehtod["get"] = "get";
    Mehtod["post"] = "post";
})(Mehtod || (Mehtod = {}));
function getRequestDecorator(type) {
    return function (path) {
        return function (target, key) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', type, target, key);
        };
    };
}
exports.get = getRequestDecorator('get');
exports.post = getRequestDecorator('post');
exports.put = getRequestDecorator('put');
exports.del = getRequestDecorator('delete');

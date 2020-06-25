"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.del = exports.put = exports.post = exports.get = exports.controller = exports.router = void 0;
var express_1 = require("express");
exports.router = express_1.Router();
var Mehtod;
(function (Mehtod) {
    Mehtod["get"] = "get";
    Mehtod["post"] = "post";
})(Mehtod || (Mehtod = {}));
function controller(target) {
    console.log('controller target', target);
    for (var key in target.prototype) {
        var path = Reflect.getMetadata("path", target.prototype, key);
        var method = Reflect.getMetadata("method", target.prototype, key);
        var handler = target.prototype[key];
        if (path && method && handler) {
            exports.router[method](path, handler);
        }
    }
}
exports.controller = controller;
function getRequestDecorator(type) {
    return function (path) {
        return function (target, key) {
            console.log('fn target', target, 'key', key);
            Reflect.defineMetadata("path", path, target, key);
            Reflect.defineMetadata("method", type, target, key);
        };
    };
}
exports.get = getRequestDecorator("get");
exports.post = getRequestDecorator("post");
exports.put = getRequestDecorator("put");
exports.del = getRequestDecorator("delete");

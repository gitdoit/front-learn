"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.foo = foo;
exports.bar = bar;
exports.list = void 0;

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes"));

var _obj$c;

function foo() {
  console.log('This foo function  is tong yi baolu!');
}

function bar() {
  console.log('This bar function si tong yi baolu!');
}

let obj = {};
let arr = [1, 2, 3, 4];
exports.list = arr;
let b = (0, _includes.default)(arr).call(arr, 3);
let attr = obj === null || obj === void 0 ? void 0 : (_obj$c = obj.c) === null || _obj$c === void 0 ? void 0 : _obj$c.b;
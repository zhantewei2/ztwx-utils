"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copy = void 0;
exports.copy = function (str) {
    var input = document.createElement("input");
    input.style.cssText = "position:fixed;top:0;left:0;transform:translate3d(-100%,-100%,0)";
    input.value = str;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
};

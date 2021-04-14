define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.copy = void 0;
    exports.copy = function (str) {
        var txt = window.getSelection();
        txt.removeAllRanges();
        var div = document.createElement("div");
        div.style.cssText = "visibility:hidden;position:absolute;top:0;left:0;transform:translate3d(-100%,-100%,0)";
        div.innerText = str;
        document.body.appendChild(div);
        txt.selectAllChildren(div);
        document.execCommand("copy");
        txt.removeAllRanges();
        document.body.removeChild(div);
    };
});

define(["require", "exports", "./loadJs"], function (require, exports, loadJs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LibraryItem = /** @class */ (function () {
        function LibraryItem(id, globalVariableName) {
            this.loadSuccess = false;
            this.loadError = false;
            this.isloading = false;
            this.loadEnd = function (err) { return err; };
            this.id = id;
            this.globalVariableName = globalVariableName;
        }
        Object.defineProperty(LibraryItem.prototype, "variable", {
            get: function () {
                return this.globalVariableName && window[this.globalVariableName];
            },
            enumerable: true,
            configurable: true
        });
        LibraryItem.prototype.destroy = function () {
            var el = document.getElementById(this.id);
            el && document.body.removeChild(el);
        };
        LibraryItem.prototype.getVariable = function () {
            var _this = this;
            // load end
            if (this.loadSuccess)
                return Promise.resolve(this.variable);
            if (this.loadError)
                return Promise.reject("load failure");
            // not start load
            if (!this.isloading)
                return Promise.reject("not load");
            // is loading
            return new Promise(function (resolve, reject) {
                var oldLoadEnd = _this.loadEnd;
                _this.loadEnd = function () {
                    var loadError = oldLoadEnd.call(_this);
                    loadError ? reject() : resolve(_this.variable);
                    return loadError;
                };
            });
        };
        LibraryItem.prototype.load = function (fileAddress, type) {
            var _this = this;
            if (this.isloading || this.loadSuccess || this.loadError)
                return;
            var method = type === "css" ? loadJs_1.loadCss : loadJs_1.loadJs;
            this.isloading = true;
            method.call(method, fileAddress, type)
                .then(function () {
                _this.loadEnd();
                _this.isloading = false;
                _this.loadSuccess = true;
            })
                .catch(function () {
                _this.loadEnd(true);
                _this.isloading = false;
                _this.loadError = true;
            });
        };
        return LibraryItem;
    }());
    exports.LibraryItem = LibraryItem;
    var Library = /** @class */ (function () {
        function Library() {
            this.lib = {};
            this._lib = {};
        }
        Library.prototype.assemblyLib = function (id, libItem) {
            var self = this;
            Object.defineProperty(this.lib, id, {
                writable: false,
                get: function () {
                    return self._lib[id].getVariable();
                }
            });
        };
        /**
         * load js or css file.
         * @param id primarykey unique id. must be specified;
         * @param globalVariableName The global variable name provided by the js file;
         * @param fileAddress absolute path or relative path;
         * @param type  js|css;
         */
        Library.prototype.assemblyFromFile = function (_a) {
            var id = _a.id, globalVariableName = _a.globalVariableName, fileAddress = _a.fileAddress, type = _a.type;
            if (this._lib[id])
                return;
            var libraryItem = new LibraryItem(id, globalVariableName);
            libraryItem.load(fileAddress, type);
            this._lib[id] = libraryItem;
            this.assemblyLib(id, libraryItem);
        };
        return Library;
    }());
    exports.Library = Library;
});

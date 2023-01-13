"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = exports.FileStat = exports.Stat = void 0;
class Stat {
    constructor() {
        this.PkgName = "";
        this.FuncName = "";
        this.Complexity = 0;
        // Pos: FileStat = new FileStat();
        this.Remark = "";
        this.Name = "";
    }
}
exports.Stat = Stat;
;
class FileStat {
    constructor() {
        this.Filename = "";
        this.Offset = 0;
        this.Line = 0;
        this.Column = 0;
    }
}
exports.FileStat = FileStat;
var Column;
(function (Column) {
    Column["PKGNAME"] = "PkgName";
    Column["FUNCNAME"] = "FuncName";
    Column["COMPLEXITY"] = "Complexity";
    Column["REMARK"] = "Remark";
})(Column = exports.Column || (exports.Column = {}));
//# sourceMappingURL=stat.js.map
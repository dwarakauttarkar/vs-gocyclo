"use strict";
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
;
class FileStat {
    constructor() {
        this.Filename = "";
        this.Offset = 0;
        this.Line = 0;
        this.Column = 0;
    }
}
//# sourceMappingURL=stat.js.map
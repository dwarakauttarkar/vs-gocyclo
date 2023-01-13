
export class Stat  {
    PkgName: string = "";
    FuncName: string = "";
    Complexity: number = 0;
    // Pos: FileStat = new FileStat();
    Remark: string  = "";
    Name: string = "";
};

export class FileStat  {
    Filename: string = "";
    Offset: number = 0;
    Line: number = 0;
    Column: number = 0;
}

export enum Column{
    PKGNAME = 'Package',
    FUNCNAME = 'Function',
    COMPLEXITY = 'Complexity',
    REMARK = 'Remark',
}
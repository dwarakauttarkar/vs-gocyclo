
export class Stat  {
    PkgName: string = "";
    FuncName: string = "";
    CyclomaticComplexity: number = 0;
    MaintainabilityIndex: number = 0;
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
    PKGNAME = 'PkgName',
    FUNCNAME = 'FuncName',
    CYCLO_COMPLEXITY = 'CyclomaticComplexity',
    MAINTAINABILITY_INDEX = 'MaintainabilityIndex',
    REMARK = 'Remark',
}
interface Stat  {
    PkgName: string;
    FuncName: string;
    Complexity: number;
    Pos: FileStat;
};

interface FileStat  {
    Filename: string;
    Offset: number;
    Line: number;
    Column: number;
}


export class Error {
    message: string;
    errorType: ErrorType;

    constructor(message: string, errorType: ErrorType) {
        this.message = message;
        this.errorType = errorType;
    }
}

export enum ErrorType{
    FILE_NOT_FOUND = 'fileNotFound',
    UNKNOWN = 'unknown',
    BINARY_NOT_FOUND = 'binaryNotFound',
    PARSING_ERROR = 'parsingError',
}

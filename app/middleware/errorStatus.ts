export class ErrorStatus extends Error {
    static ERROR_STATUS = {
        SERVER_ERROR: -1,
        REQUEST_PARAMS_ERROR: -2,
        TOKEN_EXPIRED: 401,
        DATA_ERROR: -4,
        PERMISSION_ERROR: -5,
    };
    status: number;
    constructor(message: string, status: number = ErrorStatus.ERROR_STATUS.SERVER_ERROR) {
        super(message);
        this.status = status;
    }
}
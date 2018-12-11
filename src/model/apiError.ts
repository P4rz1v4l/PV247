export class ApiError extends Error {
    response: Promise<any> | null;
    errorCode: number;
    constructor(errorCode: number, message: string, response: Promise<any> | null) {
        super(message);

        this.errorCode = errorCode;
        this.response = response;

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ApiError.prototype);
    }

    getCode() {
        return this.errorCode;
    }

    getMessage() {
        return this.message;
    }

    getResponse() {
        return this.response;
    }
}

export default class ResponseModel {
    private payload;
    private error;
    private status;

    constructor(payload: string | null, error: string | null, status: number) {
        this.payload = payload;
        this.error = error;
        this.status = status;
    }

    public serialize(): Object {
        return {
            payload: this.payload,
            error: this.error,
            status: this.status
        }
    }
}
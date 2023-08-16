export interface ISendPostParams {
    url: string;
    body?: any;
    headers?: any;
}
export type ApiResponse = SuccessApiResponse | FailedApiResponse

interface SuccessApiResponse {
    success: true;
    data: any;
    message?: string;
}
interface FailedApiResponse {
    success: false;
    error: string;
}
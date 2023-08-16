import { ISendPostParams, ApiResponse } from "./interfaces";

export async function sendPost(params: ISendPostParams): Promise<ApiResponse> {
    try {
        params.headers = params.headers || {};

        let response = await fetch(params.url, {
            headers: params.headers,
            method: "POST",
            body: params.body ? JSON.stringify(params.body) : undefined
        });

        let data = await response.json();
        data.success = data.success || false;

        return data;
    } catch (err) {
        console.log(err);
        return { success: false, error: "network error" };
    }
}
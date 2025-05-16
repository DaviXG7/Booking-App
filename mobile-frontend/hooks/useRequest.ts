import {RequestForm} from "@/types/Form";

export async function makeRequest(form: RequestForm): Promise<Response> {
    const { url, method, params } = form;

    for (const param of params) {
        if (param.isRequired && (param.value === null || param.value === undefined)) {
            throw new Error(`Missing required parameter: ${param.key}`);
        }
    }

    const definedParams = params.filter(p => p.value !== undefined && p.value !== null && p.value !== "");

    let finalUrl = url;
    let options: RequestInit = {
        method: method.toUpperCase(),
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (method.toUpperCase() === 'GET') {
        const query = new URLSearchParams();
        for (const param of definedParams) {
            query.append(param.key, String(param.value));
        }
        if (query.toString()) {
            finalUrl += (url.includes('?') ? '&' : '?') + query.toString();
        }
    } else {
        const body: Record<string, any> = {};
        for (const param of definedParams) {
            body[param.key] = param.value;
        }
        options.body = JSON.stringify(body);
    }

    return fetch(finalUrl, options);
}

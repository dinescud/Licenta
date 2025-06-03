import { config } from "../config/config.ts"

/**
 * Method used to make post requests.
 * 
 * @param {string} route URL of the request.
 * @param {any} body request data.
 * @returns {Promise<Response>} response.
 */
export const POST_REQUEST = async (route: string, body: any): Promise<Response> => {
    const fullUrl = `${config.baseUrl}${route}`;
    
    return fetch(fullUrl, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
    }).then(response => {
        console.log('Response status:', response.status);
        return response;
    }).catch(error => {
        console.error('Request failed:', error);
        throw error;
    });
}

/**
 * Method used to make get requests
 * 
 * @param {string} route URL of the request.
 * @returns {Response} response.
 */
export const GET_REQUEST = async (route: string): Promise<Response> => {
    const fullUrl = `${config.baseUrl}${route}`;
    
    return fetch(fullUrl, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => {
        console.log('Response status:', response.status);
        return response;
    }).catch(error => {
        console.error('Request failed:', error);
        throw error;
    });
}
import { config } from "../config/config.ts"

/**
 * Method used to make post requests.
 * 
 * @param {string} route URL of the request.
 * @param {any} body request data.
 * @returns {Promise<Response>} response.
 */
export const POST_REQUEST = async (route: string, body: any): Promise<Response> => {
    return fetch(`${config.baseUrl}${route}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
    })
}

/**
 * Method used to make get requests
 * 
 * @param {string} route URL of the request.
 * @returns {Response} response.
 */
export const GET_REQUEST = async (route: string): Promise<Response> => {
    return fetch(`${config.baseUrl}${route}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    })
}
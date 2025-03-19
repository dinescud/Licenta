import { NextFunction, Request, Response } from "express";
import { BadRequest, NotAvailable, NotFound, Unauthorized } from "../errors/CustomErrors";
import { config } from "../config/config";
import { decodeToken } from "../bzl/api/authApi";
import { RequestWrapper, UserContext } from "../types";

/**
 * Method used to send error responses.
 * 
 * @param {any} error error thrown
 * @param {Response} res response to send
 * @returns {void} sends the response.
 */
export const sendErrorResponse = (error: any, res: Response): void => {
    if(error instanceof BadRequest) {
        res.statusCode = 400;
        res.send({ error: error.message });
    }
    else if(error instanceof NotFound) {
        res.statusCode = 404;
        res.send({ error: error.message });
    }
    else if(error instanceof Unauthorized) {
        res.statusCode = 401;
        res.send({ error: error.message });
    } 
    else if(error instanceof NotAvailable) {
        res.statusCode = 503;
        res.send({ error: error.message });
    } 
    else {
        res.statusCode = 500;
        res.send({ error: error.message });
    }
}

/**
 * Method used to send response.
 * 
 * @param {any} data data to send
 * @param {Response} res response to send
 * @param {number} statusCode status code of the response
 * @returns {void} sends the response.
 */
export const sendValidResponse = (data: any, res: Response, statusCode: number): void => {
    res.statusCode = statusCode;
    res.send(data);
}

/**
 * Method used to attach a cookie to the response.
 * 
 * @param {Response} res response to send.
 * @param {string} token jwt-token put inside a cookie.
 */
export const attachCookie = (res: Response, token: string): void => {
    res.cookie('token', token, config.cookieConfig);
}

/**
 * Method used in order to extract the cookie from the request.
 * 
 * @param {Request} req incoming request.
 * @returns {UserContext} details about the user.
 */
export const extractCookie = (req: Request): UserContext => {
    const token = req.cookies.token;
    return decodeToken(token);
}

/**
 * Method used in order to delete the cookie.
 * 
 * @param {Response} res response to send.
 * @returns {void} clears the cookie.
 */
export const clearCookie = (res: Response): void => {
    res.cookie('token', '', {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        expires: new Date(0),
    });
}

export const verifyToken = (req: RequestWrapper, res: Response, next: NextFunction): void => {
    const token = req.cookies.token;
    try {
        const userContext = decodeToken(token);
        req.userContext = userContext;
        next();
    } catch (error) {
        sendErrorResponse(new Unauthorized('Not authorized'), res);
        return;
    }
}

export const getUserContext = (req: RequestWrapper): UserContext => {
    const usercontext: UserContext = req.userContext || {
        id: '0',
        email: 'invalid',
    }

    return usercontext;
}
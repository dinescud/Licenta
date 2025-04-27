// import { Request, Response } from "express";
// import * as authBzl from '../../bzl/api/authApi';
// import { LoginRequest, RegisterRequest, UserContext } from "../../types";
// import { loginBodySchema, registerBodySchema } from "../../schemas/auth_schema";
// import { BadRequest } from "../../errors/CustomErrors";
// import { clearCookie, extractCookie } from "../../routes/helper";

// export class AuthMiddleware {
    
//     /**
//      * Method used in order to parse data from the request.
//      * 
//      * @param {Request} req login request
//      * @returns {Promise<string>} login response.
//      */
//     // async login(req: Request): Promise<string> {
//     //     const loginRequest = loginBodySchema.safeParse(req.body);
//     //     if(loginRequest.success === false) {
//     //         throw new BadRequest('Invalid login data');
//     //     }

//     //     return authBzl.login(loginRequest.data);
//     // }

//     /**
//      * Method used in order to parse data from the request.
//      * 
//      * @param {Request} req register request
//      * @returns {Promise<string>} register response.
//      */
//     async register(req: Request): Promise<boolean> {
//         const registerRequest = registerBodySchema.safeParse(req.body);
//         if(registerRequest.success === false) {
//             throw new BadRequest('Invalid registration data.');
//         }

//         return authBzl.register(registerRequest.data);
//     }

//     /**
//      * Method used in order to parse data from the request.
//      * 
//      * @param {Request} req status request
//      * @returns {Promise<string>} status response.
//      */
//     async whoami(req: Request): Promise<UserContext> {
//         return extractCookie(req);
//     }

//     /**
//      * Method used in order to parse data from the request.
//      * This method just deletes the cookie.
//      * 
//      * @param {Request} req logout request.
//      * @param {Response} res logout response.
//      * @returns {Promise<void>} deletes the cookie.
//      */
//     async logout(req: Request, res: Response): Promise<void> {
//         const userContext = extractCookie(req);
//         return clearCookie(res);
//     }
// }
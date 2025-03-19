import { NextFunction, Request, Response, Router } from "express";
import { AuthMiddleware } from "../../middleware/lib/AuthMiddleware";
import { attachCookie, sendErrorResponse, sendValidResponse } from "../helper";

export class AuthRoutes {
    private router: Router = Router();
    private middleware: AuthMiddleware;

    constructor(authMiddleware: AuthMiddleware) {
        this.middleware = authMiddleware;
        this.initializeRoutes();
    }

    getRouter(): Router {
        return this.router;
    }

    /**
     * Method used to initiailize the auth routes
     * 
     * @returns {void} creates the auth routes
     */
    private initializeRoutes(): void {
        this.router.post('/login', this.login.bind(this));
        this.router.post('/register', this.register.bind(this));
        this.router.get('/whoami', this.whoami.bind(this));
        this.router.post('/logout', this.logout.bind(this));
    }

    /**
     * Method used to handle the login requests
     * 
     * @param {Request} req request
     * @param {Response} res response
     * @param {NextFunction} next callback function
     * @returns {Promise<void>} handles login requests
     */
    private async login(req: Request, res: Response, next?: NextFunction): Promise<void> {
        return this.middleware.login(req)
            .then((token) => {
                attachCookie(res, token);
                sendValidResponse({ response: 'Logged in!' }, res, 200);
            })
            .catch(error => sendErrorResponse(error, res));
    }

    /**
     * Method used to handle the register requests
     * 
     * @param {Request} req request
     * @param {Response} res response
     * @param {NextFunction} next callback function
     * @returns {Promise<void>} handles register requests
     */
    private async register(req: Request, res: Response, next?: NextFunction): Promise<void> {
        return this.middleware.register(req)
            .then((result) => sendValidResponse({ response: result }, res, 201))
            .catch((error) => sendErrorResponse(error, res))
    }

    /**
     * Method used in order to see if a user is logged in or not.
     * 
     * @param {Request} req request
     * @param {Response} res response
     * @param {NextFunction} next callback function
     * @returns {Promise<void>} handles check status requests
     */
    private async whoami(req: Request, res: Response, next?: NextFunction): Promise<void> {
        return this.middleware.whoami(req)
            .then((userContext) => sendValidResponse(userContext, res, 200))
            .catch((error) => sendErrorResponse(error, res));
    }

    /**
     * Method used in order to logout a user.
     * 
     * @param {Request} req request
     * @param {Response} res response
     * @param {NextFunction} next callback function
     * @returns {Promise<void>} handles logout requests
     */
    private async logout(req: Request, res: Response, next?: NextFunction): Promise<void> {
        return this.middleware.logout(req, res)
            .then(() => sendValidResponse({ response: 'Logged out successfully' }, res, 200))
            .catch((error) => sendErrorResponse(error, res));
    }
}
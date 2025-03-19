import { Router } from "express";
import { AuthRoutes } from "./lib/AuthRoutes"
import { MiddlewareInstance } from "../middleware/MiddlewareInstance";
import { UserRoutes } from "./lib/UserRoutes";
import { DomainRoutes } from "./lib/DomainRoutes";

export class RoutesInstance {
    public authRoutes: AuthRoutes;
    public userRoutes: UserRoutes;
    public domainRoutes: DomainRoutes;
    private middlewareInstance: MiddlewareInstance;
    private router: Router = Router();

    constructor(middlewares: MiddlewareInstance) {
        this.middlewareInstance = middlewares;
        this.authRoutes = new AuthRoutes(this.middlewareInstance.authMiddleware);
        this.userRoutes = new UserRoutes(this.middlewareInstance.userMiddleware);
        this.domainRoutes = new DomainRoutes(this.middlewareInstance.domainMiddleware);
        this.router.use('/api', this.initializeRoutes())
    }

    getRouter(): Router {
        return this.router;
    }

    /**
     * Method used to initialize the routes
     * 
     * @returns {Router} router with all application routes
     */
    private initializeRoutes(): Router {
        const router = Router();
        router.use('/auth', this.authRoutes.getRouter());
        router.use('/user', this.userRoutes.getRouter());
        router.use('/domain', this.domainRoutes.getRouter());
        return router;
    }
}
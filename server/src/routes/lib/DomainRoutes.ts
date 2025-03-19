import { Router } from "express";
import { DomainMiddleware } from "../../middleware/lib/DomainMiddleware";

export class DomainRoutes {
  private router: Router = Router();
      private middleware: DomainMiddleware;
  
      constructor(authMiddleware: DomainMiddleware) {
          this.middleware = authMiddleware;
          // this.initializeRoutes();
      }
  
      getRouter(): Router {
          return this.router;
      }
}
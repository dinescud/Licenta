import { NextFunction, Router, Response, Request } from "express";
import { ScanMiddleware } from "../../middleware/lib/ScanMiddleware";
import { sendErrorResponse, sendValidResponse } from "../helper";

export class ScanRoutes {
  private router: Router = Router();
      private middleware: ScanMiddleware;
  
      constructor(authMiddleware: ScanMiddleware) {
          this.middleware = authMiddleware;
          this.initializeRoutes();
      }
  
      getRouter(): Router {
          return this.router;
      }

      private initializeRoutes(): void {
        this.router.post('/scan', this.scan.bind(this));
    }        

    private async scan(req: Request, res: Response, next?: NextFunction): Promise<void> {
        return this.middleware.scan(req)
            .then((response) => { 
                console.log(response);
                return sendValidResponse(response, res, 200)
            })
            .catch(error => sendErrorResponse(error, res));
    }
}
import { NextFunction, Router, Response, Request } from "express";
import { sendErrorResponse, sendValidResponse } from "../helper";
import { HistoryMiddleware } from "../../middleware/lib/HistoryMiddleware";
import { UserMiddleware } from "../../middleware/lib/UserMiddleware";

export class UserRoutes {
  private router: Router = Router();
      private middleware: UserMiddleware;
  
      constructor(authMiddleware: UserMiddleware) {
          this.middleware = authMiddleware;
          this.initializeRoutes();
      }
  
      getRouter(): Router {
          return this.router;
      }

      private initializeRoutes(): void {
        this.router.post('/getSettings', this.getSettings.bind(this));
    }        

    private async getSettings(req: Request, res: Response, next?: NextFunction): Promise<void> {
        return this.middleware.getUserSettings(req)
            .then((response) => { 
                console.log(response);
                return sendValidResponse(response, res, 200)
            })
            .catch(error => sendErrorResponse(error, res));
    }
}
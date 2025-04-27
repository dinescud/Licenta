import { NextFunction, Router, Response, Request } from "express";
import { sendErrorResponse, sendValidResponse } from "../helper";
import { HistoryMiddleware } from "../../middleware/lib/HistoryMiddleware";
import { UserContext } from "../../types";
// import { authMiddleware } from "../../utils/utils";

export class HistoryRoutes {
  private router: Router = Router();
      private middleware: HistoryMiddleware;
  
      constructor(authMiddleware: HistoryMiddleware) {
          this.middleware = authMiddleware;
          this.initializeRoutes();
      }
  
      getRouter(): Router {
          return this.router;
      }

      private initializeRoutes(): void {
        // this.router.use(authMiddleware);
        this.router.post('/getHistory', this.getHistory.bind(this));
    }        

    private async getHistory(req: Request, res: Response, next?: NextFunction): Promise<void> {
        return this.middleware.getScanHistory(req)
            .then((response) => { 
                console.log(response);
                return sendValidResponse(response, res, 200)
            })
            .catch(error => sendErrorResponse(error, res));
    }
}
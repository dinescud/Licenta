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
        this.router.post('/setSettings', this.setSettings.bind(this));
        this.router.post('/getBlackList', this.getBlackList.bind(this));
        this.router.post('/addBlackListItem', this.addBlackListItem.bind(this));
        this.router.post('/removeBlackListItem', this.removeBlackListItem.bind(this));
    }        

    private async getSettings(req: Request, res: Response, next?: NextFunction): Promise<void> {
        return this.middleware.getUserSettings(req)
            .then((response) => { 
                console.log(response);
                return sendValidResponse(response, res, 200)
            })
            .catch(error => {
                if (error.status === 404) {
                    res.status(404).json({ error: error.message });
                    return;
                }
                return sendErrorResponse(error, res);
            });
    }

    private async setSettings(req: Request, res: Response, next?: NextFunction): Promise<void> {
        return this.middleware.setUserSettings(req)
            .then((response) => { 
                console.log(response);
                return sendValidResponse(response, res, 200)
            })
            .catch(error => sendErrorResponse(error, res));
    }

    private async getBlackList(req: Request, res: Response, next?: NextFunction): Promise<void> {
        return this.middleware.getBlackList(req)
            .then((response) => { 
                console.log(response);
                return sendValidResponse(response, res, 200)
            })
            .catch(error => sendErrorResponse(error, res));
    }

    private async addBlackListItem(req: Request, res: Response, next?: NextFunction): Promise<void> {
        return this.middleware.addBlackListItem(req)
            .then((response) => { 
                console.log(response);
                return sendValidResponse(response, res, 200)
            })
            .catch(error => sendErrorResponse(error, res));
    }

    private async removeBlackListItem(req: Request, res: Response, next?: NextFunction): Promise<void> {
        return this.middleware.removeBlackListItem(req)
            .then((response) => { 
                console.log(response);
                return sendValidResponse(response, res, 200)
            })
            .catch(error => sendErrorResponse(error, res));
    }
}
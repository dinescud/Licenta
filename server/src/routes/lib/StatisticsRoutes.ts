import { NextFunction, Router, Response, Request } from "express";
import { sendErrorResponse, sendValidResponse } from "../helper";
import { StatisticsMiddleware } from "../../middleware/lib/StatisticsMiddleware";

export class statisticsRoutes {
  private router: Router = Router();
      private middleware: StatisticsMiddleware;
  
      constructor(authMiddleware: StatisticsMiddleware) {
          this.middleware = authMiddleware;
          this.initializeRoutes();
      }
  
      getRouter(): Router {
          return this.router;
      }

      private initializeRoutes(): void {
        this.router.post('/getMostScanned', this.getMostScanned.bind(this));
        this.router.post('/getStatusStatistics', this.getStatusStatistics.bind(this));
        this.router.post('/getTopCountries', this.getTopCountries.bind(this));
        this.router.post('/getDomainAge', this.getDomainAge.bind(this));
        this.router.post('/getTotalScanned', this.getTotalScanned.bind(this));

    }        

    private async getMostScanned(req: Request, res: Response, next?: NextFunction): Promise<void> {
        return this.middleware.getMostScannedStatistics(req)
            .then((response) => { 
                console.log(response);
                return sendValidResponse(response, res, 200)
            })
            .catch(error => sendErrorResponse(error, res));
    }

     private async getStatusStatistics(req: Request, res: Response, next?: NextFunction): Promise<void> {
        return this.middleware.getScanStatusStatistics(req)
            .then((response) => { 
                console.log(response);
                return sendValidResponse(response, res, 200)
            })
            .catch(error => sendErrorResponse(error, res));
    }

    private async getTopCountries(req: Request, res: Response, next?: NextFunction): Promise<void> {
        return this.middleware.getTopCountries(req)
            .then((response) => { 
                console.log(response);
                return sendValidResponse(response, res, 200)
            })
            .catch(error => sendErrorResponse(error, res));
    }

    private async getDomainAge(req: Request, res: Response, next?: NextFunction): Promise<void> {
        return this.middleware.getDomainAgeStatistics(req)
            .then((response) => { 
                console.log(response);
                return sendValidResponse(response, res, 200)
            })
            .catch(error => sendErrorResponse(error, res));
    }

    private async getTotalScanned(req: Request, res: Response, next?: NextFunction): Promise<void> {
        return this.middleware.getTotalScans(req)
            .then((response) => { 
                console.log(response);
                return sendValidResponse(response, res, 200)
            })
            .catch(error => sendErrorResponse(error, res));
    }
}
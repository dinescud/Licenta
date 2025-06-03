import { Router } from "express";
import { MiddlewareInstance } from "../middleware/MiddlewareInstance";
import { ScanRoutes } from "./lib/ScanRoutes";
import { HistoryRoutes } from "./lib/HistoryRoutes";
import { StatisticsRoutes } from "./lib/StatisticsRoutes";
import { UserRoutes } from "./lib/UserRoutes";

export class RoutesInstance {
  public userRoutes: UserRoutes;
  public scanRoutes: ScanRoutes;
  public historyRoutes: HistoryRoutes;
  public statisticsRoutes: StatisticsRoutes;
  private middlewareInstance: MiddlewareInstance;
  private router: Router = Router();

  constructor(middlewares: MiddlewareInstance) {
    this.middlewareInstance = middlewares;
    this.userRoutes = new UserRoutes(this.middlewareInstance.userMiddleware);
    this.scanRoutes = new ScanRoutes(this.middlewareInstance.domainMiddleware);
    this.historyRoutes = new HistoryRoutes(this.middlewareInstance.historyMiddleware);
    this.statisticsRoutes = new StatisticsRoutes(this.middlewareInstance.statisticsMiddleware);

    this.router.use("/api", this.initializeRoutes());
  }

  getRouter(): Router {
    console.log("Routes initialized", this.router);
    return this.router;
  }

  /**
   * Method used to initialize the routes
   *
   * @returns {Router} router with all application routes
   */
  private initializeRoutes(): Router {
    const router = Router();
    router.use('/user', this.userRoutes.getRouter());
    router.use("/domain", this.scanRoutes.getRouter());
    router.use("/history", this.historyRoutes.getRouter());
    router.use("/statistics", this.statisticsRoutes.getRouter());
    return router;
  }
}

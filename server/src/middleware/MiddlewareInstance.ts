// import { UserMiddleware } from "./lib/UserMiddleware";
import { ScanMiddleware } from "./lib/ScanMiddleware";
import { HistoryMiddleware } from "./lib/HistoryMiddleware";
import { StatisticsMiddleware } from "./lib/StatisticsMiddleware";

export class MiddlewareInstance {
    // public userMiddleware: UserMiddleware = new UserMiddleware();
    public domainMiddleware: ScanMiddleware = new ScanMiddleware();
    public historyMiddleware: HistoryMiddleware = new HistoryMiddleware();
    public statisticsMiddleware: StatisticsMiddleware = new StatisticsMiddleware();
}
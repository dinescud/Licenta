// import { AuthMiddleware } from "./lib/AuthMiddleware";
// import { UserMiddleware } from "./lib/UserMiddleware";
import { ScanMiddleware } from "./lib/ScanMiddleware";
import { HistoryMiddleware } from "./lib/HistoryMiddleware";

export class MiddlewareInstance {
    // public authMiddleware: AuthMiddleware = new AuthMiddleware();
    // public userMiddleware: UserMiddleware = new UserMiddleware();
    public domainMiddleware: ScanMiddleware = new ScanMiddleware();
    public historyMiddleware: HistoryMiddleware = new HistoryMiddleware();
}
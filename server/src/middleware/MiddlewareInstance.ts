import { AuthMiddleware } from "./lib/AuthMiddleware";
import { UserMiddleware } from "./lib/UserMiddleware";
import { ScanMiddleware } from "./lib/ScanMiddleware";

export class MiddlewareInstance {
    public authMiddleware: AuthMiddleware = new AuthMiddleware();
    public userMiddleware: UserMiddleware = new UserMiddleware();
    public domainMiddleware: ScanMiddleware = new ScanMiddleware();
}
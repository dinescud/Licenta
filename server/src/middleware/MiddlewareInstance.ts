import { AuthMiddleware } from "./lib/AuthMiddleware";
import { UserMiddleware } from "./lib/UserMiddleware";
import { DomainMiddleware } from "./lib/DomainMiddleware";

export class MiddlewareInstance {
    public authMiddleware: AuthMiddleware = new AuthMiddleware();
    public userMiddleware: UserMiddleware = new UserMiddleware();
    public domainMiddleware: DomainMiddleware = new DomainMiddleware();
}
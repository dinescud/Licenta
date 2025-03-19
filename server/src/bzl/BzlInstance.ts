import { ModelsInstance } from "../models/ModelsInstance";
import { AuthLib } from "./lib/AuthLib";
import { DomainLib } from "./lib/DomainLib";
import { UserLib } from "./lib/UserLib";

export class BzlInstance {
    public authLib: AuthLib;
    public userLib: UserLib;
    public domainLib: DomainLib;
    private modelsInstance: ModelsInstance;

    constructor(models: ModelsInstance, hashSalt: string) {
        this.modelsInstance = models;
        this.authLib = new AuthLib(models.userModel, hashSalt);
        this.userLib = new UserLib(models.userModel);
        this.domainLib = new DomainLib(models.domainModel);
    }
}
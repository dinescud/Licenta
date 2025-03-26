import { ModelsInstance } from "../models/ModelsInstance";
import { AuthLib } from "./lib/AuthLib";
import { ScanLib } from "./lib/ScanLib";
import { UserLib } from "./lib/UserLib";

export class BzlInstance {
    public authLib: AuthLib;
    public userLib: UserLib;
    public scanLib: ScanLib;
    private modelsInstance: ModelsInstance;

    constructor(models: ModelsInstance, hashSalt: string) {
        this.modelsInstance = models;
        this.authLib = new AuthLib(models.userModel, hashSalt);
        this.userLib = new UserLib(models.userModel);
        this.scanLib = new ScanLib(models.domainModel);
    }
}
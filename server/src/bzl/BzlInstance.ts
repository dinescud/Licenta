import { ModelsInstance } from "../models/ModelsInstance";
import { HistoryLib } from "./lib/HistoryLib";
import { ScanLib } from "./lib/ScanLib";
import { StatisticsLib } from "./lib/StatisticsLib";
import { UserLib } from "./lib/UserLib";

export class BzlInstance {
    public userLib: UserLib;
    public scanLib: ScanLib;
    public historyLib: HistoryLib;
    public statisticsLib: StatisticsLib;
    private modelsInstance: ModelsInstance;

    constructor(models: ModelsInstance, hashSalt: string) {
        this.modelsInstance = models;
        this.userLib = new UserLib(models.userModel);
        this.scanLib = new ScanLib(models.domainModel);
        this.historyLib = new HistoryLib(models.scanHistoryModel);
        this.statisticsLib = new StatisticsLib();
    }
}
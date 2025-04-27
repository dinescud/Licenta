import * as mongoose from 'mongoose'
// import { UserModel } from './lib/UserModel';
import { DomainModel } from './lib/DomainModel';
import { ScanHistoryModel } from './lib/ScanHistoryModel';

export class ModelsInstance {
    private mongoose: mongoose.Mongoose;
    // public userModel: UserModel;
    public domainModel: DomainModel;
    public scanHistoryModel: ScanHistoryModel;

    constructor(mongoose: mongoose.Mongoose) {
        this.mongoose = mongoose;
        // this.userModel = new UserModel(mongoose);
        this.domainModel = new DomainModel(mongoose);
        this.scanHistoryModel = new ScanHistoryModel(mongoose);
    }
}
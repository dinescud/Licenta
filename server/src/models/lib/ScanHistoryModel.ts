import mongoose from "mongoose";
import { AbstractModel } from "./AbstractModel";
import { ModelNameEnum, PopulateOpts } from "../utils/types";
import { ScanHistoryModelType } from "../types";
import { transformFn } from "../utils/utils";

export class ScanHistoryModel extends AbstractModel<ScanHistoryModelType> {
    protected SchemaDef: mongoose.SchemaDefinition = {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      websiteId: { type: mongoose.Schema.Types.ObjectId, ref: "Domain", required: true },
      timestamp: { type: Date, default: Date.now }
    };

    protected SchemaOptions: mongoose.SchemaOptions = {
        collection: 'scanHistory',
        toObject: { getters: true, transform: transformFn },
        toJSON: { getters: true, transform: transformFn },
    }

    protected textSearchFields: string[] = ['email', 'name'];

    protected populateOptions: PopulateOpts = [];

    constructor(Mongoose: mongoose.Mongoose) {
        console.log('HISTORY!!!!')
        super(Mongoose, ModelNameEnum.SCAN_HISTORY);
        this.setup();
    }

    protected addSchemaEnhancement(): void {
        this.Schema.index({ name: 1 });
        this.Schema.index({ email: 1 });
    }
}
import mongoose from "mongoose";
import { AbstractModel } from "./AbstractModel";
import { ModelNameEnum, PopulateOpts } from "../utils/types";
import { ScanHistoryModelType } from "../types";
import { transformFn } from "../utils/utils";

export class ScanHistoryModel extends AbstractModel<ScanHistoryModelType> {
    protected SchemaDef: mongoose.SchemaDefinition = {
        userId: { type: String, unique: true, required: true },
        history: [
            {
                info: {
                    type: {
                        websiteAddress: String,
                        lastAnalysis: String,
                        detectionCounts: String,
                        domainRegistration: String,
                        ipAddress: String,
                        serverLocation: String,
                        city: String,
                    }
                    , ref: "Domain", required: true
                }, // Reference to Domain model
                scannedAt: { type: Date, default: Date.now }, // Date of the scan
            },
        ],
    };

    protected SchemaOptions: mongoose.SchemaOptions = {
        collection: 'scanHistory',
        toObject: { getters: true, transform: transformFn },
        toJSON: { getters: true, transform: transformFn },
    };

    protected textSearchFields: string[] = ['user'];

    protected populateOptions: PopulateOpts = [
        { path: 'user', select: 'name email' }, // Populate user details
        { path: 'history.info', select: 'websiteAddress detectionCounts' }, // Populate domain details
    ];

    constructor(Mongoose: mongoose.Mongoose) {
        super(Mongoose, ModelNameEnum.SCAN_HISTORY);
        this.setup();
    }

    protected addSchemaEnhancement(): void {
        this.Schema.index({ user: 1 }); // Index for user field
        this.Schema.index({ 'history.scannedAt': 1 }); // Index for scannedAt field
    }
}
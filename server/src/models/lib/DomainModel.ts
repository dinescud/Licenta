import mongoose from "mongoose";
import { AbstractModel } from "./AbstractModel";
import { ModelNameEnum, PopulateOpts } from "../utils/types";
import { DomainModelType } from "../types";
import { transformFn } from "../utils/utils";

export class DomainModel extends AbstractModel<DomainModelType> {
    protected SchemaDef: mongoose.SchemaDefinition = {
      websiteAddress: { type: String, required: true, unique: true },
      lastAnalysis: String,
      detectionCounts: String,
      domainRegistration: String,
      ipAddress: String,
      serverLocation: String,
      city: String,
    };

    protected SchemaOptions: mongoose.SchemaOptions = {
        collection: 'users',
        toObject: { getters: true, transform: transformFn },
        toJSON: { getters: true, transform: transformFn },
    }

    protected textSearchFields: string[] = ['email', 'name'];

    protected populateOptions: PopulateOpts = [];

    constructor(Mongoose: mongoose.Mongoose) {
        super(Mongoose, ModelNameEnum.USER);
        this.setup();
    }

    protected addSchemaEnhancement(): void {
        this.Schema.index({ name: 1 });
        this.Schema.index({ email: 1 });
    }
}
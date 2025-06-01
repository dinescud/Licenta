import mongoose from "mongoose";
import { AbstractModel } from "./AbstractModel";
import { ModelNameEnum, PopulateOpts } from "../utils/types";
import { UserModelType } from "../types";
import { transformFn } from "../utils/utils";

export class UserModel extends AbstractModel<UserModelType> {
    protected SchemaDef: mongoose.SchemaDefinition = {
        email: { type: String, required: false, unique: true },
        externalId: { type: String, required: true, unique: true },
        setting: {
            autoScanning: { type: Boolean, default: false },
            notificationsEmail: { type: Boolean, default: true },
            notificationEmailAddress: { type: String, default: '' },
            sensitivityThreshold: { type: Number, default: 0 },
            historyStatistics: { type: Boolean, default: true },
            blockNavigation: { type: Boolean, default: true }
        }
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
        // this.Schema.index({ email: 1 });
    }

    /**
     * Custom find One method in order to return password.
     * 
     * @param {object} filter mongo db query
     * @returns {Promise<UserModelType | null>} returned user.
     */
    public async findOneWithPassword(filter: object): Promise<UserModelType | null> {
        return this.Model.findOne(filter).select('+password').exec()
            .then(async response => response ? response : null)
            .then(response => response ? response.toObject() as UserModelType : null)
            // .catch(error => { logger.error(error); throw error; });
    }
}
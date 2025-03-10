import * as mongoose from 'mongoose';
import _ from "lodash";

// import { RoutesInstance } from "./routes/RoutesInstance";
// import { MiddlewareInstance } from "./middleware/MiddlewareInstance";
// import { BzlInstance } from "./bzl/BzlInstance";
import { ModelsInstance } from './models/ModelsInstance';
import { config } from './config/config';
import * as bcrypt from 'bcryptjs';

export class Factory {
    private static _instance: Factory;
    private static routes: RoutesInstance;
    private static middleware: MiddlewareInstance;
    private static bzl: BzlInstance;
    private static models: ModelsInstance;
    private static mongoose: mongoose.Mongoose;
    private hashSalt: string = bcrypt.genSaltSync();

    private constructor() {
        if (Factory._instance) throw new Error('Use Factory.getInstance() instead of new Factory()');

        mongoose.set('strictQuery', false); // https://mongoosejs.com/docs/guide.html#strict
        mongoose.connect(config.db, {}).then(() => console.log('Connected to mongoDb'));
        (mongoose as any).Promise = Promise;
        Factory.mongoose = mongoose;
        Factory.models = new ModelsInstance(Factory.mongoose);

        Factory.bzl = new BzlInstance(Factory.models, this.hashSalt);
        Factory.middleware = new MiddlewareInstance();
        Factory.routes = new RoutesInstance(Factory.middleware);
        Factory._instance = this;
    }

    /**
     * Method used to get a factory instance
     * 
     * @returns {Factory} factory instance
     */
    static getInstance(): Factory {
        if(_.isNil(Factory._instance)) Factory._instance = new Factory();
        return Factory._instance;
    }

    /**
     * Method used to get routes
     * 
     * @returns {RoutesInstance} routes
     */
    getRoutes(): RoutesInstance {
        return Factory.routes;
    }

    /**
     * Method used to get middlewares
     * 
     * @returns {MiddlewareInstance} middlewares
     */
    getMiddlewares(): MiddlewareInstance {
        return Factory.middleware;
    }

    /**
     * Method used to get bzl
     * 
     * @returns {BzlInstance} bzl
     */
    getBzl(): BzlInstance {
        return Factory.bzl;
    }

    /**
     * Method used to get models
     * 
     * @returns {ModelsInstance} models
     */
    getModels(): ModelsInstance { 
        return Factory.models; 
    };

}
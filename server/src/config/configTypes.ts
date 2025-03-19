import { CookieOptions } from "express";

export interface CONFIG_TYPES {
    readonly express: {
        readonly PORT: number;
    },
    readonly mongo_db: string;
    readonly mongoQueryLimit: number;
    readonly jwt_secret: string;
    readonly cookieConfig: CookieOptions;
}
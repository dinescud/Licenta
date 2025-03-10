import { CONFIG_TYPES } from "./configTypes";

export const config: CONFIG_TYPES = {
    express: {
        PORT: 3000,
    },
    db: 'mongodb://localhost:37017/licenta',
    mongoQueryLimit: 500,
    jwt_secret: 'cheie_secreta_nebuna',
    cookieConfig: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24, // one day
        sameSite: 'strict'
    }
}
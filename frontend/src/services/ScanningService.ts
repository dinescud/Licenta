import { getProfile } from "../pages/auth/Auth";
import { POST_REQUEST } from "./requests";

export const scanDomain = async (url: string) => {
    const userId = await getProfile();
    console.log('userrrrrrrr', userId);
    return POST_REQUEST('/domain/scan', { externalId: userId, url: url, populate: true })
        .then(async (response) => {
            if (response.status === 200) {
                const result = await response.json();
                return result as any;
            } else {
                const error = await response.json();
                throw new Error(error.error);
            }
        })
}
import { UserRequest } from "../../types";
import { getUserSettings, setUserSettings, getBlackList, addBlackListItem, removeBlackListItem } from "../../bzl/api/userApi";
import { UserSettingsType } from "../../bzl/types";
import { set } from "lodash";

export class UserMiddleware {
  async getUserSettings(req: any): Promise<UserSettingsType> {
    const userRequest: UserRequest = JSON.parse(JSON.stringify({
        externalId: req.body.externalId,
    }));

    return getUserSettings(userRequest.externalId);  
  }

  async setUserSettings(req: any): Promise<UserSettingsType> {
    const userRequest: UserRequest = JSON.parse(JSON.stringify({
        externalId: req.body.externalId,
    }));
    
    const settings = req.body.settings as { key: keyof UserSettingsType; value: any }[];
    return setUserSettings(userRequest.externalId, settings);  
  }

  async getBlackList(req: any): Promise<string[]> {
    const userRequest: UserRequest = JSON.parse(JSON.stringify({
        externalId: req.body.externalId,
    }));

    return getBlackList(userRequest.externalId);
  }

  async addBlackListItem(req: any): Promise<void> {
    const userRequest: UserRequest = JSON.parse(JSON.stringify({
        externalId: req.body.externalId,
    }));

    const website = req.body.website as string;
    return addBlackListItem(userRequest.externalId, website);
  }

  async removeBlackListItem(req: any): Promise<void> {
    const userRequest: UserRequest = JSON.parse(JSON.stringify({
        externalId: req.body.externalId,
    }));

    const website = req.body.website as string;
    return removeBlackListItem(userRequest.externalId, website);
  }
}
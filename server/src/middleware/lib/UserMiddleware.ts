import { UserRequest } from "../../types";
import { getUserSettings, setUserSettings, getBlackList, addBlackListItem, removeBlackListItem } from "../../bzl/api/userApi";
import { UserSettingsType } from "../../bzl/types";
import { set } from "lodash";

export class UserMiddleware {
  async getUserSettings(req: any): Promise<UserSettingsType> {
    const userRequest: UserRequest = JSON.parse(JSON.stringify({
        userId: req.body.userId,
    }));

    return getUserSettings(userRequest.userId);  
  }

  async setUserSettings(req: any): Promise<UserSettingsType> {
    const userRequest: UserRequest = JSON.parse(JSON.stringify({
        userId: req.body.userId,
    }));
    
    const settings = req.body.settings as { key: keyof UserSettingsType; value: any }[];
    return setUserSettings(userRequest.userId, settings);  
  }

  async getBlackList(req: any): Promise<string[]> {
    const userRequest: UserRequest = JSON.parse(JSON.stringify({
        userId: req.body.userId,
    }));

    return getBlackList(userRequest.userId);
  }

  async addBlackListItem(req: any): Promise<void> {
    const userRequest: UserRequest = JSON.parse(JSON.stringify({
        userId: req.body.userId,
    }));

    const website = req.body.website as string;
    return addBlackListItem(userRequest.userId, website);
  }

  async removeBlackListItem(req: any): Promise<void> {
    const userRequest: UserRequest = JSON.parse(JSON.stringify({
        userId: req.body.userId,
    }));

    const website = req.body.website as string;
    return removeBlackListItem(userRequest.userId, website);
  }
}
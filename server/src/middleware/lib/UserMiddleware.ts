import { UserRequest } from "../../types";
import { getUserSettings } from "../../bzl/api/userApi";
import { UserSettingsType } from "../../bzl/types";

export class UserMiddleware {
  async getUserSettings(req: any): Promise<UserSettingsType> {

    const userRequest: UserRequest = JSON.parse(JSON.stringify({
        userId: req.body.userId,
    }));

    return getUserSettings(userRequest.userId);  
  }
}
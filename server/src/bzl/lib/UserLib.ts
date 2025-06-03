import { Factory } from "../../factory";
import { UserModel } from "../../models/lib/UserModel";
import { UserModelType } from "../../models/types";
import {
  ResourceWithPagination,
  UserBrowseFilter,
  UserDeleteFilter,
} from "../../types";
import { UserSettingsType } from "../types";
import { formatPaginationFilter } from "../utils";

export class UserLib {
  private userModel: UserModel;

  constructor(model: UserModel) {
    this.userModel = model;
  }

  async getUserSettings(userId: string): Promise<UserSettingsType> {
    try {
      const user = await Factory.getInstance()
        .getModels()
        .userModel.findOne({ userId: userId });
      if (!user) {
        throw new Error("User not found");
      }
      return user.settings as UserSettingsType;
    } catch (error) {
      console.error("Error fetching user settings:", error);
      throw new Error("Internal server error");
    }
  }

  async setUserSettings(
    userId: string,
    settings: { key: keyof UserSettingsType; value: any }[]
  ): Promise<UserSettingsType> {
    try {
      const user = await Factory.getInstance()
        .getModels()
        .userModel.findOne({ userId: userId });
      if (!user) {
        throw new Error("User not found");
      }

      for (const setting of settings) {
        if (setting.key in user.settings) {
          (user.settings as any)[setting.key] = setting.value;
        }
      }
      return user.settings;
    } catch (error) {
      console.error("Error setting user settings:", error);
      throw new Error("Internal server error");
    }
  }
}

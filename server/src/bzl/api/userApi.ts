import { Factory } from "../../factory";
import { ScanHistoryModelType } from "../../models/types";
import { UserSettingsType } from "../types";

export const getUserSettings = async (
  userId: string
): Promise<UserSettingsType> => {
  return new Promise((resolve, reject) => {
    if (!userId) {
      reject(new Error("User ID is required"));
      return;
    }

    Factory.getInstance()
      .getBzl()
      .userLib.getUserSettings(userId)
      .then((userSettings) => {
        resolve(userSettings);
      })
      .catch((error) => {
        console.error("Error fetching user settings:", error);
        reject(new Error("Internal server error"));
      });
  });
};

export const setUserSettings = async (
  userId: string,
  settings: { key: keyof UserSettingsType; value: any }[]
): Promise<UserSettingsType> => {
  return new Promise((resolve, reject) => {
    if (!userId) {
      reject(new Error("User ID is required"));
      return;
    }

    Factory.getInstance()
      .getBzl()
      .userLib.setUserSettings(userId, settings)
      .then(async(updatedSettings) => {
        await Factory.getInstance()
          .getModels()
          .userModel.updateOne(
            { userId: userId },
            { $set: { settings: updatedSettings } }
          );
      });
  });
};
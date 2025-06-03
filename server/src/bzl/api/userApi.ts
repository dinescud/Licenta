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
        if (error.message === "USER_NOT_FOUND") {
          reject({ status: 404, message: "User not found" });
        } else {
          console.error("Error fetching user settings:", error);
          reject({ status: 500, message: "Internal server error" });
        }
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

export const getBlackList = async (
  userId: string
): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    if (!userId) {
      reject(new Error("User ID is required"));
      return;
    }

    Factory.getInstance()
      .getBzl()
      .userLib.getUserBlackList(userId)
      .then((userBlackList) => {
        resolve(userBlackList);
      })
      .catch((error) => {
        console.error("Error fetching user settings:", error);
        reject(new Error("Internal server error"));
      });
  });
};

export const addBlackListItem = async (
  userId: string,
  website: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!userId) {
      reject(new Error("User ID is required"));
      return;
    }

    Factory.getInstance()
      .getBzl()
      .userLib.addBlackListItem(userId, website)
  });
};

export const removeBlackListItem = async (
  userId: string,
  website: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!userId) {
      reject(new Error("User ID is required"));
      return;
    }

    Factory.getInstance()
      .getBzl()
      .userLib.removeBlackListItem(userId, website)
  });
};
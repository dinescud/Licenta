import { Factory } from "../../factory";
import { ScanHistoryModelType } from "../../models/types";
import { UserSettingsType } from "../types";

export const getUserSettings = async (
  externalId: string
): Promise<UserSettingsType> => {
  return new Promise((resolve, reject) => {
    if (!externalId) {
      reject(new Error("External ID is required"));
      return;
    }

    Factory.getInstance()
      .getBzl()
      .userLib.getUserSettings(externalId)
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
  externalId: string,
  settings: { key: keyof UserSettingsType; value: any }[]
): Promise<UserSettingsType> => {
  return new Promise((resolve, reject) => {
    if (!externalId) {
      reject(new Error("External ID is required"));
      return;
    }

    Factory.getInstance()
      .getBzl()
      .userLib.setUserSettings(externalId, settings)
      .then(async(updatedSettings) => {
        await Factory.getInstance()
          .getModels()
          .userModel.updateOne(
            { externalId },
            { $set: { settings: updatedSettings } }
          );
        resolve(updatedSettings);
      });
  });
};

export const getBlackList = async (
  externalId: string
): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    if (!externalId) {
      reject(new Error("External ID is required"));
      return;
    }

    Factory.getInstance()
      .getBzl()
      .userLib.getUserBlackList(externalId)
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
  externalId: string,
  website: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!externalId) {
      reject(new Error("External ID is required"));
      return;
    }

    Factory.getInstance()
      .getBzl()
      .userLib.addBlackListItem(externalId, website)
      .then(resolve)
      .catch(reject);
  });
};

export const removeBlackListItem = async (
  externalId: string,
  website: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!externalId) {
      reject(new Error("External ID is required"));
      return;
    }

    Factory.getInstance()
      .getBzl()
      .userLib.removeBlackListItem(externalId, website)
      .then(resolve)
      .catch(reject);
  });
};
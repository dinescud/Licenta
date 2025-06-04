import { getProfile } from "../pages/auth/Auth";
import { UserSettingsType } from "../types";
import { POST_REQUEST } from "./requests";

export const getSettings = async () => {
  const userId = await getProfile();
  return POST_REQUEST("/user/getSettings", {
    externalId: userId,
  }).then(async (response) => {
    if (response.status === 200) {
      const result = await response.json();
      // Save settings to localStorage
      localStorage.setItem("userSettings", JSON.stringify(result));
      return result as any;
    } else {
      const error = await response.json();
      throw new Error(error.error);
    }
  });
};

export const setSettings = async (settings: { key: keyof UserSettingsType; value: any }[]) => {
  const userId = await getProfile();
  return POST_REQUEST("/user/setSettings", {
    externalId: userId,
    settings,
  }).then(async (response) => {
    if (response.status === 200) {
      const result = await response.json();
      // Update localStorage with new settings
      localStorage.setItem("userSettings", JSON.stringify(result));
      return result as any;
    } else {
      const error = await response.json();
      throw new Error(error.error);
    }
  });
};

export const getBlackList = async () => {
  const userId = await getProfile();
  return POST_REQUEST("/user/getBlackList", {
    externalId: userId,
  }).then(async (response) => {
    if (response.status === 200) {
      const result = await response.json();
      return result as any;
    } else {
      const error = await response.json();
      console.log("Error fetching blacklist:", error);
      throw new Error(error.error);
    }
  });
};

export const addBlackListItem = async (website: string) => {
  const userId = await getProfile();
  return POST_REQUEST("/user/addBlackListItem", {
    externalId: userId,
    website,
  }).then(async (response) => {
    if (response.status === 200) {
      const result = await response.json();
      return result as any;
    } else {
      const error = await response.json();
      throw new Error(error.error);
    }
  });
};

export const removeBlackListItem = async (website: string) => {
  const userId = await getProfile();
  return POST_REQUEST("/user/removeBlackListItem", {
    externalId: userId,
    website,
  }).then(async (response) => {
    if (response.status === 200) {
      const result = await response.json();
      return result as any;
    } else {
      const error = await response.json();
      throw new Error(error.error);
    }
  });
};

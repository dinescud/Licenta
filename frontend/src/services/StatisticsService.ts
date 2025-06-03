import { getProfile } from "../pages/auth/Auth";
import { POST_REQUEST } from "./requests";

export const getMostScanned = async (timeSpan: string) => {
  const userId = await getProfile();
  return POST_REQUEST("/statistics/getMostScanned", {
    externalId: userId,
    timeSpan
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

export const getStatusStatistics = async (timeSpan: string) => {
  const userId = await getProfile();
  return POST_REQUEST("/statistics/getStatusStatistics", {
    externalId: userId,
    timeSpan
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

export const getTopCountries = async (timeSpan: string) => {
  const userId = await getProfile();
  return POST_REQUEST("/statistics/getTopCountries", {
    externalId: userId,
    timeSpan
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

export const getDomainAge = async (timeSpan: string) => {
  const userId = await getProfile();
  return POST_REQUEST("/statistics/getDomainAge", {
    externalId: userId,
    timeSpan
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

export const getTotalScanned = async (timeSpan: string) => {
  const userId = await getProfile();
  return POST_REQUEST("/statistics/getTotalScanned", {
    externalId: userId,
    timeSpan
  }).then(async (response) => {
    console.log('RESPONSE:', response)
    if (response.status === 200) {
      const result = await response.json();
      console.log('RESULT', result)
      return result.total as number;
    } else {
      const error = await response.json();
      throw new Error(error.error);
    }
  });
};

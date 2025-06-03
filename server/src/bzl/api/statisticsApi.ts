import { Factory } from "../../factory";
import {
  DomainAgeStatistics,
  ScanStatusStatistics,
  StatisticsType,
} from "../types";

export const getScanStatusStatistics = async (
  externalId: string,
  timeSpan: string
): Promise<ScanStatusStatistics> => {
  return new Promise((resolve, reject) => {
    if (!externalId) {
      reject(new Error("External ID is required"));
      return;
    }
    Factory.getInstance()
      .getModels()
      .scanHistoryModel.findOne({ externalId: externalId })
      .then(async (userHistory) => {
        if (
          userHistory &&
          userHistory.history &&
          userHistory.history.length > 0
        ) {
          const scanStatus = await Factory.getInstance()
            .getBzl()
            .statisticsLib.getScanStatusStatistics(
              userHistory.history,
              timeSpan
            );
          resolve(scanStatus);
        } else {
          resolve({ safe: 0, dangerous: 0 });
        }
      })
      .catch((err) => {
        console.error('Error in getScanStatusStatistics:', err);
        reject(new Error('Internal server error'));
      });
  });
};

export const getMostScannedStatistics = async (
  externalId: string,
  timeSpan: string
): Promise<Record<string, number>> => {
  return new Promise((resolve, reject) => {
    if (!externalId) {
      reject(new Error("External ID is required"));
      return;
    }
    Factory.getInstance()
      .getModels()
      .scanHistoryModel.findOne({ externalId: externalId })
      .then(async (userHistory) => {
        if (
          userHistory &&
          userHistory.history &&
          userHistory.history.length > 0
        ) {
          const mostScanned = await Factory.getInstance()
            .getBzl()
            .statisticsLib.getMostScannedStatistics(
              userHistory.history,
              timeSpan
            );
          resolve(mostScanned);
        } else {
          resolve({});
        }
      })
      .catch((err) => {
        console.error('Error in getMostScannedStatistics:', err);
        reject(new Error('Internal server error'));
      });
  });
};

export const getDomainAgeStatistics = async (
  externalId: string,
  timeSpan: string
): Promise<DomainAgeStatistics> => {
  return new Promise((resolve, reject) => {
    if (!externalId) {
      reject(new Error("External ID is required"));
      return;
    }
    Factory.getInstance()
      .getModels()
      .scanHistoryModel.findOne({ externalId: externalId })
      .then(async (userHistory) => {
        if (
          userHistory &&
          userHistory.history &&
          userHistory.history.length > 0
        ) {
          const domainAge = await Factory.getInstance()
            .getBzl()
            .statisticsLib.getDomainAgeStatistics(
              userHistory.history,
              timeSpan
            );
          resolve(domainAge);
        } else {
          resolve({
            lessThanOneYear: 0,
            oneToFiveYears: 0,
            fiveToTenYears: 0,
            moreThanTenYears: 0,
            newest: "",
            oldest: "",
          });
        }
      })
      .catch((err) => {
        console.error('Error in getDomainAgeStatistics:', err);
        reject(new Error('Internal server error'));
      });
  });
};

export const getTotalScans = async (
  externalId: string,
  timeSpan: string
): Promise<number> => {
  return new Promise((resolve, reject) => {
    if (!externalId) {
      reject(new Error("External ID is required"));
      return;
    }
     Factory.getInstance()
      .getModels()
      .scanHistoryModel.findOne({ externalId: externalId })
      .then(async (userHistory) => {
        if (
          userHistory &&
          userHistory.history &&
          userHistory.history.length > 0
        ) {
          const totalScans = await Factory.getInstance()
            .getBzl()
            .statisticsLib.getTotalScans(
              userHistory.history,
              timeSpan
            );
          resolve(totalScans);
        } else {
          resolve(0);
        }
      })
      .catch((err) => {
        console.error('Error in getTotalScans:', err);
        reject(new Error('Internal server error'));
      });
  });
};

export const getTopCountries = async (
  externalId: string,
  timeSpan: string
): Promise<Record<string, number>> => {
  return new Promise((resolve, reject) => {
    if (!externalId) {
      reject(new Error("External ID is required"));
      return;
    }
    Factory.getInstance()
      .getModels()
      .scanHistoryModel.findOne({ externalId: externalId })
      .then(async (userHistory) => {
        if (
          userHistory &&
          userHistory.history &&
          userHistory.history.length > 0
        ) {
          const topCountries = await Factory.getInstance()
            .getBzl()
            .statisticsLib.getTopCountriesStatistics(
              userHistory.history,
              timeSpan
            );
          resolve(topCountries);
        } else {
          resolve({});
        }
      })
      .catch((err) => {
        console.error('Error in getTopCountries:', err);
        reject(new Error('Internal server error'));
      });
  });
};

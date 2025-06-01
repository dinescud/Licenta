import { Factory } from "../../factory";
import { DomainModel } from "../../models/lib/DomainModel";
import _ from "lodash";
import { DomainAgeStatistics, ScanStatusStatistics } from "../types";
import { parseDateThreshold } from "../utils";
import { HistoryType } from "../../models/types";

export class StatisticsLib {
  /**
   * Count how many scans (in the given time span) are “safe” (detectionCounts === 0)
   * vs “dangerous” (detectionCounts > 0). We pull in each Domain via populate().
   */
  public async getScanStatusStatistics(
    userHistory: HistoryType[],
    timeSpan: string
  ): Promise<ScanStatusStatistics> {
    const threshold = parseDateThreshold(timeSpan);

    // 2) If threshold exists, filter by scannedAt >= threshold
    const filteredScans = threshold
      ? _.filter(userHistory, (entry) => entry.scannedAt >= threshold)
      : userHistory;

    // 3) For each entry, look at entry.info.detectionCounts (string → int)
    //    Then count safe vs dangerous:
    let safe = 0;
    let dangerous = 0;

    for (const entry of filteredScans) {
      const dcStr = (entry.info as any).detectionCounts; // domain’s detectionCounts is a string
      const dcNum = parseInt(dcStr, 10) || 0;
      if (dcNum === 0) {
        safe += 1;
      } else {
        dangerous += 1;
      }
    }

    return { safe, dangerous };
  }

  /**
   * Return a map { <serverLocation>: <# of scans> } within the given timeSpan.
   * We assume entry.info.serverLocation is a country string.
   */
  public async getTopCountriesStatistics(
    userHistory: HistoryType[],
    timeSpan: string
  ): Promise<Record<string, number>> {
    const threshold = parseDateThreshold(timeSpan);
    const filteredScans = threshold
      ? _.filter(userHistory, (entry) => entry.scannedAt >= threshold)
      : userHistory;

    // Build a list of serverLocation values:
    const locations = filteredScans.map((entry) => {
      const loc = (entry.info as any).serverLocation;
      return loc || "Unknown";
    });

    // Use lodash to countBy the array:
    const counts = _.countBy(locations);

    return counts; // e.g. { "United States": 5, Germany: 3, Unknown: 2 }
  }

  /**
   * Return { <websiteAddress>: <# of total scans> } (over all time for this user).
   */
  public async getMostScannedStatistics(
    userHistory: HistoryType[],
    timeSpan: string
  ): Promise<Record<string, number>> {
    const threshold = parseDateThreshold(timeSpan);
    const filteredScans = threshold
      ? _.filter(userHistory, (entry) => entry.scannedAt >= threshold)
      : userHistory;
    // Build an array of websiteAddress strings:
    const addresses = filteredScans.map((entry) => {
      return (entry.info as any).websiteAddress;
    });

    // Count how many times each address appears:
    const counts = _.countBy(addresses);

    return counts; // e.g. { "example.com": 4, "google.com": 10, ... }
  }

  /**
   * Return domain‐age buckets + newest/oldest domain (by registration date) within the timespan.
   * Buckets: <1yr, 1–5yr, 5–10yr, >10yr. Also return websiteAddress of the most recently registered
   * domain and the oldest registered domain in the filtered set.
   */
  public async getDomainAgeStatistics(
    userHistory: HistoryType[],
    timeSpan: string
  ): Promise<DomainAgeStatistics> {
    const threshold = parseDateThreshold(timeSpan);
    const filteredScans = threshold
      ? _.filter(userHistory, (entry) => entry.scannedAt >= threshold)
      : userHistory;

    // Prepare an array of objects { websiteAddress, regDate (Date) }:
    type DomainEntry = { websiteAddress: string; regDate: Date };
    const domainEntries: DomainEntry[] = [];

    for (const entry of filteredScans) {
      const dom = entry.info as any;
      // DomainRegistration is stored as a string (e.g. "2020-05-15T00:00:00Z")
      const regDate = new Date(dom.domainRegistration);
      if (!isNaN(regDate.getTime())) {
        domainEntries.push({
          websiteAddress: dom.websiteAddress,
          regDate,
        });
      }
    }

    // If there are no valid domainEntries, return zeros + empty strings:
    if (domainEntries.length === 0) {
      return {
        lessThanOneYear: 0,
        oneToFiveYears: 0,
        fiveToTenYears: 0,
        moreThanTenYears: 0,
        newest: "",
        oldest: "",
      };
    }

    // 1) Bucket counts:
    let lessThanOneYear = 0;
    let oneToFiveYears = 0;
    let fiveToTenYears = 0;
    let moreThanTenYears = 0;

    const now = new Date();
    for (const { regDate } of domainEntries) {
      const ageMs = now.getTime() - regDate.getTime();
      const ageYears = ageMs / (1000 * 60 * 60 * 24 * 365);

      if (ageYears < 1) {
        lessThanOneYear += 1;
      } else if (ageYears < 5) {
        oneToFiveYears += 1;
      } else if (ageYears < 10) {
        fiveToTenYears += 1;
      } else {
        moreThanTenYears += 1;
      }
    }

    // 2) Find the oldest and newest by regDate:
    //    Use lodash to sort by regDate ascending → first is oldest; descending → first is newest.
    const sortedAsc = _.sortBy(domainEntries, (d) => d.regDate.getTime());
    const oldestEntry = sortedAsc[0].websiteAddress;
    const newestEntry = sortedAsc[sortedAsc.length - 1].websiteAddress;

    return {
      lessThanOneYear,
      oneToFiveYears,
      fiveToTenYears,
      moreThanTenYears,
      newest: newestEntry,
      oldest: oldestEntry,
    };
  }

  /**
   * Return total number of scans (entries in history) in the given timespan.
   */
  public async getTotalScans(
    userHistory: HistoryType[],
    timeSpan: string
  ): Promise<number> {
    const threshold = parseDateThreshold(timeSpan);
    const filteredScans = threshold
      ? _.filter(userHistory, (entry) => entry.scannedAt >= threshold)
      : userHistory;

    return filteredScans.length;
  }
}

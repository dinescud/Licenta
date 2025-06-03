import { DomainAgeStatistics, ScanStatusStatistics } from "../../bzl/types";
import {
  getDomainAgeStatistics,
  getMostScannedStatistics,
  getScanStatusStatistics,
  getTopCountries,
  getTotalScans,
} from "../../bzl/api/statisticsApi";
import { StatisticsRequest } from "../../types";

export class StatisticsMiddleware {
  async getScanStatusStatistics(req: any): Promise<ScanStatusStatistics> {
    console.log();
    const statisticsRequest: StatisticsRequest = JSON.parse(
      JSON.stringify({
        externalId: req.body.externalId,
        timeSpan: req.body.timeSpan || "all",
      })
    );

    return getScanStatusStatistics(
      statisticsRequest.externalId,
      statisticsRequest.timeSpan
    );
  }

  async getMostScannedStatistics(req: any): Promise<Record<string, number>> {
    const statisticsRequest: StatisticsRequest = JSON.parse(
      JSON.stringify({
        externalId: req.body.externalId,
        timeSpan: req.body.timeSpan || "all",
      })
    );

    return getMostScannedStatistics(
      statisticsRequest.externalId,
      statisticsRequest.timeSpan
    );
  }

  async getDomainAgeStatistics(req: any): Promise<DomainAgeStatistics> {
    const statisticsRequest: StatisticsRequest = JSON.parse(
      JSON.stringify({
        externalId: req.body.externalId,
        timeSpan: req.body.timeSpan || "all",
      })
    );

    return getDomainAgeStatistics(
      statisticsRequest.externalId,
      statisticsRequest.timeSpan
    );
  }

  async getTotalScans(req: any): Promise<number> {
    console.log("REQ BOD:", req.body);

    const statisticsRequest: StatisticsRequest = JSON.parse(
      JSON.stringify({
        externalId: req.body.externalId,
        timeSpan: req.body.timeSpan || "all",
      })
    );

    return getTotalScans(
      statisticsRequest.externalId,
      statisticsRequest.timeSpan
    );
  }

  async getTopCountries(req: any): Promise<Record<string, number>> {
    console.log("REQ BOD COUNTRIES:", req.body);
    const statisticsRequest: StatisticsRequest = JSON.parse(
      JSON.stringify({
        externalId: req.body.externalId,
        timeSpan: req.body.timeSpan || "all",
      })
    );

    return getTopCountries(
      statisticsRequest.externalId,
      statisticsRequest.timeSpan
    );
  }
}

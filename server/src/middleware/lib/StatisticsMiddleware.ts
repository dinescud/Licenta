import { DomainAgeStatistics, ScanStatusStatistics } from "../../bzl/types";
import { getDomainAgeStatistics, getMostScannedStatistics, getScanStatusStatistics, getTopCountries, getTotalScans } from "../../bzl/api/statisticsApi";
import { StatisticsRequest } from "../../types";

export class StatisticsMiddleware {
  async getScanStatusStatistics(req: any): Promise<ScanStatusStatistics> {
    console.log('REQ BOD:', req.body)

    const statisticsRequest: StatisticsRequest = JSON.parse(JSON.stringify({
        userId: req.body.userId,
        timeSpan: req.body.timeSpan || 'all'
    }));

    return getScanStatusStatistics(statisticsRequest.userId, statisticsRequest.timeSpan);  
  }

  async getMostScannedStatistics(req: any): Promise<Record<string, number>> {
    console.log('REQ BOD:', req.body)

    const statisticsRequest: StatisticsRequest = JSON.parse(JSON.stringify({
        userId: req.body.userId,
        timeSpan: req.body.timeSpan || 'all'
    }));

    return getMostScannedStatistics(statisticsRequest.userId, statisticsRequest.timeSpan);  
  }

  async getDomainAgeStatistics(req: any): Promise<DomainAgeStatistics> {
    console.log('REQ BOD:', req.body)

    const statisticsRequest: StatisticsRequest = JSON.parse(JSON.stringify({
        userId: req.body.userId,
        timeSpan: req.body.timeSpan || 'all'
    }));

    return getDomainAgeStatistics(statisticsRequest.userId, statisticsRequest.timeSpan);  
  }

  async getTotalScans(req: any): Promise<number> {
    console.log('REQ BOD:', req.body)

    const statisticsRequest: StatisticsRequest = JSON.parse(JSON.stringify({
        userId: req.body.userId,
        timeSpan: req.body.timeSpan || 'all'
    }));

    return getTotalScans(statisticsRequest.userId, statisticsRequest.timeSpan);  
  }

  async getTopCountries(req: any): Promise<Record<string, number>> {
    console.log('REQ BOD:', req.body)

    const statisticsRequest: StatisticsRequest = JSON.parse(JSON.stringify({
        userId: req.body.userId,
        timeSpan: req.body.timeSpan || 'all'
    }));

    return getTopCountries(statisticsRequest.userId, statisticsRequest.timeSpan);  
  }
}
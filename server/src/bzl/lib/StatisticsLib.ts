import { Factory } from "../../factory";
import { DomainModel } from "../../models/lib/DomainModel";

export class StatisticsLib {
  private static statistics: Record<string, any> = {};

  // public async getScanStatusStatistics(userId: string): Promise<Record<string, number>> {
  //   const userHistory = await Factory.getInstance().getModels().scanHistoryModel.findOne({ user: userId })
  //   const scanResults = userHistory?.history || [];

  // }

  // public async getServerLocationStatistics(userId: string): Promise<Record<string, any>[]> {
  // }


}
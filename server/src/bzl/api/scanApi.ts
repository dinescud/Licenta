import mongoose from "mongoose";
import { Factory } from "../../factory";
import { DomainModelType } from "../../models/types";
import { ScanRequest } from "../../types";
import { ScanResultsType } from "../types";
import { extractDomainName, recomputeUrl } from "../utils";

export const scan = async (userId: string, request: ScanRequest): Promise<ScanResultsType> => {
  Factory.getInstance().getModels().userModel.findOne({ userId: userId }).then(user => {
    console.log("User found:", user);
    if (!user) {
      Factory.getInstance().getModels().userModel.create({ externalId: userId });
      console.log("User not found, created new user with externalId:", userId);
    }
  });
  return extractDomainName(request.url).then(domainName => {
    return recomputeUrl(domainName).then(scanUrl => {
      return Factory.getInstance().getModels().domainModel.findOne({ websiteAddress: { $regex: new RegExp(domainName, "i") } })
      .then(async existentScan => {
        if (existentScan) {
          await Factory.getInstance().getBzl().historyLib.saveScanHistory(userId, existentScan);
          return existentScan as DomainModelType;
        } else {
          const scanResults = await Factory.getInstance().getBzl().scanLib.scrapeData(scanUrl) as DomainModelType;
          await Factory.getInstance().getBzl().historyLib.saveScanHistory(userId, scanResults)
          return scanResults;
        }
      });
    });
  });
}
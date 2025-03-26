import mongoose from "mongoose";
import { Factory } from "../../factory";
import { DomainModelType } from "../../models/types";
import { ScanRequest, UserContext } from "../../types";
import { ScanResultsType } from "../types";
import { extractDomainName, recomputeUrl } from "../utils";

// export const scan = async(userContext: UserContext, request: ScanRequest): Promise<ScanResultsType> => {
//   const domainName = await extractDomainName(request.url);
//   const scanUrl = await recomputeUrl(domainName);
//   console.log(domainName);
//   const existentScan = await Factory.getInstance().getModels().domainModel.findOne({ websiteAddress : { $regex : new RegExp(domainName, "i") } });
//   console.log('SCAN RESULTS', existentScan);
//   if (existentScan) {
//     console.log('SCAN RESULTS', existentScan);
//      return Promise.resolve(existentScan as DomainModelType)
//   } else return await Factory.getInstance().getBzl().scanLib.scrapeData(scanUrl);
// }

export const scan = async (userContext: UserContext, request: ScanRequest): Promise<ScanResultsType> => {
  return extractDomainName(request.url).then(domainName => {
    return recomputeUrl(domainName).then(scanUrl => {
      return Factory.getInstance().getModels().domainModel.findOne({ websiteAddress: { $regex: new RegExp(domainName, "i") } })
      .then(existentScan => {
        if (existentScan) {
          console.log('SCAN RESULTS', existentScan);
          return existentScan as DomainModelType;
        } else {
          return Factory.getInstance().getBzl().scanLib.scrapeData(scanUrl);
        }
      });
    });
  });
}
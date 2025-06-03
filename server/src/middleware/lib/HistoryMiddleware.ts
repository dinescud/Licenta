import { HistoryRequest, ScanRequest, UserContext } from "../../types";
import { getUserScanHistory } from '../../bzl/api/historyApi';
import { Request } from "express";
import { ScanHistoryModelType } from "../../models/types";

export class HistoryMiddleware {
  async getScanHistory(req: any): Promise<ScanHistoryModelType> {
    console.log('REQ BOD:', req.body)

    const historyRequest: HistoryRequest = JSON.parse(JSON.stringify({
        externalId: req.body.externalId,
    }));

    return getUserScanHistory(historyRequest.externalId);  
  }
}
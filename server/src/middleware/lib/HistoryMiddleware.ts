import { ScanRequest, UserContext } from "../../types";
import { getUserScanHistory } from '../../bzl/api/historyApi';
import { Request } from "express";
import { ScanHistoryModelType } from "../../models/types";

export class HistoryMiddleware {
  async getScanHistory(req: any): Promise<ScanHistoryModelType> {
    console.log('REQ BOD:', req.body)

    const scanRequest: ScanRequest = JSON.parse(JSON.stringify({
        url: req.body.url,
    }));

    return getUserScanHistory(req.user);  
  }
}
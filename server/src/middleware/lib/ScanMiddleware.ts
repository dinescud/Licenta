import { ScanRequest, UserContext } from "../../types";
import * as scan from '../../bzl/api/scanApi';
import { Request } from "express";
import { ScanResultsType } from "../../bzl/types";

export class ScanMiddleware {
  async scan(req: Request): Promise<Partial<ScanResultsType>> {
    console.log('REQ BOD:', req.body)

    const scanRequest: ScanRequest = JSON.parse(JSON.stringify({
        url: req.body.url,
        // userContext: req.body.externalId,
    }));
    
    const userContext = req.body.externalId;
    return scan.scan(userContext, scanRequest);  
  }
}
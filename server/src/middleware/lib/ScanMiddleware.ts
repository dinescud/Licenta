import { ScanRequest, UserContext } from "../../types";
import * as scan from '../../bzl/api/scanApi';
import { Request } from "express";
import { ScanResultsType } from "../../bzl/types";

export class ScanMiddleware {
  async scan(req: Request): Promise<Partial<ScanResultsType>> {
    console.log('REQ BOD:', req.body)

    const scanRequest: ScanRequest = JSON.parse(JSON.stringify({
        url: req.body.url,
    }));

    return scan.scan({} as unknown as UserContext, scanRequest);  
  }
}
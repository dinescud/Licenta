import * as cheerio from 'cheerio';
import { DomainModelType } from '../../models/types';
import { ScanHistoryModel } from '../../models/lib/ScanHistoryModel';

export class HistoryLib {
  private scanHistoryModel: ScanHistoryModel;

  constructor(model: ScanHistoryModel) {
    this.scanHistoryModel = model;
  }

  public async saveScanHistory(userId: string, data: DomainModelType): Promise<void> {
    if (!userId
    ) {
      throw new Error("User context or user ID is missing");
    }

    // TO DO: Check if the userId exists in the database and just append history 
    const saveDomain = {
      websiteAddress: data.websiteAddress,
      lastAnalysis: data.lastAnalysis,
      detectionCounts: data.detectionCounts,
      domainRegistration: data.domainRegistration,
      ipAddress: data.ipAddress,
      serverLocation: data.serverLocation,
      city: data.city,
    } as DomainModelType;

    const scanHistoryEntry = {
      user: userId, // Link the user ID
      history: [
        {
          info: saveDomain, // Save domain data and link it
          scannedAt: new Date(), // Set the current date as the scan date
        },
      ],
    };

    // Save the scan history entry in the database
    await this.scanHistoryModel.create(scanHistoryEntry);
    console.log('Saved scan history:', scanHistoryEntry);
  }
}
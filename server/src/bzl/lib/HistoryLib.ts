import * as cheerio from 'cheerio';
import { DomainModelType } from '../../models/types';
import { ScanHistoryModel } from '../../models/lib/ScanHistoryModel';

export class HistoryLib {
  private scanHistoryModel: ScanHistoryModel;

  constructor(model: ScanHistoryModel) {
    this.scanHistoryModel = model;
  }

  public async saveScanHistory(userId: string, data: DomainModelType): Promise<void> {
    if (!userId) {
      throw new Error("User context or user ID is missing");
    }

    const saveDomain = {
      websiteAddress: data.websiteAddress,
      lastAnalysis: data.lastAnalysis,
      detectionCounts: data.detectionCounts,
      domainRegistration: data.domainRegistration,
      ipAddress: data.ipAddress,
      serverLocation: data.serverLocation,
      city: data.city,
    } as DomainModelType;

    const newHistoryEntry = {
      info: saveDomain,
      scannedAt: new Date(),
    };

    // Check if the userId already exists in the database
    const existingEntry = await this.scanHistoryModel.findOne({ externalId: userId });

    if (existingEntry) {
      // If the userId exists, append the new history entry using updateOne
      await this.scanHistoryModel.updateOne(
        { userId },
        { $push: { history: newHistoryEntry } }
      );
      console.log('Appended new history entry for user:', userId);
    } else {
      // If the userId does not exist, create a new document
      const scanHistoryEntry = {
        externalId: userId,
        history: [newHistoryEntry],
      };

      await this.scanHistoryModel.create(scanHistoryEntry);
      console.log('Created new scan history entry for user:', userId);
    }
  }
}
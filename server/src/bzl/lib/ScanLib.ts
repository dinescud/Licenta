import * as cheerio from 'cheerio';
import { DomainModelType } from '../../models/types';
import { DomainModel } from '../../models/lib/DomainModel';
import { ScanResultsType } from '../types';

export class ScanLib { 
  private domainModel: DomainModel;
  
  constructor(model: DomainModel) {
      this.domainModel = model;
  }

  async scrapeData (url: string): Promise<ScanResultsType>  {
    try { 
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
      }
  
      const html = await response.text();
      const $ = cheerio.load(html);
  
      const reportData = {
        websiteAddress: $('tr:nth-child(1) td:nth-child(2) strong').text().trim().replace(/(Nothing Found)/gm, ""),
        lastAnalysis: $('tr:nth-child(2) td:nth-child(2)').text().trim().replace(/(Nothing Found)/gm, "").replace((/(Detected)/gm), ""),
        detectionCounts: $('tr:nth-child(3) td:nth-child(2)').text().trim().replace(/(Nothing Found)/gm, ""),
        domainRegistration: $('tr:nth-child(4) td:nth-child(2)').text().trim().replace(/(Nothing Found)/gm, ""),
        ipAddress: $('tr:nth-child(6) td:nth-child(2) strong').text().trim().replace(/(Nothing Found)/gm, ""),
        serverLocation: $('tr:nth-child(9) td:nth-child(2)').text().trim().replace(/(Nothing Found)/gm, ""),
        city: $('tr:nth-child(11) td:nth-child(2)').text().trim().replace(/(Nothing Found)/gm, ""),
        region: $('tr:nth-child(12) td:nth-child(2)').text().trim().replace(/(Nothing Found)/gm, ""),
      };
      console.log('SCRAPE!!!');
      console.log('BEFORE', $('tr:nth-child(2) td:nth-child(2)').text().trim());
      console.log('AFTER',  $('tr:nth-child(2) td:nth-child(2)').text().trim().replace(/(Nothing Found)/gm, "").replace((/(Rescan)/gm), "").replace((/(Detected)/gm), ""));
      await this.saveDomainData(reportData)
      return reportData;
  
    } catch (error) {

      console.error(`Error: ${error}`);
      throw error;
    }
  };

  private async saveDomainData (data: Partial<ScanResultsType>): Promise<DomainModelType> {
    const saveDomain = {
      websiteAddress: data.websiteAddress,
      lastAnalysis: data.lastAnalysis,
      detectionCounts: data.detectionCounts,
      domainRegistration: data.domainRegistration,
      ipAddress: data.ipAddress,
      serverLocation: data.serverLocation,
      city: data.city,
    } as DomainModelType;

    const domain = await this.domainModel.create(saveDomain);
    console.log('Saved domain data:', domain);
    return domain;
  }

}
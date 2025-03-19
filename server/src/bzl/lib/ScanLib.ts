import * as cheerio from 'cheerio';
import { DomainModelType } from '../../models/types';
const url = "https://www.urlvoid.com/scan/wizzair.com"

export class ScanLib { 
  async scrapeData (): Promise<Partial<DomainModelType>>  {
    try {
    //  return {
    //     message: "Hello from the server!",
    //     timestamp: new Date().toISOString(),
    //   }; 
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
      }
  
      const html = await response.text();
      const $ = cheerio.load(html);
  
      const reportData = {
        name: 'Wizzair',
        websiteAddress: $('tr:nth-child(1) td:nth-child(2)').text().trim(),
        lastAnalysis: new Date($('tr:nth-child(2) td:nth-child(2)').text().trim()),
        detectionCounts: $('tr:nth-child(3) td:nth-child(2)').text().trim(),
        domainRegistration: new Date($('tr:nth-child(4) td:nth-child(2)').text().trim()),
        ipAddress: $('tr:nth-child(6) td:nth-child(2) strong').text().trim(),
        serverLocation: $('tr:nth-child(9) td:nth-child(2)').text().trim(),
        city: $('tr:nth-child(11) td:nth-child(2)').text().trim(),
        region: $('tr:nth-child(12) td:nth-child(2)').text().trim(),
      };
      console.log('Scraped data:', reportData);
      return reportData;  // Return the data for potential further use
  
    } catch (error) {
      console.error(`Error: ${error}`);
      throw error;
    }
  };
}
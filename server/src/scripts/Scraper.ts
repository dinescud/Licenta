import * as cheerio from 'cheerio';

(async () => {
  const url = "https://www.urlvoid.com/scan/wizzair.com"
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const reportData = {
      websiteAddress: $('tr:nth-child(1) td:nth-child(2)').text().trim(),
      lastAnalysis: $('tr:nth-child(2) td:nth-child(2)').text().trim(),
      detectionCounts: $('tr:nth-child(3) td:nth-child(2)').text().trim(),
      domainRegistration: $('tr:nth-child(4) td:nth-child(2)').text().trim(),
      ipAddress: $('tr:nth-child(6) td:nth-child(2) strong').text().trim(),
      reverseDNS: $('tr:nth-child(7) td:nth-child(2)').text().trim(),
      asn: $('tr:nth-child(8) td:nth-child(2)').text().trim(),
      serverLocation: $('tr:nth-child(9) td:nth-child(2)').text().trim(),
      latLong: $('tr:nth-child(10) td:nth-child(2)').text().trim(),
      city: $('tr:nth-child(11) td:nth-child(2)').text().trim(),
      region: $('tr:nth-child(12) td:nth-child(2)').text().trim(),
    };

    console.log(reportData);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
})();
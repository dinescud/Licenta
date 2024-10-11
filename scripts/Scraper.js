const PORT = 8080;
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express();
const url = "https://www.urlvoid.com/scan/instagram.com";

// Function to scrape data
axios(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const reportData = {};

    // Scraping the required data
    reportData.websiteAddress = $('tr:nth-child(1) td:nth-child(2)').text().trim();
    reportData.lastAnalysis = $('tr:nth-child(2) td:nth-child(2)').text().trim();
    reportData.detectionCounts = $('tr:nth-child(3) td:nth-child(2)').text().trim();
    reportData.domainRegistration = $('tr:nth-child(4) td:nth-child(2)').text().trim();
    reportData.ipAddress = $('tr:nth-child(6) td:nth-child(2) strong').text().trim();
    reportData.reverseDNS = $('tr:nth-child(7) td:nth-child(2)').text().trim();
    reportData.asn = $('tr:nth-child(8) td:nth-child(2)').text().trim();
    reportData.serverLocation = $('tr:nth-child(9) td:nth-child(2)').text().trim();
    reportData.latLong = $('tr:nth-child(10) td:nth-child(2)').text().trim();
    reportData.city = $('tr:nth-child(11) td:nth-child(2)').text().trim();
    reportData.region = $('tr:nth-child(12) td:nth-child(2)').text().trim();

    // Log the scraped data to the console
    console.log(reportData);
  })
  .catch(err => console.log(err));

app.listen(PORT, () => console.log('Server running on port ' + PORT));

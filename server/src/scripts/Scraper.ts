import * as cheerio from 'cheerio';
import fetch from 'node-fetch';  
import express from 'express';
import cors from 'cors';
import { initDB } from '../db/db_init';

// const url = "https://www.urlvoid.com/scan/wizzair.com"
const app = express ();
app.use(express.json());

const PORT = process.env.PORT || 3000;

let corsOptions = {
  origin : '*',
}
app.use(cors(corsOptions));

initDB();

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

const scrapeData = async () => {
  try {
   return {
      message: "Hello from the server!",
      timestamp: new Date().toISOString(),
    }; 
    
    // const response = await fetch(url);
    // if (!response.ok) {
    //   throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    // }

    // const html = await response.text();
    // const $ = cheerio.load(html);

    // const reportData = {
    //   websiteAddress: $('tr:nth-child(1) td:nth-child(2)').text().trim(),
    //   lastAnalysis: $('tr:nth-child(2) td:nth-child(2)').text().trim(),
    //   detectionCounts: $('tr:nth-child(3) td:nth-child(2)').text().trim(),
    //   domainRegistration: $('tr:nth-child(4) td:nth-child(2)').text().trim(),
    //   ipAddress: $('tr:nth-child(6) td:nth-child(2) strong').text().trim(),
    //   serverLocation: $('tr:nth-child(9) td:nth-child(2)').text().trim(),
    //   city: $('tr:nth-child(11) td:nth-child(2)').text().trim(),
    // };
    // console.log('Scraped data:', reportData);
    // return reportData;  // Return the data for potential further use

  } catch (error) {
    console.error(`Error: ${error}`);
    throw error;
  }
};

app.get('/', (req, res) => {
  scrapeData()
   .then((data) => {
      res.send(data);
    })
   .catch((error) => {
      res.status(500).json({ error: error.message });
    });
})


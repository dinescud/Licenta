// import express from "express";
// import { StatisticsLib } from "../lib/StatisticsLib";

// const router = express.Router();

// /**
//  * GET /api/statistics
//  * Retrieves statistics for a user based on the timeframe.
//  * Query Parameters:
//  * - userId: The ID of the user.
//  * - timeframe: The timeframe for the statistics (e.g., "7d", "30d", "12month").
//  */
// router.get("/statistics", async (req, res) => {
//   const { userId, timeframe } = req.query;

//   if (!userId || !timeframe) {
//     return res.status(400).json({ error: "Missing userId or timeframe parameter" });
//   }

//   try {
//     // Fetch reputation statistics
//     // const reputation = StatisticsLib.getReputationStatistics(userId as string, timeframe as string);

//     // Fetch sentiment statistics
//     // const sentiment = StatisticsLib.getSentimentStatistics(userId as string, timeframe as string);

//     // Return the combined statistics
//     res.json({ reputation, sentiment });
//   } catch (error) {
//     console.error("Error fetching statistics:", error);
//     res.status(500).json({ error: "Failed to fetch statistics" });
//   }
// });

// export default router;
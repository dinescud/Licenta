import { Factory } from "../../factory";
import { ScanHistoryModelType } from "../../models/types";

export const getUserScanHistory = async (userId: string): Promise<ScanHistoryModelType> => {
  return new Promise((resolve, reject) => {
    if (!userId) {
      reject(new Error("User ID is required"));
      return;
    }

    Factory.getInstance()
      .getModels()
      .scanHistoryModel // Replace with your actual model name
      .findOne({ userId: userId })
      .then((userHistory) => {
        if (!userHistory || !userHistory.history || userHistory.history.length === 0) {
          reject(new Error("No scan history found for this user"));
        } else {
          resolve(userHistory); // Resolve with the `history` array
        }
      })
      .catch((error) => {
        console.error("Error fetching user scan history:", error);
        reject(new Error("Internal server error"));
      });
  });
};
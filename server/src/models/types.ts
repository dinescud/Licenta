import mongoose from "mongoose";

export interface UserModelType extends ModelType {
  // fullName: string;
  // password: string;
  email: string;
  externalId: string;
}

export interface DomainModelType extends ModelType {
  websiteAddress: string;
  lastAnalysis: string;
  detectionCounts: string;
  domainRegistration: string;
  ipAddress: string;
  serverLocation: string;
  city: string;
}

export interface ScanHistoryModelType extends ModelType {
  user: string;
  history: HistoryType[];
}

export interface HistoryType {
  info: DomainModelType;
  scannedAt: Date;
}

export interface StatisticsModelType extends ModelType {
  userId: string;
  scanResult: {
    safe: Number;
    dangerous: Number;
  };
  serverLocation: Record<string, any>[];
}

export interface ModelType extends mongoose.Document {
  id: string;
}

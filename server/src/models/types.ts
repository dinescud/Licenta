import mongoose from "mongoose";

export interface UserModelType extends ModelType {
  fullName: string;
  password: string;
  email: string;
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
  website: string;
  user: string;
  score: string;
  scannedAt: Date;
}

export interface ModelType extends mongoose.Document {
  id: string;
}
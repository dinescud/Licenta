import mongoose from "mongoose";

export interface UserModelType extends ModelType {
  fullName: string;
  password: string;
  email: string;
}

export interface DomainModelType extends ModelType {
  name: string;
  websiteAddress: string;
  lastAnalysis: Date;
  detectionCounts: string;
  domainRegistration: Date;
  ipAddress: string;
  serverLocation: string;
  city: string;
  region: string;
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
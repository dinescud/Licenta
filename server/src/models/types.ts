import mongoose from "mongoose";

export interface UserModelType extends ModelType {
  email: string;
  externalId: string;
  settings: {
    autoScanning: boolean;
    notificationsEmail: boolean;
    notificationEmailAddress: string;
    sensitivityThreshold: number;
    historyStatistics: boolean;
    blockNavigation: boolean;
  }
  blackList: string[];
}

export interface UserSettingsType {
  autoScanning: boolean;
    notificationsEmail: boolean;
    notificationEmailAddress: string;
    sensitivityThreshold: number;
    historyStatistics: boolean;
    blockNavigation: boolean;
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

export interface ScanStatusStatistics {
    safe: number;
    dangerous: number;
}

export interface DomainAgeStatistics {
    lessThanOneYear: number;
    oneToFiveYears: number;
    fiveToTenYears: number;
    moreThanTenYears: number;
    newest: string;
    oldest: string;
}

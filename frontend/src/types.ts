// export interface UserContext {
//     externalId: string,
//     // name: string,
//     email: string,
// }

export interface DomainModelType {
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

export interface HistoryType { 
    userId: string,
    history: {
        info: DomainModelType,
        scannedAt: Date,
    }[]
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

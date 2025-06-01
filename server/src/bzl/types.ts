export interface ScanResultsType {
    websiteAddress: string;
    lastAnalysis: string;
    detectionCounts: string;
    domainRegistration: string;
    ipAddress: string;
    serverLocation: string;
    city: string;
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

export interface StatisticsType {
    scanStatus: ScanStatusStatistics;
    mostScanned: Record<string, number>;
    domainAge: DomainAgeStatistics;
    totalScans: number;
    topCountries: Record<string, number>[];
}
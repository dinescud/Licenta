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

export interface ThemeType {
    light: {
        '--text-color': string,
        '--bg-color': string,
        '--danger-color': string,
        '--safe-color': string,
        '--danger-bg': string,
        '--safe-bg': string,
        '--button-text': string,
        '--toggle-bg': string,
        '--app-bg': string,
        '--card-shadow': string,
    },
    dark: {
        '--text-color': string,
    '--bg-color': string,
    '--danger-color': string,
    '--safe-color': string,
    '--danger-bg': string,
    '--safe-bg': string,
    '--button-text': string,
    '--toggle-bg': string,
    '--app-bg': string,
    '--card-shadow':string,
    }
}
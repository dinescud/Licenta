export type PopulateOpts = {
  path: string;
  model?: ModelNameEnum,
  select: string
}[];

export enum ModelNameEnum {
  USER = 'User',
  DOMAIN = 'Domain',
  SCAN_HISTORY = 'Scan History'
}

export interface PaginationFilter {
  fromItem: number;
  pageSize: number;
  orderBy: string;
  orderDir: 'asc' | 'desc';
}
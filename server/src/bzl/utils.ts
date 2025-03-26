import { QueryPaginationFilter } from "../types";

export const formatPaginationFilter = (pagination?: QueryPaginationFilter): QueryPaginationFilter => {
    if(pagination) return pagination;
    else return {
        pageSize: 50,
        fromItem: 0,
        orderBy: 'name',
        orderDir: 'asc'
    }
}

export async function extractDomainName(url: string): Promise<string> {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?([^\/]+\.[a-z]+)/);
    console.log('MATCH', match);
    return match ? match[1] : '';
  }
  
export async function recomputeUrl(domain: string): Promise<string> {
return `https://www.urlvoid.com/scan/${domain}`
}
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
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?([^\/]+\.[a-z]+)/);  // TO DO: modify to work with different urls
    console.log('MATCH', match);
    return match ? match[1] : '';
  }
  
export async function recomputeUrl(domain: string): Promise<string> {
return `https://www.urlvoid.com/scan/${domain}`
}

export function normalizeDate(dateString: string): Date | null {
  // Extract the date portion before the "|"
  const datePart = dateString.split("|")[0].trim();

  // Check if the extracted date is valid
  if (!datePart || isNaN(Date.parse(datePart))) {
    console.error("Invalid date format:", dateString);
    return null;
  }

  // Convert the date string to a Date object
  return new Date(datePart);
}
import { QueryPaginationFilter } from "../types";

export const formatPaginationFilter = (
  pagination?: QueryPaginationFilter
): QueryPaginationFilter => {
  if (pagination) return pagination;
  else
    return {
      pageSize: 50,
      fromItem: 0,
      orderBy: "name",
      orderDir: "asc",
    };
};

export async function extractDomainName(url: string): Promise<string> {
  const match = url.match(/(?:https?:\/\/)?(?:www\.)?([^\/]+\.[a-z]+)/); // TO DO: modify to work with different urls
  console.log("MATCH", match);
  return match ? match[1] : "";
}

export async function recomputeUrl(domain: string): Promise<string> {
  return `https://www.urlvoid.com/scan/${domain}`;
}

export function parseDateThreshold(timeSpan: string): Date | null {
  if (!timeSpan) {
    return null;
  }
  // Accept formats like "7days", "30days", "12months", "2years", "5h", "10m"
  const relMatch = timeSpan.match(/^(\d+)\s*(day|days|month|months|year|years|h|m)$/i);
  if (relMatch) {
    const value = parseInt(relMatch[1], 10);
    const unit = relMatch[2].toLowerCase();
    let ms = 0;
    switch (unit) {
      case "day":
      case "days":
        ms = value * 24 * 60 * 60 * 1000;
        break;
      case "month":
      case "months": {
        const now = new Date();
        now.setMonth(now.getMonth() - value);
        return now;
      }
      case "year":
      case "years": {
        const now = new Date();
        now.setFullYear(now.getFullYear() - value);
        return now;
      }
      case "h":
        ms = value * 60 * 60 * 1000;
        break;
      case "m":
        ms = value * 60 * 1000;
        break;
      default:
        ms = 0;
    }
    if (ms > 0) {
      return new Date(Date.now() - ms);
    }
    return null;
  } else {
    const parsed = new Date(timeSpan);
    if (!isNaN(parsed.getTime())) {
      return parsed;
    }
    return null;
  }
}

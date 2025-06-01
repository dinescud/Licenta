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

/**
 * Try to parse `timeSpan` into a JavaScript Date.
 * - If it matches /^\d+(d|h|m|y)$/, we subtract that amount from now.
 *   • d = days; h = hours; m = minutes; y = years (365 d each).
 * - Otherwise, if it’s a valid ISO date string, we use new Date(timeSpan).
 * - Otherwise, return null to indicate “no filtering”.
 */
export function parseDateThreshold(timeSpan: string): Date | null {
  if (!timeSpan) {
    return null;
  }
  const relMatch = timeSpan.match(/^(\d+)([dhmy])$/);
  if (relMatch) {
    const value = parseInt(relMatch[1], 10);
    const unit = relMatch[2];
    let ms = 0;
    switch (unit) {
      case "d":
        ms = value * 24 * 60 * 60 * 1000;
        break;
      case "h":
        ms = value * 60 * 60 * 1000;
        break;
      case "m":
        ms = value * 60 * 1000;
        break;
      case "y":
        ms = value * 365 * 24 * 60 * 60 * 1000;
        break;
      default:
        ms = 0;
    }
    return new Date(Date.now() - ms);
  } else {
    const parsed = new Date(timeSpan);
    if (!isNaN(parsed.getTime())) {
      return parsed;
    }
    return null;
  }
}

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

// async function getCurrentTab() {
//     let queryOptions = { active: true, lastFocusedWindow: true };
//     // `tab` will either be a `tabs.Tab` instance or `undefined`.
//     let [tab] = await chrome.tabs.query(queryOptions);
//     return tab;
//   }
export async function getCurrentTabUrl(): Promise<string> {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  console.log('TAB', tab.url);
  if (tab.url) return tab.url;
  else return ''
}


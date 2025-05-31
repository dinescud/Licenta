/**
 * Navigate to an extension page.
 * If the tab is already open, switch to it otherwise open a new browser tab.
 *
 * @param {string} path - The path to navigate to (e.g., '/scanHistory')
 */
export const goToTab = function (path: string) {
  const extensionId = chrome.runtime.id;
  const extensionUrl = `chrome-extension://${extensionId}/index.html#${path}`;

  // Create a new tab with the correct URL
  chrome.tabs.create({ url: extensionUrl });
};

export const get_statistics_tab = function (inPlace: boolean) {
  if (inPlace) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs.length > 0 && tabs[0].id) {
        chrome.tabs.update(tabs[0].id, {
          url: "chrome-extension://" + chrome.runtime.id + "/statistics.html",
        });
      }
    });
  } else {
    // Check if the statistics tab is already open
    chrome.tabs.query(
      {
        url: "chrome-extension://" + chrome.runtime.id + "/statistics.html",
        currentWindow: true,
      },
      function (tabs) {
        if (tabs.length > 0 && tabs[0].id) {
          chrome.tabs.highlight({
            windowId: tabs[0].windowId,
            tabs: tabs[0].index,
          });
          chrome.tabs.reload(tabs[0].id);
        } else {
          chrome.tabs.create({ url: chrome.runtime.getURL("statistics.html") });
        }
      }
    );
  }
};

export const get_history_tab = function (inPlace: boolean) {
  if (inPlace) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs.length > 0 && tabs[0].id) {
        chrome.tabs.update(tabs[0].id, {
          url: "chrome-extension://" + chrome.runtime.id + "/scanHistory.html",
        });
      }
    });
  } else {
    chrome.tabs.query(
      {
        url: "chrome-extension://" + chrome.runtime.id + "/scanHistory.html",
        currentWindow: true,
      },
      function (tabs) {
        if (tabs.length > 0 && tabs[0].id) {
          chrome.tabs.highlight({
            windowId: tabs[0].windowId,
            tabs: tabs[0].index,
          });
          chrome.tabs.reload(tabs[0].id);
        } else {
          chrome.tabs.create({
            url: chrome.runtime.getURL("scanHistory.html"),
          });
        }
      }
    );
  }
};

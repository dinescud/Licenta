// 1) Import your getProfile() helper
import { getProfile } from "./src/pages/auth/Auth";
import { config } from "./src/config/config";

const SERVER_BASE = config.baseUrl; // e.g. "http://localhost:3000/api"

// In-memory cache: hostname → { isDangerous, lastChecked }
const domainCache = new Map();
const CACHE_TTL_MS = 1000 * 60 * 10; // 10 minutes

// We'll register tabs listener only once we've confirmed
// that autoScanning & blockNavigation are both true.
let listenerRegistered = false;

chrome.runtime.onInstalled.addListener(initContext);
chrome.runtime.onStartup.addListener(initContext);
console.log("🛠️ background.js has been parsed!");

async function initContext() {
  console.log("▶ initContext() fired");

  try {
    // 1a) Fetch externalId via getProfile()
    const externalId = await getProfile();
    if (!externalId) {
      console.warn("No Chrome profile ID. Auto-scan disabled.");
      return;
    }

    // 1b) Fetch user settings from your server

    const resp = await fetch(`${SERVER_BASE}/user/getSettings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ externalId }),
    });
    if (!resp.ok) {
      console.error("Failed to fetch settings:", resp.status);
      return;
    }
    const userSettings = await resp.json();
    const { autoScanning, blockNavigation } = userSettings;

    // 1c) If both autoScanning and blockNavigation are true, register listener
    if (autoScanning && blockNavigation && !listenerRegistered) {
      chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) =>
        handleTabUpdate(tabId, changeInfo, tab, externalId)
      );
      listenerRegistered = true;
      console.log("Auto-scan + block listener registered.");
    }
  } catch (err) {
    console.error("Error initializing background context:", err);
  }
}

async function handleTabUpdate(tabId, changeInfo, tab, externalId) {
  // 2a) Only proceed when a top-level frame starts loading an HTTP/HTTPS URL
  if (changeInfo.status !== "loading" || !tab.url.startsWith("http")) {
    return;
  }

  // 2b) Extract hostname
  let hostname;
  try {
    hostname = new URL(tab.url).hostname.toLowerCase();
  } catch {
    return;
  }

  // 2c) Check in-memory cache
  const cached = domainCache.get(hostname);
  if (cached && Date.now() - cached.lastChecked < CACHE_TTL_MS) {
    if (cached.isDangerous) {
      blockTab(tabId);
    }
    return;
  }

  // 2d) Not cached (or expired) → call /scan
  let scanResult;
  try {
    const resp = await fetch(`${SERVER_BASE}/domain/scan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ externalId, url: tab.url }),
    });
    if (!resp.ok) {
      console.error("Scan API returned", resp.status);
      return;
    }
    scanResult = await resp.json();
    console.log("Scan result:", scanResult);
  } catch (err) {
    console.error("Error calling /scan:", err);
    return;
  }

  // 2e) Parse detectionCounts → int
  const detCount = parseInt(scanResult?.detectionCounts.split('/')[0], 10) > 0;

  // 2f) Re-fetch sensitivityThreshold (so you always use the latest setting)
  let threshold = 0;
  try {
    const resp2 = await fetch(`${SERVER_BASE}/user/getSettings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ externalId }),
    });
    if (resp2.ok) {
      const settings = await resp2.json();
      threshold = settings.sensitivityThreshold || 0;
    }
  } catch {
    // ignore errors here
  }

  const isDangerous = detCount > threshold;

  // 2g) Cache the result for 10 minutes
  domainCache.set(hostname, {
    isDangerous,
    lastChecked: Date.now(),
  });

  // 2h) If dangerous, block now
  if (isDangerous) {
    blockTab(tabId);
  }
}

function blockTab(tabId) {
  // Redirect to your warning page:
  chrome.tabs.update(tabId, { url: chrome.runtime.getURL("warning.html") });
  // If you prefer to close the tab instead, uncomment:
  // chrome.tabs.remove(tabId);
}

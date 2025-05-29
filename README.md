# Website Reputation Tool

## Overview

Website Reputation Tool is a self‑hosted Chrome extension paired with an Express.js backend that enables users to perform one‑click domain reputation checks and collect privacy‑preserving browsing statistics. By scraping authoritative sources (WHOIS registries, DNS geolocation services, and reputation aggregators) rather than relying exclusively on third‑party APIs, it provides detailed metadata—domain age, registrar details, server IP locations, and categorical risk tags—and presents aggregated analytics such as safe vs. dangerous scan ratios, most‑scanned domains, average domain age, and top server locations.

## Project Purpose

This project addresses the lack of lightweight, in‑browser tools that offer real‑time domain safety insights together with usage analytics. Typical solutions either require manual lookups on external sites or provide binary warnings without context. Dinescud‑Licenta bridges this gap by:

1. Embedding directly into Chrome for instantaneous safety assessments.
2. Scraping multiple data sources to generate a unified reputation profile.
3. Offering a customizable statistics dashboard for end users.
4. Respecting user privacy by anonymizing and pruning data on a short TTL.

## Architecture

```plaintext
┌──────────────────────┐           ┌────────────────┐
│ Chrome Extension     │   HTTPS   │ Express.js     │
│ (React, Chart.js)    ├──────────▶│ Backend Service│
│ Service Worker       │           │ (Cheerio,      │
│ Content Scripts      │◀──────────┤  MongoDB Driver)│
└──────────────────────┘           └────────────────┘
                   │                             ▲
                   │ chrome.storage.local        │
                   ▼                             │
             Chrome Local                MongoDB Collections
               Storage                           • domains (cache)
                                                  • history (per-user)
                                                  • users (profiles)
```

### Components

* **Chrome Extension** (Manifest V3)

  * **Service Worker:** Orchestrates lookup requests, caching, and messaging.
  * **Content Scripts:** Inject UI overlays and badges into web pages.
  * **Popup UI:** React-based interface for manual scans, settings, and charts.
  * **Local Storage:** Persists user preferences (auto-scan, thresholds, email toggles).

* **Backend Service**

  * **Express.js API:** Single `/lookup` endpoint that returns normalized reputation JSON.
  * **Cheerio Scraper:** Parses HTML from WHOIS, DNS geolocation, and reputation sites.
  * **MongoDB:** Stores domain metadata, user scan history, and user profiles.
  * **Cron Job:** Prunes `domains` cache entries older than 3 days.
  * **Mailing Subsystem:** Nodemailer + MailHog for development email notifications.

## Directory Structure

```plaintext
dinescud-licenta/
├── docker-compose.yml        # Local development stack
├── .nvmrc                    # Node.js version
├── package.json              # Root scripts (if needed)
├── frontend/                 # Chrome extension code
│   ├── public/               # manifest.json, icons, static assets
│   ├── src/                  # React components, pages, services
│   ├── tsconfig.json
│   └── package.json
└── server/                   # Express backend code
    ├── src/                  # API, scrapers, models, middleware
    ├── config/               # Environment and app config types
    ├── db/                   # MongoDB initialization
    ├── scripts/              # Standalone Scraper modules
    ├── bin/                  # Entry point (server.js)
    └── package.json
```

## Installation & Local Setup

1. **Prerequisites**

   * Docker & Docker Compose
   * Node.js (as specified in `.nvmrc`)
   * Chrome browser (for extension)

2. **Clone and Configure**

   ```bash
   git clone https://github.com/yourusername/dinescud-licenta.git
   cd dinescud-licenta
   ```

3. **Environment Variables**
   Copy the example env file in `server/` and fill values:

   ```env
   MONGODB_URI=mongodb://mongo:27017/licenta
   SMTP_HOST=mailhog
   SMTP_PORT=1025
   EMAIL_FROM=no-reply@licenta.local
   ```

4. **Bootstrap Local Stack**

   ```bash
   docker-compose up --build -d
   ```

   * Services: Express server, MongoDB, MailHog

5. **Install Dependencies**

   ```bash
   cd frontend && npm install
   cd ../server  && npm install
   ```

6. **Launch Frontend**

   ```bash
   cd frontend
   npm run dev
   ```

7. **Load Chrome Extension**

   * Open `chrome://extensions`
   * Enable “Developer mode”
   * Click “Load unpacked” and select `frontend/public`

## Usage

* **Manual Scan:** Click the extension icon to open the popup and press “Scan”.
* **Auto-Scan:** Enable in settings to automatically scan each new tab
* **View History:** Access the “History” page to see past scans (user permission required).
* **View Statistics:** Navigate to “Statistics” for interactive Chart.js dashboards.
* **Email Reports:** Toggle email alerts to receive daily summaries via SMTP.

## Configuration

| Variable      | Description                            | Default         |
| ------------- | -------------------------------------- | --------------- |
| `MONGODB_URI` | MongoDB connection URI                 | `mongodb://...` |
| `SMTP_HOST`   | Host for SMTP server (MailHog)         | `mailhog`       |
| `SMTP_PORT`   | Port for SMTP server                   | `1025`          |
| `EMAIL_FROM`  | Sender address for notification emails | `no-reply@...`  |

User preferences are stored in Chrome local storage under keys:

* `autoScanEnabled`
* `emailNotifications`
* `historyTracking`
* `sensitivityThreshold`

## Development & Testing

* **Backend Tests:**

  ```bash
  cd server
  npm test
  ```
* **Frontend Tests:**

  ```bash
  cd frontend
  npm test
  ```
* **Linting & Formatting:** ESLint and Prettier configured in both `frontend/` and `server/`.
* **Debugging:** Launch configurations available for VSCode under `.vscode/launch.json`.

## Contributing

This project is developed solo, but contributions are welcome. Please fork the repository and submit pull requests with clear descriptions of changes.

## License

This project is licensed under the MIT License © 2025 Your Name

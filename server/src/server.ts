import express from 'express';
var cors = require('cors')
import { Factory } from './factory';

export class Server {
  // private fac: Factory;
  private static app: express.Application;

  static async run() {
    await this.init();
    const PORT = process.env.PORT || 3000;
    this.app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  }

  static async init() {
    console.log("🛠 Initializing server...");

    // Initialize Factory
    const factory = await Factory.getInstance();

    // Set up cors options
    let corsOptions = {
      origin : '*',
    }
    
    // Set up Express
    this.app = express();
    this.app.use(cors(corsOptions));
    this.app.use(express.json());

    // Routes
    // this.setupRoutes();

    console.log("✅ Server initialized successfully.");
  }
  // private static setupRoutes() {
  //   this.app.use("/api/users", userRoutes);
  //   this.app.use("/api/domains", domainRoutes);
  //   this.app.use("/api/scans", scanHistoryRoutes);
  // }
}

// Start the server
Server.run();
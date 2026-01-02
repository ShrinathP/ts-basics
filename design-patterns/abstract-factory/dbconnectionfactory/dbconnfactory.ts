// DB connection example MongoDB, SQL DB Connection

// Step 1
// Products that the factory creates, 2 interfaces, one for DB connection, once for running Query
export interface DBConnection {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}

export interface QueryRunner {
  execute(query: string): Promise<any>;
}


// Step 3
// Abstract Factory
export interface DBFactory {
  createConnection(): DBConnection;
  createQueryRunner(connection: DBConnection): QueryRunner;
}

// Step 2 - Concrete Products - Mongo DB
import { MongoClient } from "mongodb";
import { DBConnection, QueryRunner } from "./interfaces";

class MongoDBConnection implements DBConnection {
  private client!: MongoClient;
  
  constructor(private uri: string, private sshTunnel: any) {}

  async connect() {
    // establish ssh tunnel first if needed
    await this.sshTunnel.connect();
    this.client = new MongoClient(this.uri);
    await this.client.connect();
    console.log("MongoDB connected via SSH");
  }

  async disconnect() {
    await this.client.close();
    await this.sshTunnel.disconnect();
  }

  getClient() {
    return this.client;
  }
}

class MongoQueryRunner implements QueryRunner {
  constructor(private connection: MongoDBConnection) {}

  async execute(query: string) {
    const db = this.connection.getClient().db("test");
    return db.collection("dummy").find({}).toArray(); // example
  }
}

// Concrete Products - SQL
import { Client } from "pg"; // PostgreSQL example
import { DBConnection, QueryRunner } from "./interfaces";

class SQLDBConnection implements DBConnection {
  private client!: Client;

  constructor(private config: any, private sshTunnel: any) {}

  async connect() {
    await this.sshTunnel.connect();
    this.client = new Client(this.config);
    await this.client.connect();
    console.log("SQL DB connected via SSH");
  }

  async disconnect() {
    await this.client.end();
    await this.sshTunnel.disconnect();
  }

  getClient() {
    return this.client;
  }
}

class SQLQueryRunner implements QueryRunner {
  constructor(private connection: SQLDBConnection) {}

  async execute(query: string) {
    return this.connection.getClient().query(query);
  }
}


// Concrete Factories - Mongo
export class MongoFactory implements DBFactory {
  constructor(private uri: string, private sshTunnel: any) {}

  createConnection(): DBConnection {
    return new MongoDBConnection(this.uri, this.sshTunnel);
  }

  createQueryRunner(connection: DBConnection): QueryRunner {
    return new MongoQueryRunner(connection as MongoDBConnection);
  }
}

// Concrete Factories - SQL
export class SQLFactory implements DBFactory {
  constructor(private config: any, private sshTunnel: any) {}

  createConnection(): DBConnection {
    return new SQLDBConnection(this.config, this.sshTunnel);
  }

  createQueryRunner(connection: DBConnection): QueryRunner {
    return new SQLQueryRunner(connection as SQLDBConnection);
  }
}


// Client Code usage
async function runDBExample(factory: DBFactory) {
  const connection = factory.createConnection();
  await connection.connect();

  const runner = factory.createQueryRunner(connection);
  const result = await runner.execute("SELECT * FROM users");
  console.log(result);

  await connection.disconnect();
}

// Example usage
const sshTunnel = { connect: async ()=>{}, disconnect: async ()=>{} }; // stub
const mongoFactory = new MongoFactory("mongodb://localhost:27017", sshTunnel);
await runDBExample(mongoFactory);

const sqlFactory = new SQLFactory({ host: "localhost", user: "test" }, sshTunnel);
await runDBExample(sqlFactory);



//  ## 33424324
// SSH Tunnel Instance
// 2️⃣ Example: SSH Tunnel class in TypeScript using tunnel-ssh
import tunnel from "tunnel-ssh";

export class SSHTunnel {
  private server: any;

  constructor(
    private sshConfig: {
      username: string;
      host: string;
      port: number;
      privateKey: Buffer;
    },
    private forwardConfig: {
      srcHost: string; // usually '127.0.0.1'
      srcPort: number; // local port
      dstHost: string; // remote DB host
      dstPort: number; // remote DB port
    }
  ) {}

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      const config = {
        ...this.sshConfig,
        localHost: this.forwardConfig.srcHost,
        localPort: this.forwardConfig.srcPort,
        dstHost: this.forwardConfig.dstHost,
        dstPort: this.forwardConfig.dstPort,
      };

      this.server = tunnel(config, (error: any, server: any) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }

  disconnect(): Promise<void> {
    return new Promise((resolve) => {
      if (this.server) {
        this.server.close(() => resolve());
      } else resolve();
    });
  }
}

// Use it with Mongo or SQL Factory
const sshTunnel = new SSHTunnel(
  {
    username: "sshUser",
    host: "ssh.server.com",
    port: 22,
    privateKey: require("fs").readFileSync("~/.ssh/id_rsa"),
  },
  {
    srcHost: "127.0.0.1",
    srcPort: 3308, // local port to bind
    dstHost: "remote.db.com",
    dstPort: 3306, // MySQL remote port
  }
);

await sshTunnel.connect();

const sqlFactory2 = new SQLFactory({ host: "127.0.0.1", user: "dbUser" }, sshTunnel);
await runDBExample(sqlFactory);

await sshTunnel.disconnect();

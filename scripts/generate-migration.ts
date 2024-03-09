// generateMigration.ts
import fs from 'fs';
import path from 'path';
import pino from 'pino';

const logger = pino();
const timestamp = Date.now();
const migrationName = process.argv[2] || `migration_${timestamp}`;

const migrationContent = `
import { MigrationFn } from 'umzug';
import { MongoClient } from 'mongodb';

const mongoUrl = process.env.MONGO_URL;

export const up: MigrationFn = async () => {
  //@ts-ignore
  const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    
    const db = client.db();
    
    // Implement your up migration logic here
    
  } finally {
    await client.close();
  }
};

export const down: MigrationFn = async () => {
  //@ts-ignore
  const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    
    const db = client.db();
    
    // Implement your down migration logic here
    
  } finally {
    await client.close();
  }
};
`;

const migrationsPath = path.join(__dirname, '../migrations');

if (!fs.existsSync(migrationsPath)) {
  fs.mkdirSync(migrationsPath);
}

const migrationFileName = `${timestamp}-${migrationName}.ts`;
const migrationFilePath = path.join(migrationsPath, migrationFileName);

fs.writeFileSync(migrationFilePath, migrationContent);

logger.info(`Migration created: ${migrationFileName}`);

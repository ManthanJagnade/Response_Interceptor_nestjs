import { Injectable } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';

@Injectable()
export class DatabaseService {
  private db: Db;

  async connect(): Promise<void> {
    const url = 'mongodb://127.0.0.1:27017/?readPreference=primary&ssl=false&directConnection=true'; 
    const client = new MongoClient(url);

    try {
      await client.connect();
      this.db = client.db('response_database'); 
      console.log('Connected to MongoDB');
    } catch (error) {
      console.log('Error connecting to MongoDB:', error);
      throw error;
    }
  }

  getDb(): Db {
    return this.db;
  }
}

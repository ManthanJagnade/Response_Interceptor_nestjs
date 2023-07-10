import { Injectable } from '@nestjs/common';
import { User } from './user.interface';
import { CreateUserDto } from './create-user.dto';
import { DatabaseService } from '../users/database.service';
import { Collection, WithId } from 'mongodb';

@Injectable()
export class UsersService {
  private usersCollection: Collection<User>;

  constructor(private readonly databaseService: DatabaseService) {}

  async getUsers(): Promise<User[]> {
    if (!this.usersCollection) {
      const db = this.databaseService.getDb();
      this.usersCollection = db.collection<User>('users');
    }

    const users: User[] = await this.usersCollection.find().toArray();
    return users;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    if (!this.usersCollection) {
      const db = this.databaseService.getDb();
      this.usersCollection = db.collection<User>('users');
    }

    const user: User = {
      id: Math.random().toString(),
      ...createUserDto,
    };

    await this.usersCollection.insertOne(user);
    return user;
  }
}

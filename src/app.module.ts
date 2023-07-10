import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { ResponseInterceptor } from './users/interceptors/response.interceptor';
import { DatabaseService } from './users/database.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ResponseInterceptor, DatabaseService],
})
export class AppModule {
  constructor(private readonly databaseService: DatabaseService) {}

  async onModuleInit(): Promise<void> {
    await this.databaseService.connect();
  }
}

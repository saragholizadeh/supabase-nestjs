import { Module } from '@nestjs/common';
import { BooksModule } from './books';
import { AuthorsModule } from './authors';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [BooksModule, AuthorsModule, AuthModule],
})
export class DomainModule {}

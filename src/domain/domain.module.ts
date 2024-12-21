import { Module } from '@nestjs/common';
import { BooksModule } from './books';
import { AuthorsModule } from './authors';

@Module({
  imports: [BooksModule, AuthorsModule],
})
export class DomainModule {}

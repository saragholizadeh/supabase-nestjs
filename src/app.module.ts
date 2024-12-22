import { Module } from '@nestjs/common';
import { DomainModule } from './domain/domain.module';
import { ServicesModule } from './common/services';

@Module({
  imports: [DomainModule, ServicesModule],
})
export class AppModule {}

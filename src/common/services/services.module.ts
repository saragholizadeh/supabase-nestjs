import { Module } from '@nestjs/common';
import { SupabaseModule } from './supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
})
export class ServicesModule {}

import { Module } from '@nestjs/common';
import { JournalistsService } from './journalists.service';
import { JournalistsController } from './journalists.controller';

@Module({
  providers: [JournalistsService],
  controllers: [JournalistsController]
})
export class Journalists {}

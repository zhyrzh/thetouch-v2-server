import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { Journalists } from './journalists/journalists.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ArticlesModule, Journalists, PrismaModule],
})
export class AppModule {}

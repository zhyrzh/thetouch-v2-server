import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { MembersModule } from './members/members.module';

@Module({
  imports: [ArticlesModule, MembersModule],
})
export class AppModule {}

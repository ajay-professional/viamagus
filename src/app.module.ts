import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { TasksModule } from './Tasks/tasks.module';
import { TeamModule } from './Team/team.module';

@Module({
  imports: [TeamModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
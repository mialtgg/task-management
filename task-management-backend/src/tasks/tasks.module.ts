import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entities';


@Module({
  imports: [TypeOrmModule.forFeature([Task])], 
  providers: [TasksService],
  controllers: [TasksController]
})
export class TasksModule {}

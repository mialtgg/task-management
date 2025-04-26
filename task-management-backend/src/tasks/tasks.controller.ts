import { Controller, Get, Post, Body,Patch,Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entities';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }
  @Patch(':id') // <<< BURASI YENİ
  update(@Param('id') id: number, @Body() updateData: { isDone: boolean }) {
    return this.tasksService.updateStatus(id, updateData.isDone);
  }
}

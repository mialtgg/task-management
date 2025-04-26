// src/tasks/tasks.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entities';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
      ) {}

  create(createTaskDto: CreateTaskDto) {
    const task = this.taskRepository.create({
      title: createTaskDto.title,
      description: createTaskDto.description,
    });
    return this.taskRepository.save(task);
  }

  findAll() {
    return this.taskRepository.find();
  }

  findOne(id: number) {
    return this.taskRepository.findOneBy({ id });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    await this.taskRepository.update(id, updateTaskDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.taskRepository.delete(id);
    return { deleted: true };
  }
  async updateStatus(id: number, isDone: boolean) {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new Error('Task not found');
    }
    task.isDone = isDone;
    return this.taskRepository.save(task);
  }
}

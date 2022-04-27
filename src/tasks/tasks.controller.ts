import { GetTaskFilterDTO } from './dto/get-task-filter-dto';
import { TasksService } from './tasks.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Task, TaskStatus } from './task.module';
import { CreateTaskDTO } from './dto/create-task-dto';
import { UpdateTaskStatusDTO } from './dto/update-task-status-dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {
    this.taskService = taskService;
  }

  @Get()
  getAllTasks(@Query() filterDTO: GetTaskFilterDTO): Task[] {
    if (Object.keys(filterDTO).length) {
      return this.taskService.getTasksWithFilter(filterDTO);
    } else {
      return this.taskService.getAllTasks();
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.taskService.getTaskById(id);
  }

  @Patch('/:id/:status')
  updateTaskById(
    @Param('id') id: string,
    @Body() updateTaskStatusDTO: UpdateTaskStatusDTO,
  ): Task {
    const { status } = updateTaskStatusDTO;
    return this.taskService.updateTaskById(id, status);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void {
    this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
    return this.taskService.createTask(createTaskDTO);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.module';
import { v4 as uuid } from 'uuid';
import { V4MAPPED } from 'dns';
import { CreateTaskDTO } from './dto/create-task-dto';
import { GetTaskFilterDTO } from './dto/get-task-filter-dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilter(filterDTO: GetTaskFilterDTO): Task[] {
    const { status, search } = filterDTO;
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status == status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }
    return tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);

    if (!found) throw new NotFoundException(`Task with ID "${id}" not found!`);
    return found;
  }

  updateTaskById(id: string, status: TaskStatus): Task {
    const task: Task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  deleteTaskById(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id === found.id);
  }

  createTask(createTaskDTO: CreateTaskDTO): Task {
    const { title, description } = createTaskDTO;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }
}

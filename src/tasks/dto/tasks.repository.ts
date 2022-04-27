import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  findByName(id: string, lastName: string) {
    return this.manager.find(id);
  }
}

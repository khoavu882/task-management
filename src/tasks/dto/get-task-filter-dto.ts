import { TaskStatus } from '../task.module';

export class GetTaskFilterDTO {
  status?: TaskStatus;
  search?: string;
}

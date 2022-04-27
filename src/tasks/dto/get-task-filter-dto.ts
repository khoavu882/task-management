import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task.module';

export class GetTaskFilterDTO {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}

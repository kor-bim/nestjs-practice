import { IsNotEmpty, IsString } from 'class-validator'

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  category: string

  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsString()
  content: string

  @IsNotEmpty()
  @IsString()
  writer: string

  @IsString()
  finished: string
}

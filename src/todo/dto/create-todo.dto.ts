import { IsNotEmpty, IsString, IsIn } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateTodoDto {
  @ApiProperty({
    description: '카테고리',
    example: '개인'
  })
  @IsNotEmpty()
  @IsString()
  category: string

  @ApiProperty({
    description: '제목',
    example: '회의 준비하기'
  })
  @IsNotEmpty()
  @IsString()
  title: string

  @ApiProperty({
    description: '내용',
    example: '중요한 회의를 위한 자료 준비하기'
  })
  @IsNotEmpty()
  @IsString()
  content: string

  @ApiProperty({
    description: '작성자',
    example: '홍길동'
  })
  @IsNotEmpty()
  @IsString()
  writer: string

  @ApiProperty({
    description: '완료여부 (Y: 완료, N: 미완료)',
    example: 'N',
    enum: ['Y', 'N']
  })
  @IsNotEmpty()
  @IsString()
  @IsIn(['Y', 'N'])
  finished: string
}

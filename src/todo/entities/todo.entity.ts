import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

@Entity('todo')
export class TodoEntity {
  @ApiProperty({
    description: '일정의 고유 식별자(UUID 형식)',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    required: true
  })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty({
    description: '일정의 카테고리 (예: 개인, 업무, 여가)',
    example: '개인',
    required: true,
    maxLength: 100
  })
  @Column()
  category: string

  @ApiProperty({
    description: '일정의 제목',
    example: '회의 준비하기',
    required: true,
    maxLength: 200
  })
  @Column()
  title: string

  @ApiProperty({
    description: '일정의 세부 내용',
    example: '중요한 회의를 위한 자료 준비하기',
    required: true
  })
  @Column({ type: 'text' })
  content: string

  @ApiProperty({
    description: '일정을 작성한 사람의 이름',
    example: '홍길동',
    required: true,
    maxLength: 50
  })
  @Column()
  writer: string

  @ApiProperty({
    description: '완료 여부 (Y: 완료, N: 미완료)',
    example: 'N',
    enum: ['Y', 'N'],
    default: 'N',
    required: true
  })
  @Column({
    type: 'enum',
    enum: ['Y', 'N'],
    default: 'N'
  })
  finished: string

  @ApiProperty({
    description: '일정이 생성된 날짜 및 시간',
    type: 'date',
    readOnly: true
  })
  @CreateDateColumn()
  createdAt: Date

  @ApiProperty({
    description: '일정이 마지막으로 수정된 날짜 및 시간',
    type: 'date',
    readOnly: true
  })
  @UpdateDateColumn()
  updatedAt: Date
}

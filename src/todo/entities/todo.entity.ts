import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('todo')
export class TodoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column()
  category: string

  @Column()
  title: string

  @Column({ type: 'text' })
  content: string

  @Column()
  writer: string

  @Column({
    type: 'enum',
    enum: ['Y', 'N'],
    default: 'N'
  })
  finished: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

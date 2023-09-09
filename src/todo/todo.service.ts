import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateTodoDto } from './dto/create-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { TodoEntity } from './entities/todo.entity'
import { Repository } from 'typeorm'

@Injectable()
export class TodoService {
  constructor(@InjectRepository(TodoEntity) private todoRepository: Repository<TodoEntity>) {}

  async create(createTodoDto: CreateTodoDto) {
    const todo = this.todoRepository.create(createTodoDto)
    return await this.todoRepository.save(todo)
  }

  async findAll() {
    return await this.todoRepository.find()
  }

  async findOne(id: string) {
    return await this.todoRepository.findOne({ where: { id } })
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    const todo = await this.todoRepository.findOne({ where: { id } })
    if (!todo) {
      throw new NotFoundException('Todo not found')
    }

    this.todoRepository.merge(todo, updateTodoDto)
    return await this.todoRepository.save(todo)
  }

  async remove(id: string) {
    const todo = await this.todoRepository.findOne({ where: { id } })
    if (!todo) {
      throw new NotFoundException('Todo not found')
    }

    return await this.todoRepository.remove(todo)
  }
}

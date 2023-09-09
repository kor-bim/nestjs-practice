import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { TodoService } from './todo.service'
import { CreateTodoDto } from './dto/create-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'
import { ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { TodoEntity } from './entities/todo.entity'

@Controller('todo')
@ApiTags('Todo API')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiOperation({
    summary: '새로운 Todo 항목 생성',
    description: '제공된 정보를 기반으로 새로운 Todo 항목을 데이터베이스에 추가합니다.'
  })
  @ApiCreatedResponse({ description: '성공적으로 생성된 Todo 항목을 반환합니다.', type: TodoEntity })
  @ApiBody({ description: 'Todo 항목 생성을 위한 데이터', type: CreateTodoDto })
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto)
  }

  @Get()
  @ApiOperation({ summary: '모든 Todo 항목을 조회', description: '데이터베이스에 있는 모든 Todo 항목을 조회합니다.' })
  @ApiOkResponse({ description: '모든 Todo 항목 리스트를 반환합니다.', type: [TodoEntity] })
  findAll() {
    return this.todoService.findAll()
  }

  @Get(':id')
  @ApiOperation({
    summary: '특정 Todo 항목을 ID로 조회',
    description: '제공된 ID에 해당하는 Todo 항목을 데이터베이스에서 찾습니다.'
  })
  @ApiOkResponse({ description: 'ID에 해당하는 Todo 항목을 반환합니다.', type: TodoEntity })
  @ApiNotFoundResponse({ description: '해당 ID를 가진 Todo 항목을 찾을 수 없을 때 반환됩니다.' })
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({
    summary: '특정 Todo 항목을 업데이트',
    description: '제공된 ID와 데이터를 사용하여 Todo 항목을 업데이트합니다.'
  })
  @ApiOkResponse({ description: '성공적으로 업데이트된 Todo 항목을 반환합니다.', type: TodoEntity })
  @ApiNotFoundResponse({ description: '해당 ID를 가진 Todo 항목을 찾을 수 없을 때 반환됩니다.' })
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(id, updateTodoDto)
  }

  @Delete(':id')
  @ApiOperation({
    summary: '특정 Todo 항목을 삭제',
    description: '제공된 ID를 사용하여 Todo 항목을 데이터베이스에서 삭제합니다.'
  })
  @ApiOkResponse({ description: '성공적으로 삭제된 Todo 항목을 반환합니다.', type: TodoEntity })
  @ApiNotFoundResponse({ description: '해당 ID를 가진 Todo 항목을 찾을 수 없을 때 반환됩니다.' })
  remove(@Param('id') id: string) {
    return this.todoService.remove(id)
  }
}

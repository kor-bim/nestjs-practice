import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { ServeStaticModule } from '@nestjs/serve-static'
import { TodoModule } from './todo/todo.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm'
import { join } from 'path'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client')
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) =>
        ({
          type: 'mariadb',
          host: config.get<string>('DATABASE_HOST'),
          port: config.get<number>('DATABASE_PORT'),
          username: config.get<string>('DATABASE_USERNAME'),
          password: config.get<string>('DATABASE_PASSWORD'),
          database: config.get<string>('DATABASE_SCHEME'),
          synchronize: config.get<string>('DATABASE_SYNCHRONIZE'),
          entities: [join(__dirname, '**', '*.entity.{ts,js}')],
          logging: true
        }) as TypeOrmModuleAsyncOptions,
      inject: [ConfigService]
    }),
    TodoModule
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule {}

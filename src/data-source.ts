import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

// Create a function to initialize the DataSource
export async function createDataSource() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const configService = app.get(ConfigService);

  return new DataSource({
    type: 'postgres',
    host: configService.get<string>('SUPABASE_DB_HOST'),
    port: configService.get<number>('SUPABASE_DB_PORT'),
    username: configService.get<string>('SUPABASE_DB_USERNAME'),
    password: configService.get<string>('SUPABASE_DB_PASSWORD'),
    database: configService.get<string>('SUPABASE_DB_NAME'),
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
  });
}

// Instantiate the DataSource
export const AppDataSource = createDataSource();

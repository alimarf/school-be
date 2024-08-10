import { NestFactory } from '@nestjs/core';
import { SchoolSeeder } from './school.seeder';
import { AppModule } from 'src/app.module';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const schoolSeeder = appContext.get(SchoolSeeder);
  await schoolSeeder.run();
  await appContext.close();
}

bootstrap();

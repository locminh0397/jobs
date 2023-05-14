import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DelayMiddleware } from './delay.middleware';
import { StudentModule } from './student/student.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AppController } from './app.controller';
import * as path from 'path';
import { PrismaService } from 'prisma/prisma.service';
import { JobsModule } from './jobs/jobs.module';
import { ApplyModule } from './apply/apply.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    AuthModule,
    StudentModule,
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          callback(null, `${randomName}${path.extname(file.originalname)}`);
        },
      }),
    }),
    JobsModule,
    ApplyModule,
    CompanyModule,
  ],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DelayMiddleware).forRoutes('*');
  }
}

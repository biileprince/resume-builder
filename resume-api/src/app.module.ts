import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './db/database.module';
import { ResumeModule } from './resume/resume.module';
import { PdfService } from './pdf/pdf.service';

@Module({
  imports: [DatabaseModule, ResumeModule],
  controllers: [AppController],
  providers: [AppService, PdfService],
})
export class AppModule {}

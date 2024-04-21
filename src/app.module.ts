import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { MegaversesModule } from './megaverses/megaverses.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MegaversesModule,
    HttpModule, // TODO: ERASE THIS ONCE WE VALIDATE NEW CODE IS WORKING
  ],
  controllers: [AppController], // TODO: ERASE THIS ONCE WE VALIDATE NEW CODE IS WORKING
  providers: [AppService], // TODO: ERASE THIS ONCE WE VALIDATE NEW CODE IS WORKING
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';


@Module({
  imports: [
    UsersModule,
   MongooseModule.forRoot('mongodb://mongo:27017/online-store'),
   ProductsModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

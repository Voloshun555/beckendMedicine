import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './config/mongooseConfigService';
import configuretion from './config/configuration';
import { MedicineModule } from './medicine/medicine.module';
import { ShopModule } from './shop/shop.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
    }),
    ConfigModule.forRoot({
      load: [configuretion],
    }),
    MedicineModule,
    ShopModule,
  ],
})
export class AppModule {}

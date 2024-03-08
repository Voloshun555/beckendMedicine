import { Controller, Get, Post, Body } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopDto } from './dto/shop.dto';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Get()
  findAll() {
    return this.shopService.findAll();
  }

  @Post()
  create(@Body() shopDto: ShopDto) {
    console.log(shopDto);
    return this.shopService.create(shopDto);
  }
}

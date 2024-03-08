import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { Product } from 'src/schemas/order.shema';
import { ShopDto } from './dto/shop.dto';

@Injectable()
export class ShopService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  findAll() {
    return this.productModel.find().exec();
  }

  async create(shopDto: ShopDto) {
    const newUser = new this.userModel(shopDto.user);
    const newProduct = new this.productModel(shopDto.product);
    await newUser.save();
    await newProduct.save();
    return {
      user: newUser,
      product: newProduct,
    };
  }
}

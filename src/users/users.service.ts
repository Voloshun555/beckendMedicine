import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UsersDocument } from 'src/schemas/users.schema';
import { Model } from 'mongoose';
import { SingUpDto } from 'src/auth/dto/singup.dto';
import { LoginUserDto } from 'src/auth/dto/login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UsersDocument>,
  ) {}

  async registration(createUserDto: SingUpDto): Promise<User | null> {
    const { name, email, password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    const createUser = new this.userModel(newUser);
    return createUser.save();
  }

  async findOne(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }

  async login(loginUserDto: LoginUserDto): Promise<User | null> {
    const { email, password } = loginUserDto;

    const user = await this.userModel.collection.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return user as User;
  }
}

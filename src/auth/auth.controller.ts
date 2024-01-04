import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SingUpDto } from './dto/singup.dto';
import { Response } from 'express';
import { RegistrationGuard } from './guard/registration.guard';
import { LoginUserDto } from './dto/login.dto';
import { LoginGuard } from './guard/login.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(RegistrationGuard)
  @Post('singup')
  async registrationUser(
    @Body() createUserDto: SingUpDto,
    @Res() res: Response,
  ) {
    await this.usersService.registration(createUserDto);

    res.statusCode = HttpStatus.CREATED;
    return res.send('user created');
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LoginGuard)
  @Post('login')
  async liginUser(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    const user = await this.usersService.login(loginUserDto);

    const accessToken = await this.authService.generateAccessToken(user);
    const refreshToken = await this.authService.generateRefreshToken(
      user._id as string,
    );

    res.statusCode = HttpStatus.OK;
    return res.send({ ...accessToken, ...refreshToken, user: user.name });
  }
}

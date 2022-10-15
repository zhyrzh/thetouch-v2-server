import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/login')
  login(@Body() body: AuthDto) {
    return this.authService.login(body);
  }

  @Post('/signup')
  signup(@Body() body: AuthDto) {
    return this.authService.signup(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/')
  authenticate() {
    return this.authService.authenticate();
  }
}

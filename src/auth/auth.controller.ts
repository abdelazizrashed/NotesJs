import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post("register")
    async register(@Body() registerDto: RegisterDto) {
        return await this.authService.register(registerDto.email, registerDto.password, registerDto.name);
    }

    @Post("login")
    async login(@Body() loginDto: LoginDto) {
        return await this.authService.login(loginDto.email, loginDto.password);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req: any) {
        return req.user;
    }


}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { ResponseModule } from 'src/response/response.module';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
    imports: [
        UsersModule,
        ResponseModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: '600000s'
            }
        })],
    controllers: [AuthController],
    providers: [AuthService, {
        provide: APP_GUARD,
        useClass: AuthGuard,
    },],
})
export class AuthModule { }

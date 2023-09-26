import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { ResponseModule } from 'src/response/response.module';
import { AuthGuard } from './auth.guard';

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
    providers: [AuthService, AuthGuard,],
    exports: [AuthGuard],
})
export class AuthModule { }

// {
//         provide: APP_GUARD,
//         useClass: AuthGuard,
//     }

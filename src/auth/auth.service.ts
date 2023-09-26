import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { ResponseService } from 'src/response/response.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userSerivce: UsersService, private responseService: ResponseService, private jwtService: JwtService) { }
    private saltRounds = 10;

    async login(email: string, pass: string): Promise<any> {
        const user = await this.userSerivce.user({ email: String(email) });
        if (user == null) {
            return this.responseService.notFound("User not found");
        }
        const passValid = await bcrypt.compare(pass, user.password)
        if (user && passValid) {
            const jwtPayload = { sub: user.id, email: user.email };
            console.log("[Notes.js] jwtPayload: ", jwtPayload);
            const token = await this.jwtService.signAsync(jwtPayload)
            return this.responseService.ok("Login successful", {
                token: token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                },
            });
        }
        return this.responseService.badRequest("Invalid password");
    }

    async register(
        email: string,
        password: string,
        name: string,
    ) {
        const user = await this.userSerivce.user({ email: String(email) });

        if (user != null) {
            return this.responseService.badRequest("User already exists");
        }


        const hashedPass = await bcrypt.hash(password, this.saltRounds);
        const res = await this.userSerivce.createUser({
            email,
            password: hashedPass,
            name,
        });
        const jwtPayload = { sub: res.id, email: res.email };
        const token = await this.jwtService.signAsync(jwtPayload);
        return this.responseService.created(
            "User created", {
            token: token,
            user: {
                id: res.id,
                email: res.email,
                name: res.name,
            },
        });
    }
}

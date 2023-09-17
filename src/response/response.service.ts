import { HttpCode, Injectable } from '@nestjs/common';

@Injectable()
export class ResponseService {
    @HttpCode(200)
    ok(message: string, data: any) {
        return {
            "sucess": true,
            "message": message,
            "data": data,
        }
    }

    @HttpCode(201)
    created(message: string, data: any) {
        return {
            "sucess": true,
            "message": message,
            "data": data,
        }
    }

    @HttpCode(204)
    noContent(message: string) {
        return {
            "sucess": true,
            "message": message,
        }
    }

    @HttpCode(400)
    badRequest(message: string) {
        return {
            "sucess": false,
            "message": message,
        }
    }

    @HttpCode(403)
    forbidden(message: string) {
        return {
            "sucess": false,
            "message": message,
        }
    }

    @HttpCode(404)
    notFound(message: string) {
        return {
            "sucess": false,
            "message": message,
        }
    }


}

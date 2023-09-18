import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ResponseModule } from './response/response.module';
import { NotesModule } from './notes/notes.module';
import { NoteModule } from './note/note.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        AuthModule,
        UsersModule,
        PrismaModule,
        ResponseModule,
        NotesModule,
        NoteModule,
        ConfigModule.forRoot(),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }

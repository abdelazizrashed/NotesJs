import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    exports: [NoteService],
    providers: [NoteService]
})
export class NoteModule { }

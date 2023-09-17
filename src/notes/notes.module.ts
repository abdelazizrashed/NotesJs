import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NoteModule } from 'src/note/note.module';
import { ResponseModule } from 'src/response/response.module';

@Module({
    imports: [NoteModule, ResponseModule],
    controllers: [NotesController],
})
export class NotesModule { }

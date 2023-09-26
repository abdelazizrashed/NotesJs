import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { NoteService } from 'src/note/note.service';
import { ResponseService } from 'src/response/response.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiBearerAuth()
@ApiTags('notes')
@Controller('notes')
export class NotesController {
    constructor(private noteService: NoteService, private responseService: ResponseService) { }


    @UseGuards(AuthGuard)
    @Get("all-notes")
    async getAllNotes(@Req() req: any) {
        const userId = req.user.sub;
        const res = await this.noteService.notes({ where: { userId: Number(userId) } });
        return this.responseService.ok("Success", res);
    }

    @UseGuards(AuthGuard)
    @Delete(":id")
    async deleteNote(@Param("id") id: number) {
        const note = await this.noteService.note({ id: Number(id) });
        if (note == null) {
            return this.responseService.notFound("Note not found");
        }

        await this.noteService.deleteNote({ id: Number(id) });
        return this.responseService.noContent("Note deleted successfully");
    }

    @UseGuards(AuthGuard)
    @Post("create")
    async createNote(@Req() req: any, @Body() createNoteDto: CreateNoteDto) {
        const userId = req.user.sub;
        const note = this.noteService.createNote({
            content: createNoteDto.content,
            userId,
        });
        return this.responseService.ok("Note Created successfully", note);

    }
}

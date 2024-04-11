import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { notesService } from "../services/NotesService.js";
import { dbContext } from "../db/DbContext.js";
import { bugsService } from "../services/BugsService.js";

export class NotesController extends BaseController {
    constructor() {
        super('api/notes')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.postNote)
            .delete('/:noteId', this.deleteNote)
    }

    async postNote(request, response, next) {
        try {
            const noteData = request.body
            noteData.creatorId = request.userInfo.id
            const note = await notesService.postNote(noteData)
            response.send(note)
        } catch (error) {
            next(error)
        }
    }

    async deleteNote(request, response, next) {
        try {
            const res = await notesService.deleteNote(request.params.noteId, request.userInfo.id)
            response.send(res)
        } catch (error) {
            next(error)
        }
    }
}
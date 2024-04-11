import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"
import { bugsService } from "./BugsService.js"

class NotesService {
    async postNote(noteData) {
        const note = await dbContext.Notes.create(noteData)
        await note.populate('creator')
        return note
    }

    async deleteNote(noteId, userId) {
        const note = await dbContext.Notes.findById(noteId)
        if (!note) throw new Error(`Note with ID '${noteId}' doesn't exist.`)

        if (note.creatorId != userId) throw new Forbidden('You cannot delete a note that you did not create.')

        await note.deleteOne()

        return `Note has been deleted.`
    }

    async getNotesFromBugId(bugId) {
        const bug = await bugsService.getBugById(bugId)
        if (!bug) throw new Error(`Bug with ID '${bugId}' does not exist.`)

        const notes = await dbContext.Notes.find({ bugId: bugId })
        return notes
    }
}

export const notesService = new NotesService()
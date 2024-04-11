import { Auth0Provider } from "@bcwdev/auth0provider";
import { bugsService } from "../services/BugsService.js";
import BaseController from "../utils/BaseController.js";
import { notesService } from "../services/NotesService.js";
import { trackedBugsService } from "../services/TrackedBugsService.js";


export class BugsController extends BaseController {
    constructor() {
        super('/api/bugs')
        this.router
            .get('', this.getBugs)
            .get('/:bugId', this.getBugById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createBugs)
            .put('/:bugId', this.updateBug)
            .delete('/:bugId', this.deleteBug)
            .get('/:bugId/notes', this.getNotesFromBugId)
            .get('/:bugId/trackedbugs', this.getTrackedBugsFromBugId)
    }

    async getBugs(request, response, next) {
        try {
            const bugs = await bugsService.getBugs()
            response.send(bugs)
        } catch (error) {
            next(error)
        }
    }

    async getBugById(request, response, next) {
        try {
            const bugId = request.params.bugId
            const bug = await bugsService.getBugById(bugId)
            response.send(bug)
        } catch (error) {
            next(error)
        }
    }

    async createBugs(request, response, next) {
        try {
            const bugData = request.body
            const userData = request.userInfo
            bugData.creatorId = userData.id
            const bug = await bugsService.createBugs(bugData)
            response.send(bug)
        } catch (error) {
            next(error)
        }
    }

    async updateBug(request, response, next) {
        try {
            const bugId = request.params.bugId
            const updateBug = request.body
            const userData = request.userInfo
            updateBug.creatorId = userData.id
            const bug = await bugsService.updateBug(bugId, updateBug)
            response.send(bug)
        } catch (error) {
            next(error)
        }
    }

    async deleteBug(request, response, next) {
        try {
            const bugId = request.params.bugId
            const userData = request.userInfo
            const bug = await bugsService.deleteBug(bugId, userData.id)
            response.send(bug)
        } catch (error) {
            next(error)
        }
    }

    async getNotesFromBugId(request, response, next) {
        try {
            const notes = await notesService.getNotesFromBugId(request.params.bugId)
            response.send(notes)
        } catch (error) {
            next(error)
        }
    }

    async getTrackedBugsFromBugId(request, response, next) {
        try {
            const notes = await trackedBugsService.getTrackedBugsFromBugId(request.params.bugId)
            response.send(notes)
        } catch (error) {
            next(error)
        }
    }

}
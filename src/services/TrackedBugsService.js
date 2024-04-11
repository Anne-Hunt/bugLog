import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"
import { bugsService } from "./BugsService.js"

class TrackedBugsService {
    async getMyTrackedBugs(userId) {
        const trackedBugs = await dbContext.TrackedBugs.find({ accountId: userId }).populate('tracker').populate('bug')
        return trackedBugs
    }

    async postTrackedBug(bugData) {
        const trackedBug = await dbContext.TrackedBugs.create(bugData)
        await trackedBug.populate('tracker')
        await trackedBug.populate('bug')
        return trackedBug
    }

    async getTrackedBugsFromBugId(bugId) {
        const bug = await bugsService.getBugById(bugId)
        if (!bug) throw new Error(`Bug with ID '${bugId}' does not exist.`)

        const trackedBugs = await dbContext.TrackedBugs.find({ bugId: bugId }).populate('tracker').populate('bug')
        return trackedBugs
    }

    async deleteTrackedBug(bugId, userId) {
        const bug = await dbContext.TrackedBugs.findById(bugId)
        if (!bug) throw new Error(`TrackedBug with ID '${bugId}' does not exist.`)

        if (bug.accountId != userId) throw new Forbidden('You cannot delete a tracked bug that you did not create.')

        await bug.deleteOne()

        return `Bug has been deleted.`
    }
}

export const trackedBugsService = new TrackedBugsService()
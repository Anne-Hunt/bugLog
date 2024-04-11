import { dbContext } from "../db/DbContext.js"

class TrackedBugsService {
    async postTrackedBug(bugData) {
        const trackedBug = await dbContext.TrackedBugs.create(bugData)
        await trackedBug.populate('tracker')
        await trackedBug.populate('bug')
        return trackedBug
    }
}

export const trackedBugsService = new TrackedBugsService()
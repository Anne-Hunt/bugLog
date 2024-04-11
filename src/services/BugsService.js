import D from "esm-wallaby"
import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"


class BugsService {

    async getBugs() {
        const bugs = await dbContext.Bugs.find()
        return bugs
    }

<<<<<<< HEAD
    async getBugById(bugId) {
        const bug = await dbContext.Bugs.findById(bugId)
        if (!bug) throw new Error(`We do not have a bug at id ${bugId}`)
=======
    async createBugs(bugData) {
        const bug = await dbContext.Bugs.create(bugData)
        await bug.populate('creator')
>>>>>>> upstream/main
        return bug
    }

    async createBugs(bugData) {
        const bug = await dbContext.Bugs.create(bugData)
        await bug.populate('creator')
        return bug
    }

    async updateBug(bugId, bugData) {
        const bugToUpdate = await dbContext.Bugs.findById(bugId)
        if (bugToUpdate.creatorId != bugData.creatorId) throw new Forbidden(`no bug at id ${bugId}`)
        bugToUpdate.title = bugData.title ?? bugToUpdate.title
        bugToUpdate.description = bugData.description ?? bugToUpdate.description
        bugToUpdate.priority = bugData.priority ?? bugToUpdate.priority
        bugToUpdate.closed = bugData.closed ?? bugToUpdate.closed
        bugToUpdate.closedDate = bugData.closed ?? bugToUpdate.closedDate
        await bugToUpdate.save()
        return bugToUpdate
    }

    async deleteBug(bugId) {

    }

}

export const bugsService = new BugsService()
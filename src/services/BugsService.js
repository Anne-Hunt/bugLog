import { dbContext } from "../db/DbContext.js"


class BugsService {

    async getBugs() {
        const bugs = await dbContext.Bugs.find()
        return bugs
    }

    async createBugs(bugData) {
        const bug = await dbContext.Bugs.create(bugData)
        return bug
    }


}

export const bugsService = new BugsService()
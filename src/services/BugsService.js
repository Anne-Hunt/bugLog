import { dbContext } from "../db/DbContext.js"


class BugsService {
    async getBugs() {
        const bugs = await dbContext.Bugs.find()
        return bugs
    }


}

export const bugsService = new BugsService()
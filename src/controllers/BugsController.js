import { Auth0Provider } from "@bcwdev/auth0provider";
import { bugsService } from "../services/BugsService.js";
import BaseController from "../utils/BaseController.js";


export class BugsController extends BaseController {
    constructor() {
        super('/api/bugs')
        this.router
            .get('', this.getBugs)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createBugs)
    }

    async getBugs(request, response, next) {
        try {
            const bugs = await bugsService.getBugs()
            response.send(bugs)
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
}
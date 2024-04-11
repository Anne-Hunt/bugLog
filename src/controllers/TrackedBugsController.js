import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { trackedBugsService } from "../services/TrackedBugsService.js";

export class TrackedBugsController extends BaseController {
    constructor() {
        super('api/trackedbugs')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.postTrackedBug)
    }

    async postTrackedBug(request, response, next) {
        try {
            const bugData = request.body
            bugData.accountId = request.userInfo.id
            const trackedBug = await trackedBugsService.postTrackedBug(bugData)
            response.send(trackedBug)
        } catch (error) {
            next(error)
        }
    }
}
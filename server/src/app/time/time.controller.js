import {
    HttpError,
    errorTypes,
    internalMessages,
    controllerCatch,
} from "../../common/errors";
import { timeRoute } from "../../common/routes";
import { getServerTime } from "./";
import { requiresAccessToken } from '../../common/middleware';

export const TimeController = (app) => {
    if (!app) {
        throw new HttpError(
            null,
            internalMessages.appNotDefined,
            errorTypes.INVALID_DEPENDENCIES
        );
    }

    registerRoutes(app);
};

const registerRoutes = (app) => {
    app.get(timeRoute, requiresAccessToken, serverTime());
}

export const serverTime = () => async (request, response) => {
    try {
        const time = await getServerTime(request);

        response.send(time);
    } catch (e) {
        controllerCatch(e, request, response);
    }
};

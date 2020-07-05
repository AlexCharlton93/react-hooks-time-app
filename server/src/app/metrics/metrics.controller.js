import {
    HttpError,
    errorTypes,
    internalMessages,
    controllerCatch,
} from "../../common/errors";
import { metricsRoute } from "../../common/routes";
import { getMetrics } from "./";
import { requiresAccessToken } from '../../common/middleware';

export const MetricsController = (app) => {
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
    app.get(metricsRoute, requiresAccessToken, metrics());
}

export const metrics = () => async (request, response) => {
    try {
        const metrics = await getMetrics(request);

        response.send(metrics);
    } catch (e) {
        controllerCatch(e, request, response);
    }
};

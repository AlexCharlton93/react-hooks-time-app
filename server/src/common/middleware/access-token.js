import { statusCodes } from "../constants";
import { config } from "../config";

export function requiresAccessToken(req, res, next) {
	const header = req.headers["authorization"];

	if (typeof header !== "undefined") {
        if (header !== config.accessToken) {
            res.sendStatus(statusCodes.FORBIDDEN);
        }

		next();
	} else {
		res.sendStatus(statusCodes.FORBIDDEN);
	}
}

import { errorTypes } from "./errors.constants";
import { HttpError } from "./http.errors";
import { statusCodes } from "../constants";

export function controllerCatch(err, request, response) {
	let responseCode;

	if (err instanceof HttpError) {
		switch (err.errorType) {
		case errorTypes.ACCESS_FORBIDDEN:
			responseCode = statusCodes.FORBIDDEN;
			break;
		default:
			responseCode = statusCodes.INTERNAL_SERVER_ERROR;
		}
	} else {
		responseCode = statusCodes.INTERNAL_SERVER_ERROR;
	}

	response.status(responseCode);
}

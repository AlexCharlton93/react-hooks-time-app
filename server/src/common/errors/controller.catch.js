import { errorTypes } from './errors.constants';
import { HttpError } from './http.errors';
import { statusCodes } from '../constants';

export function controllerCatch(err, request, response) {
	let errorMessage;
	let responseCode;

	if (err instanceof HttpError) {
		switch (err.errorType) {
		case errorTypes.ACCESS_FORBIDDEN:
			responseCode = statusCodes.FORBIDDEN;
			break;
		default:
			responseCode = statusCodes.INTERNAL_SERVER_ERROR;
		}
		errorMessage = err.userMessage;
	} else {
		errorMessage = err.message;
		responseCode = statusCodes.INTERNAL_SERVER_ERROR;
	}

	response.status(responseCode);
	response.json({ errorMessage });
}

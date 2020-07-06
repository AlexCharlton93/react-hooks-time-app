import { errorTypes, logLevels } from "./errors.constants";

export class HttpError extends Error {
	constructor(userMessage = "", internalMessage = "", errorType = errorTypes.ERROR, logLevel = logLevels.ERROR) {
		super(internalMessage);
		this.userMessage = userMessage;
		this.internalMessage = internalMessage;
		this.errorType = errorType;
		this.logLevel = logLevel;
	}
}

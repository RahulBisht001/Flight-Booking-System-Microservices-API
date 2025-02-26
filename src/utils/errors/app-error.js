class AppError extends Error {
	constructor(message, statusCode) {
		super(message.join(", ")); // Join array for Error's built-in message property
		this.statusCode = statusCode;
		this.explanation = message; // this.explanation is an array of strings
	}
}

module.exports = AppError;

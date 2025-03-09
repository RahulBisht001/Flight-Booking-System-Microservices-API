const {StatusCodes} = require("http-status-codes");

const {ErrorResponse} = require("../utils/common");
const AppError = require("../utils/errors/app-error");

const validateCreateRequest = (req, res, next) => {
    if (!req.body.name) {
        ErrorResponse.message = "Something went wrong while creating city";
        ErrorResponse.error = new AppError(
            ["City name is missing from the request body. Please provide a valid city name."],
            StatusCodes.BAD_REQUEST
        );

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
};

module.exports = {
    validateCreateRequest,
};

const {StatusCodes} = require("http-status-codes");

const {ErrorResponse} = require("../utils/common");
const AppError = require("../utils/errors/app-error");

const validateCreateRequest = (req, res, next) => {
    if (!req.body.name) {
        ErrorResponse.message = "Something went wrong while creating airport";
        ErrorResponse.error = new AppError(
            ["Airport name either missing from the request body or not in the correct format."],
            StatusCodes.BAD_REQUEST
        );

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    if (!req.body.code) {
        ErrorResponse.message = "Something went wrong while creating airport";
        ErrorResponse.error = new AppError(
            ["Airport code either missing from the request body or not in the correct format."],
            StatusCodes.BAD_REQUEST
        );

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    if (!req.body.cityId) {
        ErrorResponse.message = "Something went wrong while creating airport";
        ErrorResponse.error = new AppError(
            ["Airport cityId either missing from the request body or not in the correct format."],
            StatusCodes.BAD_REQUEST
        );

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    next();
};

module.exports = {
    validateCreateRequest,
};

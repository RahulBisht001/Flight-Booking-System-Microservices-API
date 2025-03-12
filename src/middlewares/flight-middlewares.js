const {StatusCodes} = require("http-status-codes");

const {ErrorResponse} = require("../utils/common");
const AppError = require("../utils/errors/app-error");
const {DateTimeHelper} = require("../utils/helpers");

const REQUIRED_FIELDS = [
    "flightNumber",
    "airplaneId",
    "departureAirportCode",
    "arrivalAirportCode",
    "arrivalTime",
    "departureTime",
    "price",
    "totalSeats",
];

const validateCreateRequest = (req, res, next) => {
    for (const field of REQUIRED_FIELDS) {
        if (!req.body[field]) {
            ErrorResponse.message = `${field} cannot be null`;
            ErrorResponse.error = new AppError([`${field} not found`], StatusCodes.BAD_REQUEST);

            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
    }

    // Check for a valid date and time of departure and arrival of the flight.
    // ✅ Convert to Date objects before comparison

    if (DateTimeHelper.isInvalidDateTime(req.body.departureTime, req.body.arrivalTime)) {
        ErrorResponse.message = "Invalid date format for departureTime or arrivalTime";
        ErrorResponse.error = new AppError(["Use ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)"], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    if (DateTimeHelper.isLaterOrEqual(req.body.departureTime, req.body.arrivalTime)) {
        ErrorResponse.message = "departureTime cannot be greater than, equal to arrivalTime";
        ErrorResponse.error = new AppError(["Fix the departureTime & arrivalTime"], StatusCodes.BAD_REQUEST);

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    next();
};

module.exports = {
    validateCreateRequest,
};

const {StatusCodes} = require("http-status-codes");

const {FlightService} = require("../services");
const {ErrorResponse, SuccessResponse} = require("../utils/common");

/**
 * Creates a new flight record in the database.
 * @route POST /api/v1/flights
 *
 * @param {import('express').Request} req - Express request object
 * @param {Object} req.body - Details of the flight
 */
const createFlight = async (req, res) => {
    try {
        const flight = await FlightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportCode: req.body.departureAirportCode,
            arrivalAirportCode: req.body.arrivalAirportCode,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price,
            boardingGate: req.body.boardingGate,
            totalSeats: req.body.totalSeats,
        });

        SuccessResponse.message = "Successfully created a flight";
        SuccessResponse.data = flight;

        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
};

module.exports = {
    createFlight,
};

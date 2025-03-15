const {StatusCodes} = require("http-status-codes");
const {Op} = require("sequelize");

const {FlightRepository} = require("../repositories");
const AppError = require("../utils/errors/app-error");

const flightRepository = new FlightRepository();

const createFlight = async (data) => {
    try {
        const flight = await flightRepository.create(data);
        return flight;
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });

            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }

        throw new AppError(["Cannot create a new Flight biddu"], StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

const getAllFlights = async (query) => {
    // trip --> DEL-LON
    let customFilter = {};
    let sortFilter = [];
    const endingTripTime = " 23:59:59";

    if (query.trip) {
        [departureAirportCode, arrivalAirportCode] = query.trip.split("-");

        customFilter.departureAirportCode = departureAirportCode;
        customFilter.arrivalAirportCode = arrivalAirportCode;

        // ⚠️Error : Throw an error, if at any point of time the departure & arrival airports are same.

        if (departureAirportCode === arrivalAirportCode) {
            throw new AppError(["Cannot fetch flights for same departure & arrival airports"], StatusCodes.BAD_REQUEST);
        }
    }

    if (query.price) {
        [minPrice, maxPrice] = query.price.split("-").map(Number); // Convert to number
        customFilter.price = {
            [Op.between]: [minPrice, isNaN(maxPrice) ? 500000 : maxPrice],
        };
    }

    if (query.travelers) {
        customFilter.totalSeats = {
            [Op.gte]: query.travelers,
        };
    }

    if (query.tripDate) {
        customFilter.departureTime = {
            [Op.between]: [query.tripDate, query.tripDate + endingTripTime],
        };
    }

    // sorting filter for the flights
    if (query.sort) {
        const params = query.sort.split(","); // i will get an array of sorting filters
        const sortingParams = params.map((param) => param.split("_"));

        sortFilter = sortingParams;
    }

    try {
        // console.log(customFilter, sortFilter);
        const flights = await flightRepository.getAllFlights(customFilter, sortFilter);
        return flights;
    } catch (error) {
        throw new AppError(["Cannot fetch the data of all the flights"], StatusCodes.INTERNAL_SERVER_ERROR);
    }
};

module.exports = {
    createFlight,
    getAllFlights,
};

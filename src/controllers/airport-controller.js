const {StatusCodes} = require("http-status-codes");

const {AirportService} = require("../services");
const {ErrorResponse, SuccessResponse} = require("../utils/common");

/**
 * Creates a new airport record in the database.
 * @route POST /api/v1/airports
 */

const createAirport = async (req, res) => {
    try {
        const airport = await AirportService.createAirport({
            name: req.body.name,
            code: req.body.code,
            address: req.body.address,
            cityId: req.body.cityId,
        });

        SuccessResponse.message = "Successfully created an airport";
        SuccessResponse.data = airport;

        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
};

/**
 *
 * @param {*} req
 * @param {*} res
 *
 * @route GET /api/v1/airports
 * @returns all the airports in the database
 */
const getAirports = async (req, res) => {
    try {
        const airports = await AirportService.getAirports();
        SuccessResponse.message = "Successfully fetched the data of all airports";
        SuccessResponse.data = airports;

        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
};

/**
 * Retrieves the details of an airport by its ID.
 *
 * @route GET /api/v1/airports/id
 *
 * @param {Object} req - The request object containing parameters.
 * @param {Object} req.params - The request parameters.
 * @param {string} req.params.id - The ID of the airport to fetch.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} The response containing the airport data or an error message.
 */
const getAirport = async (req, res) => {
    try {
        const airport = await AirportService.getAirport(req.params.id);
        SuccessResponse.message = "Successfully fetched the data of the airport";
        SuccessResponse.data = airport;

        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
};

/**
 *
 *Delete the details of an airport by its ID.
 * @route DEL /api/v1/airports/id
 *
 * @param {Object} req - The request object.
 * @param {Object} req.params - The request parameters.
 * @param {string} req.params.id - The ID of the airport to delete.
 * @param {Object} res - The response object.
 * @returns {Promise<Response>} A JSON response indicating success or failure.
 */

const destroyAirport = async (req, res) => {
    try {
        const response = await AirportService.destroyAirport(req.params.id);
        SuccessResponse.message = "Successfully deleted the airport";
        SuccessResponse.data = response;

        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
};

const updateAirport = async (req, res) => {
    try {
        const updatedDetails = await AirportService.updateAirport(req.params.id, req.body);
        SuccessResponse.message = "Successfully updated the details the airport";
        SuccessResponse.data = updatedDetails;

        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
};

module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport,
};

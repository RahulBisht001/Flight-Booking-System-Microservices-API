const { StatusCodes } = require("http-status-codes");

const { AirplaneService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

/**
 * Creates a new airplane record in the database.
 * @route POST /api/v1/airplanes
 *
 * @param {Object} req - Express request object
 * @param {string} req.body.modelNumber - The model number of the airplane
 * @param {number} req.body.capacity - Seating capacity of the airplane
 */
const createAirplane = async (req, res) => {
	try {
		const airplane = await AirplaneService.createAirplane({
			modelNumber: req.body.modelNumber,
			capacity: req.body.capacity,
		});

		SuccessResponse.message = "Successfully created an airplane";
		SuccessResponse.data = airplane;

		return res.status(StatusCodes.CREATED).json(SuccessResponse);
	} catch (error) {
		// ErrorResponse.message = "Something went wrong while creating the airplane";

		// error here is an instance of AppError
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns all the airplanes in the database
 */
const getAirplanes = async (req, res) => {
	try {
		const airplanes = await AirplaneService.getAirplanes();
		SuccessResponse.message = "Successfully fetched the data of all airplanes";
		SuccessResponse.data = airplanes;

		return res.status(StatusCodes.OK).json(SuccessResponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
};

/**
 * Retrieves the details of an airplane by its ID.
 *
 * @param {Object} req - The request object containing parameters.
 * @param {Object} req.params - The request parameters.
 * @param {string} req.params.id - The ID of the airplane to fetch.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} The response containing the airplane data or an error message.
 */
const getAirplane = async (req, res) => {
	try {
		const airplane = await AirplaneService.getAirplane(req.params.id);
		SuccessResponse.message = "Successfully fetched the data of the airplane";
		SuccessResponse.data = airplane;

		return res.status(StatusCodes.OK).json(SuccessResponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
};

const destroyAirplane = async (req, res) => {
	try {
		const response = await AirplaneService.destroyAirplane(req.params.id);
		SuccessResponse.message = "Successfully deleted the airplane";
		SuccessResponse.data = response;

		return res.status(StatusCodes.OK).json(SuccessResponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
};

module.exports = {
	createAirplane,
	getAirplanes,
	getAirplane,
	destroyAirplane,
};

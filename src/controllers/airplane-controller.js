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

module.exports = {
	createAirplane,
	getAirplanes,
};

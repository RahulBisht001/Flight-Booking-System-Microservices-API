const { StatusCodes } = require("http-status-codes");

const { CityService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

/**
 * Creates a new city record in the database.
 * @route POST /api/v1/cities
 *
 * @param {Object} req - Express request object
 * @param {string} req.body.name - Name of the city
 */
const createCity = async (req, res) => {
	try {
		const city = await CityService.createCity({
			name: req.body.name,
		});

		SuccessResponse.message = "Successfully created a city";
		SuccessResponse.data = city;

		return res.status(StatusCodes.CREATED).json(SuccessResponse);
	} catch (error) {
		ErrorResponse.error = error;
		return res.status(error.statusCode).json(ErrorResponse);
	}
};

module.exports = {
	createCity,
};

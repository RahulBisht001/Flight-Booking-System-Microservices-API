const { StatusCodes } = require("http-status-codes");

const { AirportRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const airportRepository = new AirportRepository();

const createAirport = async (data) => {
	try {
		const airport = await airportRepository.create(data);
		return airport;
	} catch (error) {
		if (error.name === "SequelizeValidationError") {
			let explanation = [];
			error.errors.forEach((err) => {
				explanation.push(err.message);
			});

			throw new AppError(explanation, StatusCodes.BAD_REQUEST);
		}

		throw new AppError(
			["Cannot create a new `Airport` object."],
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
};

const getAirports = async () => {
	try {
		const airports = await airportRepository.getAll();
		return airports;
	} catch (error) {
		throw new AppError(
			["Cannot fetch the data of all airports"],
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
};

const getAirport = async (id) => {
	try {
		const airport = await airportRepository.get(id);
		return airport;
	} catch (error) {
		if (error.statusCode == StatusCodes.NOT_FOUND) {
			throw new AppError(["Airport not found"], StatusCodes.NOT_FOUND);
		}
		throw new AppError(
			["Cannot fetch the data of the airport with given id"],
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
};

const destroyAirport = async (id) => {
	try {
		const response = await airportRepository.destroy(id);
		return response;
	} catch (error) {
		if (error.statusCode == StatusCodes.NOT_FOUND) {
			throw new AppError(
				["The airport you requested to delete is not present"],
				StatusCodes.NOT_FOUND
			);
		}
		throw new AppError(
			["Cannot fetch the data of the airport"],
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
};

const updateAirport = async (id, data) => {
	try {
		const response = await airportRepository.update(id, data);
		return response;
	} catch (error) {
		if (error.statusCode == StatusCodes.NOT_FOUND) {
			throw new AppError(
				["The airport you requested to update is not present"],
				StatusCodes.NOT_FOUND
			);
		}
		throw new AppError(
			["Cannot update the data of airport"],
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
};

module.exports = {
	createAirport,
	getAirports,
	getAirport,
	destroyAirport,
	updateAirport,
};

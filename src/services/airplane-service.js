const { StatusCodes } = require("http-status-codes");

const { AirplaneRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const airplaneRepository = new AirplaneRepository();

const createAirplane = async (data) => {
	try {
		const airplane = await airplaneRepository.create(data);
		return airplane;
	} catch (error) {
		if (error.name === "SequelizeValidationError") {
			let explanation = [];
			error.errors.forEach((err) => {
				explanation.push(err.message);
			});

			throw new AppError(explanation, StatusCodes.BAD_REQUEST);
		}

		throw new AppError(
			["Cannot create a new airplane biddu"],
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
};

const getAirplanes = async () => {
	try {
		const airplanes = await airplaneRepository.getAll();
		return airplanes;
	} catch (error) {
		throw new AppError(
			["Cannot fetch the data of all airplanes"],
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
};

const getAirplane = async (id) => {
	try {
		const airplane = await airplaneRepository.get(id);
		return airplane;
	} catch (error) {
		if (error.statusCode == StatusCodes.NOT_FOUND) {
			throw new AppError(["Airplane not found"], StatusCodes.NOT_FOUND);
		}
		throw new AppError(
			["Cannot fetch the data of all airplanes"],
			StatusCodes.INTERNAL_SERVER_ERROR
		);
	}
};

module.exports = {
	createAirplane,
	getAirplanes,
	getAirplane,
};

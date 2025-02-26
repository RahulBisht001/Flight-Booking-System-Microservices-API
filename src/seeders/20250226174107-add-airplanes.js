"use strict";

const { Op } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		await queryInterface.bulkInsert("Airplanes", [
			{
				modelNumber: "Airbus A380",
				capacity: 525,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				modelNumber: "Boeing 747-8",
				capacity: 410,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				modelNumber: "Embraer E195-E2",
				capacity: 120,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				modelNumber: "Boeing 787 Dreamliner",
				capacity: 242,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				modelNumber: "Airbus A320",
				capacity: 180,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete("Airplanes", {
			[Op.or]: [{ modelNumber: "Airbus A380" }, { id: { [Op.gte]: 9 } }],
		});
	},
};

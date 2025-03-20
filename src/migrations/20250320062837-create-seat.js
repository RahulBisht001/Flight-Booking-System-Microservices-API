"use strict";

const {Enums} = require("../utils/common");
const {BUSINESS, ECONOMY, PREMIUM_ECONOMY, FIRST_CLASS} = Enums.SEAT_TYPE;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Seats", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            row: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            col: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            airplaneId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Airplanes",
                    id: "id",
                },
                onDelete: "CASCADE",
            },
            type: {
                type: Sequelize.ENUM,
                values: [BUSINESS, PREMIUM_ECONOMY, FIRST_CLASS, ECONOMY],
                defaultValue: ECONOMY,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Seats");
    },
};

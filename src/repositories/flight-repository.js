const CrudRepository = require("./crud-repository");
const {Flight} = require("../models");

class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }

    // filter is an object
    getAllFlights = async (filter, sortFilter) => {
        const response = await Flight.findAll({
            where: filter,
            order: sortFilter,
        });
        return response;
    };
}

module.exports = FlightRepository;

const isLaterOrEqual = (timeString1, timeString2) => {
    return new Date(timeString1).getTime() >= new Date(timeString2).getTime();
};

const isInvalidDateTime = (timeString1, timeString2) => {
    return isNaN(new Date(timeString1)) || isNaN(new Date(timeString2));
};

module.exports = {
    isLaterOrEqual, // Renamed for clarity
    isInvalidDateTime, // Renamed for better meaning
};

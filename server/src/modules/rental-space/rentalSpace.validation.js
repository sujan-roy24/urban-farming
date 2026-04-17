const validateRentalSpaceInput = (data) => {
    const { location, size, price } = data;

    if (!location || !size || price === undefined) {
        return "Location, size and price are required";
    }

    if (Number(price) <= 0) {
        return "Price must be greater than 0";
    }

    return null;
};

module.exports = {
    validateRentalSpaceInput,
};
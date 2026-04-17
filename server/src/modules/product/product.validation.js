const validateProductInput = (data) => {
    const { name, description, price, category, availableQuantity } = data;

    if (!name || !description || !price || !category || availableQuantity === undefined) {
        return "All fields are required";
    }

    if (Number(price) <= 0) {
        return "Price must be greater than 0";
    }

    if (Number(availableQuantity) < 0) {
        return "Available quantity cannot be negative";
    }

    return null;
};

module.exports = {
    validateProductInput,
};
const validateOrderInput = (data) => {
    const { productId } = data;

    if (!productId) {
        return "Product id is required";
    }

    return null;
};

module.exports = {
    validateOrderInput,
};
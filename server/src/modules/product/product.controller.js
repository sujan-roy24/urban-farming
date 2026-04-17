const productService = require("./product.service");
const { validateProductInput } = require("./product.validation");

const createProduct = async (req, res) => {
    try {
        const validationError = validateProductInput(req.body);

        if (validationError) {
            return res.status(400).json({
                success: false,
                message: validationError,
            });
        }

        const result = await productService.createProduct(req.user.id, req.body);

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const result = await productService.getAllProducts();

        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getSingleProduct = async (req, res) => {
    try {
        const result = await productService.getSingleProduct(req.params.id);

        res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            data: result,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
};
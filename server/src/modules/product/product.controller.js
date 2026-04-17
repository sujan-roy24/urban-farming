const productService = require("./product.service");
const { validateProductInput } = require("./product.validation");
const catchAsync = require("../../utils/catchAsync");

const createProduct = catchAsync(async (req, res) => {
    const validationError = validateProductInput(req.body);
    
    if (validationError) {
        const error = new Error(validationError);
        error.statusCode = 400;
        throw error;
    }
    
    const result = await productService.createProduct(req.user.id, req.body);
    
    res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: result,
    });
});

const getAllProducts = catchAsync(async (req, res) => {
    const result = await productService.getAllProducts();
    
    res.status(200).json({
        success: true,
        message: "Products fetched successfully",
        data: result,
    });
    
});

const getSingleProduct = catchAsync(async (req, res) => {
    const result = await productService.getSingleProduct(req.params.id);
    
    res.status(200).json({
        success: true,
        message: "Product fetched successfully",
        data: result,
    });
});

module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
};
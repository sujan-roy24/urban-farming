const orderService = require("./order.service");
const { validateOrderInput } = require("./order.validation");
const catchAsync = require("../../utils/catchAsync");
const getPagination = require("../../utils/pagination");

const createOrder = catchAsync(async (req, res) => {
    const validationError = validateOrderInput(req.body);

    if (validationError) {
        const error = new Error(validationError);
        error.statusCode = 400;
        throw error;
    }

    const result = await orderService.createOrder(req.user.id, req.body);

    res.status(201).json({
        success: true,
        message: "Order created successfully",
        data: result,
    });

});

const getMyOrders = catchAsync(async (req, res) => {
    const paginationOptions = getPagination(req.query);
    const result = await orderService.getMyOrders(req.user.id, paginationOptions);

    res.status(200).json({
        success: true,
        message: "My orders fetched successfully",
        meta: result.meta,
        data: result.data,
    });
});

const getVendorOrders = catchAsync(async (req, res) => {
    const paginationOptions = getPagination(req.query);
    const result = await orderService.getVendorOrders(req.user.id, paginationOptions);

    res.status(200).json({
        success: true,
        message: "Vendor orders fetched successfully",
        meta: result.meta,
        data: result.data,
    });
});

module.exports = {
    createOrder,
    getMyOrders,
    getVendorOrders,
};
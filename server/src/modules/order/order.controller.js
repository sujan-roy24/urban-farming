const orderService = require("./order.service");
const { validateOrderInput } = require("./order.validation");

const createOrder = async (req, res) => {
    try {
        const validationError = validateOrderInput(req.body);

        if (validationError) {
            return res.status(400).json({
                success: false,
                message: validationError,
            });
        }

        const result = await orderService.createOrder(req.user.id, req.body);

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getMyOrders = async (req, res) => {
    try {
        const result = await orderService.getMyOrders(req.user.id);

        res.status(200).json({
            success: true,
            message: "My orders fetched successfully",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getVendorOrders = async (req, res) => {
    try {
        const result = await orderService.getVendorOrders(req.user.id);

        res.status(200).json({
            success: true,
            message: "Vendor orders fetched successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createOrder,
    getMyOrders,
    getVendorOrders,
};
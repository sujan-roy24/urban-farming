const rentalSpaceService = require("./rentalSpace.service");
const { validateRentalSpaceInput } = require("./rentalSpace.validation");

const createRentalSpace = async (req, res) => {
    try {
        const validationError = validateRentalSpaceInput(req.body);

        if (validationError) {
            return res.status(400).json({
                success: false,
                message: validationError,
            });
        }

        const result = await rentalSpaceService.createRentalSpace(req.user.id, req.body);

        res.status(201).json({
            success: true,
            message: "Rental space created successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllRentalSpaces = async (req, res) => {
    try {
        const result = await rentalSpaceService.getAllRentalSpaces();

        res.status(200).json({
            success: true,
            message: "Rental spaces fetched successfully",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getSingleRentalSpace = async (req, res) => {
    try {
        const result = await rentalSpaceService.getSingleRentalSpace(req.params.id);

        res.status(200).json({
            success: true,
            message: "Rental space fetched successfully",
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
    createRentalSpace,
    getAllRentalSpaces,
    getSingleRentalSpace,
};
const rentalSpaceService = require("./rentalSpace.service");
const { validateRentalSpaceInput } = require("./rentalSpace.validation");
const catchAsync = require("../../utils/catchAsync");

const createRentalSpace = catchAsync(async (req, res) => {

    if (validationError) {
        const error = new Error(validationError);
        error.statusCode = 400;
        throw error;
    }

    const result = await rentalSpaceService.createRentalSpace(req.user.id, req.body);

    res.status(201).json({
        success: true,
        message: "Rental space created successfully",
        data: result,
    });

});

const getAllRentalSpaces = catchAsync(async (req, res) => {
    const result = await rentalSpaceService.getAllRentalSpaces();

    res.status(200).json({
        success: true,
        message: "Rental spaces fetched successfully",
        data: result,
    });
});

const getSingleRentalSpace = catchAsync(async (req, res) => {
    const result = await rentalSpaceService.getSingleRentalSpace(req.params.id);

    res.status(200).json({
        success: true,
        message: "Rental space fetched successfully",
        data: result,
    });

});

module.exports = {
    createRentalSpace,
    getAllRentalSpaces,
    getSingleRentalSpace,
};
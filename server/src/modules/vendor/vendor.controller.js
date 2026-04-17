const vendorService = require("./vendor.service");
const catchAsync = require("../../utils/catchAsync");

const createVendorProfile = catchAsync(async (req, res) => {

    const result = await vendorService.createVendorProfile(req.user.id, req.body);

    res.status(201).json({
        success: true,
        message: "Vendor profile created successfully",
        data: result,
    });
});

const getMyVendorProfile = catchAsync(async (req, res) => {
    const result = await vendorService.getMyVendorProfile(req.user.id);

    if (!result) {
        const error = new error();
        error.status(404);
        throw error;
    }

    res.status(200).json({
        success: true,
        message: "Vendor profile fetched successfully",
        data: result,
    });
});

module.exports = {
    createVendorProfile,
    getMyVendorProfile,
};
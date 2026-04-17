const vendorService = require("./vendor.service");

const createVendorProfile = async (req, res) => {
    try {
        const result = await vendorService.createVendorProfile(req.user.id, req.body);

        res.status(201).json({
            success: true,
            message: "Vendor profile created successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getMyVendorProfile = async (req, res) => {
    try {
        const result = await vendorService.getMyVendorProfile(req.user.id);

        res.status(200).json({
            success: true,
            message: "Vendor profile fetched successfully",
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
    createVendorProfile,
    getMyVendorProfile,
};
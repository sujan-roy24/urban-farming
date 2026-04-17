const prisma = require("../../config/prisma");

const createVendorProfile = async (userId, payload) => {
    const existingProfile = await prisma.vendorProfile.findUnique({
        where: { userId },
    });

    if (existingProfile) {
        const error = new Error("Vendor profile already exists");
        error.statusCode = 409;
        throw error;
    }

    const vendorProfile = await prisma.vendorProfile.create({
        data: {
            userId,
            farmName: payload.farmName,
            farmLocation: payload.farmLocation,
        },
    });

    return vendorProfile;
};

const getMyVendorProfile = async (userId) => {
    const vendorProfile = await prisma.vendorProfile.findUnique({
        where: { userId },
    });

    if (!vendorProfile) {
        const error = new Error("Vendor profile not found");
        error.statusCode = 404;
        throw error;
    }

    return vendorProfile;
};

module.exports = {
    createVendorProfile,
    getMyVendorProfile,
};
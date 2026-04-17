const prisma = require("../../config/prisma");

const createVendorProfile = async (userId, payload) => {
    const existingProfile = await prisma.vendorProfile.findUnique({
        where: { userId },
    });

    if (existingProfile) {
        throw new Error("Vendor profile already exists");
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
        throw new Error("Vendor profile not found");
    }

    return vendorProfile;
};

module.exports = {
    createVendorProfile,
    getMyVendorProfile,
};
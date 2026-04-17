const prisma = require("../../config/prisma");

const createRentalSpace = async (userId, payload) => {
    const vendorProfile = await prisma.vendorProfile.findUnique({
        where: { userId },
    });

    if (!vendorProfile) {
        throw new Error("Vendor profile not found");
    }

    const rentalSpace = await prisma.rentalSpace.create({
        data: {
            vendorId: vendorProfile.id,
            location: payload.location,
            size: payload.size,
            price: Number(payload.price),
            availability: true,
        },
    });

    return rentalSpace;
};

const getAllRentalSpaces = async () => {
    return prisma.rentalSpace.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
};

const getSingleRentalSpace = async (id) => {
    const rentalSpace = await prisma.rentalSpace.findUnique({
        where: { id },
    });

    if (!rentalSpace) {
        throw new Error("Rental space not found");
    }

    return rentalSpace;
};

module.exports = {
    createRentalSpace,
    getAllRentalSpaces,
    getSingleRentalSpace,
};
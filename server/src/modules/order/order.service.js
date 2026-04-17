const prisma = require("../../config/prisma");

const createOrder = async (userId, payload) => {
    const product = await prisma.product.findUnique({
        where: { id: payload.productId },
    });

    if (!product) {
        throw new Error("Product not found");
    }

    if (product.availableQuantity <= 0) {
        throw new Error("Product is out of stock");
    }

    const order = await prisma.order.create({
        data: {
            userId,
            productId: product.id,
            vendorId: product.vendorId,
            status: "PENDING",
        },
    });

    await prisma.product.update({
        where: { id: product.id },
        data: {
            availableQuantity: product.availableQuantity - 1,
        },
    });

    return order;
};

const getMyOrders = async (userId) => {
    return prisma.order.findMany({
        where: { userId },
        orderBy: {
            createdAt: "desc",
        },
    });
};

const getVendorOrders = async (userId) => {
    const vendorProfile = await prisma.vendorProfile.findUnique({
        where: { userId },
    });

    if (!vendorProfile) {
        throw new Error("Vendor profile not found");
    }

    return prisma.order.findMany({
        where: { vendorId: vendorProfile.id },
        orderBy: {
            createdAt: "desc",
        },
    });
};

module.exports = {
    createOrder,
    getMyOrders,
    getVendorOrders,
};
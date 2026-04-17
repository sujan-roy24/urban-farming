const prisma = require("../../config/prisma");

const createOrder = async (userId, payload) => {
    const product = await prisma.product.findUnique({
        where: { id: payload.productId },
    });

    if (!product) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
    }

    if (product.availableQuantity <= 0) {
        const error = new Error("Product is out of stock");
        error.statusCode = 400;
        throw error;
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

const getMyOrders = async (userId, paginationOptions) => {
    const { page, limit, skip } = paginationOptions;

    const orders = await prisma.order.findMany({
        where: { userId },
        orderBy: {
            createdAt: "desc",
        },
        skip,
        take: limit,
    });

    const total = await prisma.order.count({
        where: { userId },
    });

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: orders,
    };
};

const getVendorOrders = async (userId, paginationOptions) => {
    const vendorProfile = await prisma.vendorProfile.findUnique({
        where: { userId },
    });


    if (!vendorProfile) {
        const error = new Error("Vendor profile not found");
        error.statusCode = 404;
        throw error;
    }

    const { page, limit, skip } = paginationOptions;

    const orders = await prisma.order.findMany({
        where: { vendorId: vendorProfile.id },
        orderBy: {
            createdAt: "desc",
        },
        skip,
        take: limit,
    });

    const total = await prisma.order.count({
        where: { vendorId: vendorProfile.id },
    });

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: orders,
    };
};
module.exports = {
    createOrder,
    getMyOrders,
    getVendorOrders,
};
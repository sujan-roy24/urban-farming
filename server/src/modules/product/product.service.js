const prisma = require("../../config/prisma");

const createProduct = async (userId, payload) => {
    const vendorProfile = await prisma.vendorProfile.findUnique({
        where: { userId },
    });

    if (!vendorProfile) {
        const error = new Error("Vendor profile not found");
        error.statusCode = 404;
        throw error;
    }

    const product = await prisma.product.create({
        data: {
            vendorId: vendorProfile.id,
            name: payload.name,
            description: payload.description,
            price: Number(payload.price),
            category: payload.category,
            availableQuantity: Number(payload.availableQuantity),
        },
    });

    return product;
};

const getAllProducts = async () => {
    const products = await prisma.product.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    return products;
};

const getSingleProduct = async (id) => {
    const product = await prisma.product.findUnique({
        where: { id },
    });

    if (!product) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
    }

    return product;
};

module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
};
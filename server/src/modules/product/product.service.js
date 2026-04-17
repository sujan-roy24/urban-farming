const prisma = require("../../config/prisma");

const createProduct = async (userId, payload) => {
    const vendorProfile = await prisma.vendorProfile.findUnique({
        where: { userId },
    });

    if (!vendorProfile) {
        throw new Error("Vendor profile not found");
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
        throw new Error("Product not found");
    }

    return product;
};

module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
};
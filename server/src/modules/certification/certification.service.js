const prisma = require("../../config/prisma");

const submitCertification = async (userId, payload) => {
    const vendorProfile = await prisma.vendorProfile.findUnique({
        where: { userId },
    });

    if (!vendorProfile) {
        throw new Error("Vendor profile not found");
    }

    const certification = await prisma.sustainabilityCert.create({
        data: {
            vendorId: vendorProfile.id,
            certifyingAgency: payload.certifyingAgency,
            certificationDate: new Date(payload.certificationDate),
        },
    });

    return certification;
};

const getMyCertifications = async (userId) => {
    const vendorProfile = await prisma.vendorProfile.findUnique({
        where: { userId },
    });

    if (!vendorProfile) {
        throw new Error("Vendor profile not found");
    }

    const certifications = await prisma.sustainabilityCert.findMany({
        where: { vendorId: vendorProfile.id },
        orderBy: { createdAt: "desc" },
    });

    return certifications;
};

module.exports = {
    submitCertification,
    getMyCertifications,
};
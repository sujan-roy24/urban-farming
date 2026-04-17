const certificationService = require("./certification.service");
const {
    validateCertificationInput,
} = require("./certification.validation");

const catchAsync = require("../../utils/catchAsync");


const submitCertification = catchAsync(async (req, res) => {
    const validationError = validateCertificationInput(req.body);

    if (validationError) {
        const error = new Error(validationError);
        error.statusCode = 400;
        throw error;
    }

    const result = await certificationService.submitCertification(req.user.id, req.body);

    res.status(201).json({
        success: true,
        message: "Certification submitted successfully",
        data: result,
    });
});
const getMyCertifications = catchAsync(async (req, res) => {
    const result = await certificationService.getMyCertifications(req.user.id);

    res.status(200).json({
        success: true,
        message: "Certifications fetched successfully",
        data: result,
    });
});

module.exports = {
    submitCertification,
    getMyCertifications,
};
const certificationService = require("./certification.service");
const {
    validateCertificationInput,
} = require("./certification.validation");

const submitCertification = async (req, res) => {
    try {
        const validationError = validateCertificationInput(req.body);

        if (validationError) {
            return res.status(400).json({
                success: false,
                message: validationError,
            });
        }

        const result = await certificationService.submitCertification(req.user.id, req.body);

        res.status(201).json({
            success: true,
            message: "Certification submitted successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
const getMyCertifications = async (req, res) => {
    try {
        const result = await certificationService.getMyCertifications(req.user.id);

        res.status(200).json({
            success: true,
            message: "Certifications fetched successfully",
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
    submitCertification,
    getMyCertifications,
};
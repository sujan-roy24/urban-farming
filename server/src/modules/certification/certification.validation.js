const validateCertificationInput = (data) => {
    const { certifyingAgency, certificationDate } = data;

    if (!certifyingAgency || !certificationDate) {
        return "Certifying agency and certification date are required";
    }

    if (isNaN(new Date(certificationDate).getTime())) {
        return "Invalid certification date";
    }

    return null;
};

module.exports = {
    validateCertificationInput,
};
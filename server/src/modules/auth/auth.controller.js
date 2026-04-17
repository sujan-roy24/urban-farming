const authService = require("./auth.service");
const {
    validateRegisterInput,
    validateLoginInput,
} = require("./auth.validation");
const catchAsync = require("../../utils/catchAsync");

const register = catchAsync(async (req, res) => {
    const validationError = validateRegisterInput(req.body);

    if (validationError) {
        const error = new Error(validationError);
        error.statusCode = 400;
        throw error;
    }

    const result = await authService.registerUser(req.body);

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: result,
    });
});

const login = catchAsync(async (req, res) => {
    const validationError = validateLoginInput(req.body);

    if (validationError) {
        const error = new Error(validationError);
        error.statusCode = 400;
        throw error;
    }

    const result = await authService.loginUser(req.body);

    res.status(200).json({
        success: true,
        message: "Login successful",
        data: result,
    });
});

module.exports = {
    register,
    login,
};
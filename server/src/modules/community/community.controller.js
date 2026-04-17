const communityService = require("./community.service");
const { validatePostInput } = require("./community.validation");
const catchAsync = require("../../utils/catchAsync");

const createPost = catchAsync(async (req, res) => {
    const validationError = validatePostInput(req.body);

    if (validationError) {
        const error = new Error(validationError);
        error.statusCode = 400;
        throw error;
    }

    const result = await communityService.createPost(req.user.id, req.body);

    res.status(201).json({
        success: true,
        message: "Post created successfully",
        data: result,
    });
});

const getAllPosts = catchAsync(async (req, res) => {
    const result = await communityService.getAllPosts();

    res.status(200).json({
        success: true,
        message: "Posts fetched successfully",
        data: result,
    });
});

const getSinglePost = catchAsync(async (req, res) => {
    const result = await communityService.getSinglePost(req.params.id);

    res.status(200).json({
        success: true,
        message: "Post fetched successfully",
        data: result,
    });
});

module.exports = {
    createPost,
    getAllPosts,
    getSinglePost,
};
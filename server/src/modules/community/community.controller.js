const communityService = require("./community.service");
const { validatePostInput } = require("./community.validation");

const createPost = async (req, res) => {
    try {
        const validationError = validatePostInput(req.body);

        if (validationError) {
            return res.status(400).json({
                success: false,
                message: validationError,
            });
        }

        const result = await communityService.createPost(req.user.id, req.body);

        res.status(201).json({
            success: true,
            message: "Post created successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const result = await communityService.getAllPosts();

        res.status(200).json({
            success: true,
            message: "Posts fetched successfully",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getSinglePost = async (req, res) => {
    try {
        const result = await communityService.getSinglePost(req.params.id);

        res.status(200).json({
            success: true,
            message: "Post fetched successfully",
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
    createPost,
    getAllPosts,
    getSinglePost,
};
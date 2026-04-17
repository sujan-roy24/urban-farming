const prisma = require("../../config/prisma");

const createPost = async (userId, payload) => {
    const post = await prisma.communityPost.create({
        data: {
            userId,
            postContent: payload.postContent,
        },
    });

    return post;
};

const getAllPosts = async () => {
    return prisma.communityPost.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
};

const getSinglePost = async (id) => {
    const post = await prisma.communityPost.findUnique({
        where: { id },
    });

    if (!post) {
        const error = new Error("Post not found");
        error.statusCode = 404;
        throw error;
    }

    return post;
};

module.exports = {
    createPost,
    getAllPosts,
    getSinglePost,
};
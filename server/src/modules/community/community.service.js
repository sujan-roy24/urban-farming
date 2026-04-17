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
        throw new Error("Post not found");
    }

    return post;
};

module.exports = {
    createPost,
    getAllPosts,
    getSinglePost,
};
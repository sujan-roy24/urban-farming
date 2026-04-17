const validatePostInput = (data) => {
    const { postContent } = data;

    if (!postContent) {
        return "Post content is required";
    }

    if (postContent.trim().length < 3) {
        return "Post content must be at least 3 characters";
    }

    return null;
};

module.exports = {
    validatePostInput,
};
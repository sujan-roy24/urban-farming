const validateRegisterInput = (data) => {
    const { name, email, password, role } = data;

    if (!name || !email || !password || !role) {
        return "All fields are required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return "Invalid email format";
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

    if (!passwordRegex.test(password)) {
        return "Password must be at least 6 characters and contain letters and numbers";
    }

    const validRoles = ["ADMIN", "VENDOR", "CUSTOMER"];

    if (!validRoles.includes(role)) {
        return "Invalid role";
    }

    return null;
};

const validateLoginInput = (data) => {
    const { email, password } = data;

    if (!email || !password) {
        return "Email and password are required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return "Invalid email format";
    }

    return null;
};

module.exports = {
    validateRegisterInput,
    validateLoginInput,
};
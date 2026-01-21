// Email validation regex (simple for MVP)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Check if string is valid email format
 */
const isEmail = (str) => {
    return typeof str === "string" && emailRegex.test(str.trim());
};

/**
 * Validate register input
 * @param {object} data - { username, email, password }
 * @returns {{ ok: boolean, value?: object, fields?: object }}
 */
const validateRegister = ({ username, email, password }) => {
    const errors = {};

    // Username validation
    if (!username || typeof username !== "string") {
        errors.username = "Username is required";
    } else if (username.trim().length < 2) {
        errors.username = "Username must be at least 2 characters";
    }

    // Email validation
    if (!email || typeof email !== "string") {
        errors.email = "Email is required";
    } else if (!isEmail(email)) {
        errors.email = "Invalid email format";
    }

    // Password validation
    if (!password || typeof password !== "string") {
        errors.password = "Password is required";
    } else if (password.length < 8) {
        errors.password = "Password must be at least 8 characters";
    }

    if (Object.keys(errors).length > 0) {
        return { ok: false, fields: errors };
    }

    return {
        ok: true,
        value: {
            username: username.trim(),
            email: email.trim().toLowerCase(),
            password,
        },
    };
};

/**
 * Validate login input
 * @param {object} data - { usernameOrEmail, email, username, password }
 * @returns {{ ok: boolean, value?: object, fields?: object }}
 */
const validateLogin = ({ usernameOrEmail, email, username, password }) => {
    const errors = {};

    // Get identifier (priority: usernameOrEmail > email > username)
    const identifier = usernameOrEmail || email || username;

    // Identifier validation
    if (!identifier || typeof identifier !== "string" || !identifier.trim()) {
        errors.identifier = "Username or email is required";
    }

    // Password validation
    if (!password || typeof password !== "string") {
        errors.password = "Password is required";
    }

    if (Object.keys(errors).length > 0) {
        return { ok: false, fields: errors };
    }

    const trimmedIdentifier = identifier.trim();
    const isEmailFormat = isEmail(trimmedIdentifier);

    return {
        ok: true,
        value: {
            identifier: trimmedIdentifier,
            identifierLower: trimmedIdentifier.toLowerCase(),
            isEmail: isEmailFormat,
            password,
        },
    };
};

module.exports = {
    isEmail,
    validateRegister,
    validateLogin,
};

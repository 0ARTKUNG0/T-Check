import api from "./api";

const AuthService = {
    // Register new user
    register: async (userData) => {
        try {
            // POST /auth/register
            const response = await api.post("/auth/register", userData);
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || { message: "An error occurred during registration" };
        }
    },

    // Login user
    login: async (identifier, password) => {
        try {
            // POST /auth/login
            const response = await api.post("/auth/login", {
                usernameOrEmail: identifier,
                password: password,
            });
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || { message: "An error occurred during login" };
        }
    },

    // Get current user info
    getMe: async () => {
        try {
            // GET /auth/me
            const response = await api.get("/auth/me");
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || { message: "Failed to fetch user data" };
        }
    },
};

export default AuthService;

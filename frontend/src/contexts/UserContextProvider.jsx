import { createContext, useState, useEffect, useContext } from "react";
import AuthService from "../services/authentication.services";
import { setCookie, getCookie, deleteCookie } from "../utils/cookie";

// 1. Create Context
const UserContext = createContext(null);

// 2. Create Provider Component
export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check for existing token on mount
    useEffect(() => {
        const checkUserLoggedIn = async () => {
            const token = getCookie("token");
            if (token) {
                try {
                    const response = await AuthService.getMe();
                    if (response.success) {
                        setUser(response.data.user);
                    } else {
                        deleteCookie("token");
                        setUser(null);
                    }
                } catch (error) {
                    console.error("Session restore failed:", error);
                    deleteCookie("token");
                    setUser(null);
                }
            }
            setLoading(false);
        };

        checkUserLoggedIn();
    }, []);

    // Login Function
    const login = async (identifier, password) => {
        try {
            const response = await AuthService.login(identifier, password);
            if (response.success) {
                // Save token to cookie (7 days)
                setCookie("token", response.data.token, 7);
                // Set user state
                setUser(response.data.user);
                return { success: true };
            }
        } catch (error) {
            console.error("Login failed:", error);
            return { success: false, error: error };
        }
    };

    // Register Function
    const register = async (userData) => {
        try {
            const response = await AuthService.register(userData);
            if (response.success) {
                return { success: true };
            }
        } catch (error) {
            console.error("Register failed:", error);
            return { success: false, error: error };
        }
    };

    // Logout Function
    const logout = () => {
        deleteCookie("token");
        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
        logout,
        register,
        isAuthenticated: !!user,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// 3. Custom Hook for easy access
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserContextProvider");
    }
    return context;
};

export default UserContext;

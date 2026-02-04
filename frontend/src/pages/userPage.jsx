import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContextProvider";

const UserPage = ({ children, requireAuth = false }) => {
    const { isAuthenticated, loading } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return; // Wait for auth check to complete

        if (requireAuth && !isAuthenticated) {
            navigate("/notallowed", { replace: true });
        }

        if (!requireAuth && isAuthenticated) {
            navigate("/", { replace: true });
        }
    }, [requireAuth, isAuthenticated, loading, navigate]);

    return <>{children}</>;
};

export default UserPage;

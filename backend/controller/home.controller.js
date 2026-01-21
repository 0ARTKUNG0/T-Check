const HomeController = {
    /**
     * Get home page data
     * GET /api/home
     * Requires: jwtAuth middleware
     */
    getHome: (req, res) => {
        return res.status(200).json({
            success: true,
            data: {
                message: "Welcome to T-CHECK",
                user: {
                    id: req.user.id,
                    username: req.user.username,
                    email: req.user.email,
                },
                timestamp: new Date().toISOString(),
            },
        });
    },
};

module.exports = HomeController;

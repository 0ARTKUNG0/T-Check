const mockUsers = [
    {
        id: "1",
        username: "john_doe",
        email: "john@example.com",
        password: "$2b$10$hashedpassword123", // In real app, this would be bcrypt hashed
        token: "mock_token_john_123",
    },
    {
        id: "2",
        username: "jane_smith",
        email: "jane@example.com",
        password: "$2b$10$hashedpassword456",
        token: "mock_token_jane_456",
    },
    {
        id: "3",
        username: "admin_user",
        email: "admin@example.com",
        password: "$2b$10$hashedpassword789",
        token: "mock_token_admin_789",
    },
];

module.exports = mockUsers;

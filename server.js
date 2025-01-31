const express = require("express");
const path = require("path");

const app = express();

// Use the port from environment variable (Render dynamically assigns this port)
const PORT = process.env.PORT || 3300;

// Mock "database" for users (you would replace this with an actual database in production)
const usersDb = [
  {
    username: "abhinish",
    password: "1234",
    profile: {
      name: "Abhinish",
      email: "abhinish@example.com",
      bio: "Developer and tech enthusiast.",
    },
  },
  {
    username: "john_doe",
    password: "abcd1234",
    profile: {
      name: "John Doe",
      email: "john.doe@example.com",
      bio: "Designer and creative mind.",
    },
  },
];

// Middleware to parse JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (e.g., images, CSS, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Serve the HTML file at the root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// POST route for login
app.post("/login", (req, res) => {
  const { name, password } = req.body;

  // Check if user exists in the "database"
  const user = usersDb.find((user) => user.username === name);

  if (user && user.password === password) {
    // Successful login, return profile data
    return res.json({ success: true, profile: user.profile });
  } else {
    // Invalid credentials
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  }
});

// POST route for logout
app.post("/logout", (req, res) => {
  // Handle logout (reset session or token, if used)
  res.json({ success: true });
});

// Listen on dynamic port provided by Render, or default to 3300 for local development
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ status: "ok", message: "Chat2PDF Monolith Service Running" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

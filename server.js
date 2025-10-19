const express = require("express");
const cors = require("cors");
const fetchChat = require("./src/fetchChat");

const app = express();

const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Main conversion endpoint
app.post("/api/convert", async (req, res) => {
  try {
    const { chatUrl } = req.body;

    // Validate URL
    if (!chatUrl) {
      return res.status(400).json({ error: "chatUrl is required" });
    }

    if (!chatUrl.includes("chatgpt.com/share/")) {
      return res.status(400).json({
        error: "Invalid ChatGPT share URL format",
      });
    }

    console.log(`[${new Date().toISOString()}] Processing: ${chatUrl}`);

    // Fetch and parse chat
    const messages = await fetchChat(chatUrl);

    console.log(`Fetched ${messages.length} messages`);

    if (!messages || messages.length === 0) {
      return res.status(404).json({
        error: "No messages found or unable to fetch chat",
      });
    } else {
      return res.json(messages);
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      error: "Failed to convert chat to PDF",
      details: error.message,
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

require("dotenv").config(); // Load environment variables from .env

const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Google Generative AI with API Key from .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Middleware
app.use(
  express.json(),
  cors({
    origin: "*", // Change to a specific domain for security
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Chat API Route
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Generate response from Gemini
    const result = await model.generateContent(message);
    const reply = result.response?.text() || "I couldn't understand that.";

    res.json({ reply });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({
      error: "Error fetching response from Gemini API",
      details: error.message,
    });
  }
});

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 Server is running...");
});

// Start Server
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

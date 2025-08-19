import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertChatMessageSchema } from "@shared/schema";
import { demoQueries, getCategorizedQueries, searchQueries } from "@shared/demo-data";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Chat endpoints
  app.post("/api/chat", async (req, res) => {
    try {
      const validatedData = insertChatMessageSchema.parse(req.body);
      
      // Process the message and generate AI response
      const response = await generateAIResponse(validatedData.message, validatedData.category || undefined);
      
      const chatMessage = await storage.createChatMessage({
        ...validatedData,
        response: response
      });
      
      res.json(chatMessage);
    } catch (error) {
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  app.get("/api/chat/messages", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      const messages = await storage.getChatMessages(userId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  // Agricultural advice endpoints
  app.get("/api/advice", async (req, res) => {
    try {
      const category = req.query.category as string;
      const query = req.query.q as string;
      const advice = await storage.getAgriculturalAdvice(category, query);
      res.json(advice);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch advice" });
    }
  });

  app.get("/api/advice/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ error: "Search query is required" });
      }
      const results = await storage.searchAdvice(query);
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Search failed" });
    }
  });

  // Weather endpoints
  app.get("/api/weather/:location", async (req, res) => {
    try {
      const location = req.params.location;
      const weather = await storage.getWeatherData(location);
      if (!weather) {
        return res.status(404).json({ error: "Weather data not found for this location" });
      }
      res.json(weather);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch weather data" });
    }
  });

  // Government schemes endpoints
  app.get("/api/schemes", async (req, res) => {
    try {
      const state = req.query.state as string;
      const category = req.query.category as string;
      const schemes = await storage.getGovernmentSchemes(state, category);
      res.json(schemes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch schemes" });
    }
  });

  // Language translation endpoint (mock implementation)
  app.post("/api/translate", async (req, res) => {
    try {
      const { text, from, to } = req.body;
      
      // Mock translation response - in production, integrate with Google Translate or IndicTrans2
      const translatedText = `[Translated to ${to}] ${text}`;
      
      res.json({ 
        originalText: text,
        translatedText: translatedText,
        fromLanguage: from,
        toLanguage: to
      });
    } catch (error) {
      res.status(500).json({ error: "Translation failed" });
    }
  });

  // Text-to-speech endpoint (mock implementation)
  app.post("/api/tts", async (req, res) => {
    try {
      const { text, language } = req.body;
      
      // Mock TTS response - in production, integrate with speech synthesis API
      res.json({ 
        message: "Text-to-speech processing completed",
        text: text,
        language: language,
        audioUrl: "/api/audio/mock-tts.mp3" // Mock audio URL
      });
    } catch (error) {
      res.status(500).json({ error: "Text-to-speech failed" });
    }
  });

  // Demo data endpoints
  app.get("/api/demo/queries", async (req, res) => {
    try {
      const search = req.query.search as string;
      if (search) {
        const results = searchQueries(search);
        res.json(results);
      } else {
        res.json(demoQueries);
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch demo queries" });
    }
  });

  app.get("/api/demo/categories", async (req, res) => {
    try {
      const categorizedQueries = getCategorizedQueries();
      res.json(categorizedQueries);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categorized queries" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// AI response generation function
async function generateAIResponse(message: string, category?: string): Promise<string> {
  // This is a simplified AI response generator
  // In production, integrate with OpenAI, Gemini, or other LLM APIs
  
  const lowerMessage = message.toLowerCase();
  
  // Weather queries
  if (lowerMessage.includes("weather") || lowerMessage.includes("rain") || lowerMessage.includes("temperature")) {
    return "🌤️ Today's weather looks favorable for farming activities. Temperature is around 25°C with 65% humidity. There's no rainfall expected for the next 3 days, which is good for field preparation. I recommend monitoring for any sudden weather changes.";
  }
  
  // Crop advice
  if (lowerMessage.includes("wheat") || lowerMessage.includes("crop")) {
    return "🌾 For wheat cultivation, the current season is ideal for sowing. Make sure your soil temperature is between 18-22°C. Use recommended varieties like PBW 725 or HD 3086. Apply balanced fertilizers and ensure proper irrigation. Would you like specific advice for your region?";
  }
  
  // Pest control
  if (lowerMessage.includes("pest") || lowerMessage.includes("insect") || lowerMessage.includes("bug")) {
    return "🐛 For effective pest control, I recommend integrated pest management (IPM). Start with regular field monitoring, use pest-resistant crop varieties, and consider neem-based organic pesticides. Avoid overuse of chemical pesticides. Can you share more details about the specific pest you're dealing with?";
  }
  
  // Fertilizer advice
  if (lowerMessage.includes("fertilizer") || lowerMessage.includes("nutrition") || lowerMessage.includes("npk")) {
    return "🌱 For optimal crop nutrition, soil testing is essential first. Generally, use NPK fertilizers in appropriate ratios based on your crop. For wheat, use 120:60:40 kg/ha. Apply phosphorus and potash at sowing, and nitrogen in splits. Consider organic alternatives like compost and vermicompost.";
  }
  
  // Government schemes
  if (lowerMessage.includes("scheme") || lowerMessage.includes("subsidy") || lowerMessage.includes("loan")) {
    return "🏛️ There are several government schemes available for farmers including PM-KISAN (₹6,000/year direct benefit), Pradhan Mantri Fasal Bima Yojana (crop insurance), and various state-specific schemes. You can apply online or visit your nearest CSC. Would you like details about eligibility for any specific scheme?";
  }
  
  // Default response
  return "🙏 Hello! I'm AgentKrishi, your AI agricultural advisor. I can help you with crop advice, weather information, pest control, fertilizer recommendations, and government schemes. Please feel free to ask me specific questions about your farming needs, and I'll provide you with detailed guidance in your preferred language.";
}

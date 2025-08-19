import { 
  type User, 
  type InsertUser,
  type ChatMessage,
  type InsertChatMessage,
  type AgriculturalAdvice,
  type InsertAgriculturalAdvice,
  type WeatherData,
  type InsertWeatherData,
  type GovernmentScheme,
  type InsertGovernmentScheme
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Chat operations
  getChatMessages(userId?: string): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;

  // Agricultural advice
  getAgriculturalAdvice(category?: string, query?: string): Promise<AgriculturalAdvice[]>;
  createAgriculturalAdvice(advice: InsertAgriculturalAdvice): Promise<AgriculturalAdvice>;
  searchAdvice(query: string): Promise<AgriculturalAdvice[]>;

  // Weather data
  getWeatherData(location: string): Promise<WeatherData | undefined>;
  createWeatherData(weather: InsertWeatherData): Promise<WeatherData>;

  // Government schemes
  getGovernmentSchemes(state?: string, category?: string): Promise<GovernmentScheme[]>;
  createGovernmentScheme(scheme: InsertGovernmentScheme): Promise<GovernmentScheme>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private chatMessages: Map<string, ChatMessage>;
  private agriculturalAdvice: Map<string, AgriculturalAdvice>;
  private weatherData: Map<string, WeatherData>;
  private governmentSchemes: Map<string, GovernmentScheme>;

  constructor() {
    this.users = new Map();
    this.chatMessages = new Map();
    this.agriculturalAdvice = new Map();
    this.weatherData = new Map();
    this.governmentSchemes = new Map();
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample agricultural advice
    const adviceData = [
      {
        id: randomUUID(),
        category: "crop",
        subcategory: "wheat",
        question: "Best time to plant wheat in Punjab",
        answer: "For wheat cultivation in Punjab, the optimal planting period is November 1-20. Late sowing can be done up to December 15. Soil temperature should be 18-22°C. Recommended varieties include PBW 725 and HD 3086.",
        region: "north",
        season: "rabi",
        language: "en",
        tags: ["wheat", "planting", "punjab", "timing"],
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        category: "pest",
        subcategory: "rice",
        question: "How to control rice pests",
        answer: "Common rice pests include brown planthopper, stem borer, and leaf folder. Use integrated pest management: monitor regularly, use resistant varieties, apply neem-based pesticides, and maintain proper water management.",
        region: "all",
        season: "kharif",
        language: "en",
        tags: ["rice", "pest", "control", "ipm"],
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        category: "fertilizer",
        subcategory: "wheat",
        question: "Best fertilizer for wheat",
        answer: "For wheat, use NPK in ratio 120:60:40 kg/ha. Apply 1/2 nitrogen and full phosphorus and potash at sowing. Remaining nitrogen in 2-3 splits during tillering and grain filling stages.",
        region: "all",
        season: "rabi",
        language: "en",
        tags: ["wheat", "fertilizer", "npk", "nutrition"],
        createdAt: new Date(),
      }
    ];

    adviceData.forEach(advice => {
      this.agriculturalAdvice.set(advice.id, advice);
    });

    // Sample weather data
    const weatherSample = {
      id: randomUUID(),
      location: "Delhi",
      date: new Date(),
      temperature: 25,
      humidity: 65,
      rainfall: 0,
      windSpeed: 10,
      forecast: {
        "next7days": [
          { "date": "2024-01-14", "temp": 26, "humidity": 60, "rainfall": 0 },
          { "date": "2024-01-15", "temp": 24, "humidity": 70, "rainfall": 2 },
          { "date": "2024-01-16", "temp": 23, "humidity": 75, "rainfall": 5 }
        ]
      },
      advisories: ["Favorable conditions for wheat sowing", "Monitor for aphid infestation"],
      createdAt: new Date(),
    };

    this.weatherData.set(weatherSample.id, weatherSample);

    // Sample government schemes
    const schemes = [
      {
        id: randomUUID(),
        name: "PM-KISAN Scheme",
        description: "Direct income support to farmers",
        eligibility: "Small and marginal farmers with landholding up to 2 hectares",
        benefits: "Rs. 6,000 per year in three installments",
        applicationProcess: "Apply online through PM-KISAN portal or visit nearest CSC",
        documents: ["Aadhaar Card", "Bank Account Details", "Land Records"],
        state: "all",
        category: "subsidy",
        language: "en",
        isActive: 1,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        name: "Pradhan Mantri Fasal Bima Yojana",
        description: "Crop insurance scheme for farmers",
        eligibility: "All farmers including sharecroppers and tenant farmers",
        benefits: "Insurance coverage for crop loss due to natural calamities",
        applicationProcess: "Apply through banks, CSCs, or insurance companies",
        documents: ["Aadhaar Card", "Bank Account", "Land Records", "Sowing Certificate"],
        state: "all",
        category: "insurance",
        language: "en",
        isActive: 1,
        createdAt: new Date(),
      }
    ];

    schemes.forEach(scheme => {
      this.governmentSchemes.set(scheme.id, scheme);
    });
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      id, 
      username: insertUser.username,
      password: insertUser.password,
      preferredLanguage: insertUser.preferredLanguage || null,
      location: insertUser.location || null,
      createdAt: new Date() 
    };
    this.users.set(id, user);
    return user;
  }

  // Chat operations
  async getChatMessages(userId?: string): Promise<ChatMessage[]> {
    const messages = Array.from(this.chatMessages.values());
    if (userId) {
      return messages.filter(msg => msg.userId === userId);
    }
    return messages;
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = randomUUID();
    const message: ChatMessage = {
      id,
      userId: insertMessage.userId || null,
      message: insertMessage.message,
      response: insertMessage.response || null,
      messageType: insertMessage.messageType,
      language: insertMessage.language || null,
      category: insertMessage.category || null,
      metadata: insertMessage.metadata || null,
      createdAt: new Date()
    };
    this.chatMessages.set(id, message);
    return message;
  }

  // Agricultural advice operations
  async getAgriculturalAdvice(category?: string, query?: string): Promise<AgriculturalAdvice[]> {
    let advice = Array.from(this.agriculturalAdvice.values());
    
    if (category) {
      advice = advice.filter(item => item.category === category);
    }
    
    if (query) {
      const searchTerm = query.toLowerCase();
      advice = advice.filter(item => 
        item.question.toLowerCase().includes(searchTerm) ||
        item.answer.toLowerCase().includes(searchTerm) ||
        item.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }
    
    return advice;
  }

  async createAgriculturalAdvice(insertAdvice: InsertAgriculturalAdvice): Promise<AgriculturalAdvice> {
    const id = randomUUID();
    const advice: AgriculturalAdvice = {
      id,
      category: insertAdvice.category,
      subcategory: insertAdvice.subcategory || null,
      question: insertAdvice.question,
      answer: insertAdvice.answer,
      region: insertAdvice.region || null,
      season: insertAdvice.season || null,
      language: insertAdvice.language || null,
      tags: insertAdvice.tags || null,
      createdAt: new Date()
    };
    this.agriculturalAdvice.set(id, advice);
    return advice;
  }

  async searchAdvice(query: string): Promise<AgriculturalAdvice[]> {
    return this.getAgriculturalAdvice(undefined, query);
  }

  // Weather operations
  async getWeatherData(location: string): Promise<WeatherData | undefined> {
    return Array.from(this.weatherData.values())
      .find(weather => weather.location.toLowerCase() === location.toLowerCase());
  }

  async createWeatherData(insertWeather: InsertWeatherData): Promise<WeatherData> {
    const id = randomUUID();
    const weather: WeatherData = {
      id,
      location: insertWeather.location,
      date: insertWeather.date,
      temperature: insertWeather.temperature || null,
      humidity: insertWeather.humidity || null,
      rainfall: insertWeather.rainfall || null,
      windSpeed: insertWeather.windSpeed || null,
      forecast: insertWeather.forecast || null,
      advisories: insertWeather.advisories || null,
      createdAt: new Date()
    };
    this.weatherData.set(id, weather);
    return weather;
  }

  // Government schemes operations
  async getGovernmentSchemes(state?: string, category?: string): Promise<GovernmentScheme[]> {
    let schemes = Array.from(this.governmentSchemes.values())
      .filter(scheme => scheme.isActive === 1);
    
    if (state) {
      schemes = schemes.filter(scheme => 
        scheme.state === "all" || scheme.state?.toLowerCase() === state.toLowerCase()
      );
    }
    
    if (category) {
      schemes = schemes.filter(scheme => scheme.category === category);
    }
    
    return schemes;
  }

  async createGovernmentScheme(insertScheme: InsertGovernmentScheme): Promise<GovernmentScheme> {
    const id = randomUUID();
    const scheme: GovernmentScheme = {
      id,
      name: insertScheme.name,
      description: insertScheme.description,
      eligibility: insertScheme.eligibility,
      benefits: insertScheme.benefits,
      applicationProcess: insertScheme.applicationProcess,
      documents: insertScheme.documents || null,
      state: insertScheme.state || null,
      category: insertScheme.category,
      language: insertScheme.language || null,
      isActive: 1,
      createdAt: new Date()
    };
    this.governmentSchemes.set(id, scheme);
    return scheme;
  }
}

export const storage = new MemStorage();

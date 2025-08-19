import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  preferredLanguage: text("preferred_language").default("en"),
  location: text("location"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const chatMessages = pgTable("chat_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  message: text("message").notNull(),
  response: text("response"),
  messageType: text("message_type").notNull(), // 'text', 'voice', 'image'
  language: text("language").default("en"),
  category: text("category"), // 'crop', 'weather', 'pest', 'scheme'
  metadata: jsonb("metadata"), // Additional data like image urls, voice data
  createdAt: timestamp("created_at").defaultNow(),
});

export const agriculturalAdvice = pgTable("agricultural_advice", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  category: text("category").notNull(), // 'crop', 'fertilizer', 'pest', 'disease'
  subcategory: text("subcategory"), // specific crop, pest name, etc
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  region: text("region"), // 'north', 'south', 'east', 'west', 'all'
  season: text("season"), // 'kharif', 'rabi', 'zaid', 'all'
  language: text("language").default("en"),
  tags: text("tags").array(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const weatherData = pgTable("weather_data", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  location: text("location").notNull(),
  date: timestamp("date").notNull(),
  temperature: integer("temperature"),
  humidity: integer("humidity"),
  rainfall: integer("rainfall"),
  windSpeed: integer("wind_speed"),
  forecast: jsonb("forecast"), // 7-day forecast data
  advisories: text("advisories").array(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const governmentSchemes = pgTable("government_schemes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  eligibility: text("eligibility").notNull(),
  benefits: text("benefits").notNull(),
  applicationProcess: text("application_process").notNull(),
  documents: text("documents").array(),
  state: text("state"), // specific state or 'all'
  category: text("category").notNull(), // 'subsidy', 'loan', 'insurance', 'technology'
  language: text("language").default("en"),
  isActive: integer("is_active").default(1), // 1 for true, 0 for false
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({
  id: true,
  createdAt: true,
});

export const insertAgriculturalAdviceSchema = createInsertSchema(agriculturalAdvice).omit({
  id: true,
  createdAt: true,
});

export const insertWeatherDataSchema = createInsertSchema(weatherData).omit({
  id: true,
  createdAt: true,
});

export const insertGovernmentSchemeSchema = createInsertSchema(governmentSchemes).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;

export type AgriculturalAdvice = typeof agriculturalAdvice.$inferSelect;
export type InsertAgriculturalAdvice = z.infer<typeof insertAgriculturalAdviceSchema>;

export type WeatherData = typeof weatherData.$inferSelect;
export type InsertWeatherData = z.infer<typeof insertWeatherDataSchema>;

export type GovernmentScheme = typeof governmentSchemes.$inferSelect;
export type InsertGovernmentScheme = z.infer<typeof insertGovernmentSchemeSchema>;

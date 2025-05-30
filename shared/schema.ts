import { pgTable, text, serial, integer, boolean, timestamp, jsonb, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const cards = pgTable("cards", {
  id: serial("id").primaryKey(),
  title: text("title").notNull().default("Modern Card"),
  description: text("description").notNull().default("Live preview with real-time updates"),
  bgGradientFrom: text("bg_gradient_from").notNull().default("#523091"),
  bgGradientTo: text("bg_gradient_to").notNull().default("#1a0b33"),
  bgOpacityFrom: text("bg_opacity_from").notNull().default("0.70"),
  bgOpacityTo: text("bg_opacity_to").notNull().default("0.14"),
  shadowColor: text("shadow_color").notNull().default("#7c3aed"),
  shadowOpacity: text("shadow_opacity").notNull().default("0.3"),
  enableHoverEffects: boolean("enable_hover_effects").notNull().default(true),
  enableAnimations: boolean("enable_animations").notNull().default(true),
  cardWidth: text("card_width").notNull().default("320"),
  cardHeight: text("card_height").notNull().default("200"),
  cardPadding: text("card_padding").notNull().default("24"),
  cardBorderRadius: jsonb("card_border_radius").$type<{
    topLeft: string;
    topRight: string;
    bottomLeft: string;
    bottomRight: string;
    unit: string;
  }>().notNull().default({
    topLeft: "16",
    topRight: "16",
    bottomLeft: "16",
    bottomRight: "16",
    unit: "px",
  }),
  cardOpacity: integer("card_opacity").notNull().default(100),
  shadowSettings: jsonb("shadow_settings").$type<{
    inset: boolean;
    x: string;
    y: string;
    blur: string;
    spread: string;
  }>().notNull().default({
    inset: false,
    x: "0",
    y: "30",
    blur: "50",
    spread: "0",
  }),
  shadow2Settings: jsonb("shadow2_settings").$type<{
    inset: boolean;
    x: string;
    y: string;
    blur: string;
    spread: string;
    color: string;
    opacity: string;
  } | null>().default(null),
  titleFont: text("title_font").default("Inter"),
  titleSize: integer("title_size").default(18),
  titleWeight: text("title_weight").default("600"),
  titleAlign: text("title_align").default("left"),
  descriptionFont: text("description_font").default("Inter"),
  descriptionSize: integer("description_size").default(14),
  descriptionWeight: text("description_weight").default("400"),
  descriptionAlign: text("description_align").default("left"),
  rotation: real("rotation").default(0),
  scaleX: real("scale_x").default(1),
  scaleY: real("scale_y").default(1),
  blur: real("blur").default(0),
  brightness: real("brightness").default(100),
  contrast: real("contrast").default(100),
  saturation: real("saturation").default(100),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const templates = pgTable("templates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  tags: text("tags").array().notNull().default([]),
  preview: text("preview").notNull(),
  author: text("author").notNull(),
  downloads: integer("downloads").notNull().default(0),
  rating: real("rating").notNull().default(0),
  isPremium: boolean("is_premium").notNull().default(false),
  cardData: jsonb("card_data").$type<Record<string, any>>().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertCardSchema = createInsertSchema(cards).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTemplateSchema = createInsertSchema(templates).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertCard = z.infer<typeof insertCardSchema>;
export type Card = typeof cards.$inferSelect;
export type InsertTemplate = z.infer<typeof insertTemplateSchema>;
export type Template = typeof templates.$inferSelect;

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

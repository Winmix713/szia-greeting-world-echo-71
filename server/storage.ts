import { users, cards, templates, type User, type InsertUser, type Card, type InsertCard, type Template, type InsertTemplate } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Card methods
  getCard(id: number): Promise<Card | undefined>;
  getAllCards(): Promise<Card[]>;
  createCard(card: InsertCard): Promise<Card>;
  updateCard(id: number, card: Partial<InsertCard>): Promise<Card | undefined>;
  deleteCard(id: number): Promise<boolean>;
  
  // Template methods
  getTemplate(id: number): Promise<Template | undefined>;
  getAllTemplates(): Promise<Template[]>;
  createTemplate(template: InsertTemplate): Promise<Template>;
  updateTemplate(id: number, template: Partial<InsertTemplate>): Promise<Template | undefined>;
  deleteTemplate(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private cards: Map<number, Card>;
  private templates: Map<number, Template>;
  private currentUserId: number;
  private currentCardId: number;
  private currentTemplateId: number;

  constructor() {
    this.users = new Map();
    this.cards = new Map();
    this.templates = new Map();
    this.currentUserId = 1;
    this.currentCardId = 1;
    this.currentTemplateId = 1;
    this.initializeTemplates();
  }

  private initializeTemplates() {
    const defaultTemplates: InsertTemplate[] = [
      {
        name: "Modern Business",
        category: "Business",
        description: "Clean and professional design perfect for corporate presentations",
        tags: ["professional", "clean", "corporate", "minimal"],
        preview: "business",
        author: "Design Studio",
        downloads: 1250,
        rating: 4.8,
        isPremium: false,
        cardData: {
          title: "John Anderson",
          description: "Senior Product Manager",
          bgGradientFrom: "#667eea",
          bgGradientTo: "#764ba2",
          bgOpacityFrom: "0.9",
          bgOpacityTo: "0.7",
          cardWidth: "350",
          cardHeight: "200",
          cardBorderRadius: {
            topLeft: "12",
            topRight: "12",
            bottomLeft: "12",
            bottomRight: "12",
            unit: "px",
          },
          shadowSettings: {
            inset: false,
            x: "0",
            y: "8",
            blur: "25",
            spread: "0",
          },
          shadowColor: "#667eea",
          shadowOpacity: "0.3",
        },
      },
      {
        name: "Social Media",
        category: "Social Media",
        description: "Eye-catching gradient design for social media posts",
        tags: ["social", "gradient", "colorful", "engaging"],
        preview: "social",
        author: "Creative Team",
        downloads: 2100,
        rating: 4.9,
        isPremium: false,
        cardData: {
          title: "Follow Us Today!",
          description: "Join our community for daily inspiration",
          bgGradientFrom: "#ff6b6b",
          bgGradientTo: "#feca57",
          bgOpacityFrom: "1",
          bgOpacityTo: "0.8",
          cardWidth: "400",
          cardHeight: "400",
          cardBorderRadius: {
            topLeft: "20",
            topRight: "20",
            bottomLeft: "20",
            bottomRight: "20",
            unit: "px",
          },
          shadowSettings: {
            inset: false,
            x: "0",
            y: "15",
            blur: "35",
            spread: "0",
          },
          shadowColor: "#ff6b6b",
          shadowOpacity: "0.4",
        },
      },
    ];

    defaultTemplates.forEach((template) => {
      this.createTemplate(template);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getCard(id: number): Promise<Card | undefined> {
    return this.cards.get(id);
  }

  async getAllCards(): Promise<Card[]> {
    return Array.from(this.cards.values());
  }

  async createCard(insertCard: InsertCard): Promise<Card> {
    const id = this.currentCardId++;
    const now = new Date();
    const card: Card = {
      ...insertCard,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.cards.set(id, card);
    return card;
  }

  async updateCard(id: number, updates: Partial<InsertCard>): Promise<Card | undefined> {
    const card = this.cards.get(id);
    if (!card) return undefined;

    const updatedCard: Card = {
      ...card,
      ...updates,
      updatedAt: new Date(),
    };
    this.cards.set(id, updatedCard);
    return updatedCard;
  }

  async deleteCard(id: number): Promise<boolean> {
    return this.cards.delete(id);
  }

  async getTemplate(id: number): Promise<Template | undefined> {
    return this.templates.get(id);
  }

  async getAllTemplates(): Promise<Template[]> {
    return Array.from(this.templates.values());
  }

  async createTemplate(insertTemplate: InsertTemplate): Promise<Template> {
    const id = this.currentTemplateId++;
    const now = new Date();
    const template: Template = {
      ...insertTemplate,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.templates.set(id, template);
    return template;
  }

  async updateTemplate(id: number, updates: Partial<InsertTemplate>): Promise<Template | undefined> {
    const template = this.templates.get(id);
    if (!template) return undefined;

    const updatedTemplate: Template = {
      ...template,
      ...updates,
      updatedAt: new Date(),
    };
    this.templates.set(id, updatedTemplate);
    return updatedTemplate;
  }

  async deleteTemplate(id: number): Promise<boolean> {
    return this.templates.delete(id);
  }
}

export const storage = new MemStorage();

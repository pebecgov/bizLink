import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Phase 1: Identity & Users
  users: defineTable({
    clerkId: v.string(), // External identity link
    email: v.string(),
    role: v.union( // RBAC Role Map
      v.literal("admin"),
      v.literal("system_admin"),
      v.literal("regulator"),
      v.literal("business_owner"),
      v.literal("verification_officer"),
      v.literal("data_analyst"),
      v.literal("user")
    ),
    jurisdiction: v.optional(v.string()), // For scoping regulator access
    status: v.union(v.literal("active"), v.literal("suspended")),
  })
    .index("by_clerkId", ["clerkId"])
    .index("by_role", ["role"]),

  // Phase 0: Audit Logging
  audit_logs: defineTable({
    actorId: v.string(), // ClerkId or UserId
    action: v.string(),
    entityId: v.optional(v.string()), // The business or escrow ID
    previousState: v.optional(v.string()),
    newState: v.optional(v.string()),
    metadata: v.any(),
    timestamp: v.number(), // Required for M&E reporting
  })
    .index("by_timestamp", ["timestamp"])
    .index("by_entityId", ["entityId"]),

  // Phase 1: Business Profile
  businesses: defineTable({
    // Core fields (required)
    ownerId: v.string(), // ClerkId or UserId
    businessName: v.string(),
    registrationNumber: v.string(), // CAC/NIN
    contactName: v.string(),
    contactPhone: v.string(),
    state: v.string(),
    lga: v.string(),
    sector: v.string(),
    subsector: v.string(),
    documents: v.array(v.object({
      type: v.string(),
      url: v.string(),
      status: v.string(), // "pending", "approved", "rejected"
    })),
    verificationStatus: v.string(), // "pending", "verified", "rejected"
    riskScore: v.optional(v.number()),

    // 1. Company Identity
    logoUrl: v.optional(v.string()),
    tradingName: v.optional(v.string()),
    companyTagline: v.optional(v.string()),
    companyDescription: v.optional(v.string()),
    companyType: v.optional(v.string()), // "Private Limited Company", etc.

    // 2. Business Classification
    secondarySectors: v.optional(v.array(v.string())),
    businessStage: v.optional(v.string()), // "Startup", "Growth", "Established"
    businessModel: v.optional(v.string()), // "B2B", "B2C", "B2G"
    targetMarket: v.optional(v.string()), // "Local", "Regional", "Pan-African"
    afcftaCompliant: v.optional(v.boolean()),
    operatingCountries: v.optional(v.array(v.string())),

    // 3. Registration & Legal (extended)
    tinNumber: v.optional(v.string()),
    cacRegistrationDate: v.optional(v.string()),
    yearEstablished: v.optional(v.number()),

    // User self-verification tracking
    cacVerified: v.optional(v.boolean()),        // User verified CAC number
    cacVerifiedAt: v.optional(v.number()),       // Timestamp when verified
    tinVerified: v.optional(v.boolean()),        // User verified TIN number  
    tinVerifiedAt: v.optional(v.number()),       // Timestamp when verified

    // 4. Location & Contact
    primaryEmail: v.optional(v.string()),
    website: v.optional(v.string()),
    headOfficeAddress: v.optional(v.object({
      street: v.string(),
      city: v.string(),
      state: v.string(),
      country: v.string(),
      postalCode: v.optional(v.string()),
      lga: v.optional(v.string()),
    })),
    socialMedia: v.optional(v.object({
      linkedin: v.optional(v.string()),
      twitter: v.optional(v.string()),
      facebook: v.optional(v.string()),
      instagram: v.optional(v.string()),
      tiktok: v.optional(v.string()),
    })),
    branches: v.optional(v.array(v.object({
      name: v.string(),
      address: v.string(),
      phone: v.optional(v.string()),
      isPrimary: v.optional(v.boolean()),
    }))),

    // 5. Financials
    numberOfEmployees: v.optional(v.string()), // "1-10", "11-50", etc.
    annualRevenue: v.optional(v.string()), // "₦1M-₦10M", etc.

    // 6. Products & Services
    productsServices: v.optional(v.array(v.object({
      name: v.string(),
      description: v.optional(v.string()),
      category: v.optional(v.string()),
    }))),

    // 7. Team & Management
    teamMembers: v.optional(v.array(v.object({
      name: v.string(),
      position: v.string(),
      bio: v.optional(v.string()),
      linkedIn: v.optional(v.string()),
    }))),

    // 8. Mission & Vision
    missionStatement: v.optional(v.string()),
    visionStatement: v.optional(v.string()),

    // 9. Media Gallery
    imageGallery: v.optional(v.array(v.string())), // URLs
    videoGallery: v.optional(v.array(v.string())), // URLs

    // 11. Market & Competition
    targetCustomers: v.optional(v.string()),
    marketSize: v.optional(v.string()),
    competitors: v.optional(v.array(v.string())),
    competitiveAdvantage: v.optional(v.string()),

    // 12. Certifications & Awards
    certifications: v.optional(v.array(v.object({
      name: v.string(),
      issuer: v.string(),
      date: v.optional(v.string()),
    }))),
    awards: v.optional(v.array(v.object({
      title: v.string(),
      issuer: v.string(),
      year: v.optional(v.number()),
    }))),

    // 13. Sustainability
    sustainabilityInitiatives: v.optional(v.array(v.string())),
    esgCompliance: v.optional(v.string()),

    // Metadata
    profileCompleteness: v.optional(v.number()), // 0-100%
    lastUpdated: v.optional(v.number()),
    plan: v.optional(v.union(v.literal("free"), v.literal("premium"))),
    seekingFunding: v.optional(v.boolean()),
    fundingAmount: v.optional(v.string()),
  })
    .index("by_ownerId", ["ownerId"])
    .index("by_status", ["verificationStatus"])
    .index("by_sector", ["sector", "subsector"]),

  conversations: defineTable({
    participantIds: v.array(v.string()), // Combined [userId1, userId2]
    lastMessageAt: v.number(),
    connectionId: v.optional(v.string()),
    connectionStatus: v.optional(v.string()),
  }),

  messages: defineTable({
    conversationId: v.id("conversations"),
    senderId: v.string(),
    content: v.string(),
    type: v.union(
      v.literal("text"),
      v.literal("system"),
      v.literal("milestone_proposal"),
      v.literal("document_request")
    ),
    metadata: v.optional(v.any()),
    createdAt: v.number(),
  })
    .index("by_conversationId", ["conversationId"]),



  notifications: defineTable({
    userId: v.string(), // Recipient ClerkId
    type: v.union(
      v.literal("message"),
      v.literal("system"),
      v.literal("milestone")
    ),
    title: v.string(),
    message: v.string(),
    link: v.optional(v.string()),
    isRead: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_user_read", ["userId", "isRead"]),

  profile_views: defineTable({
    businessId: v.id("businesses"),
    viewerId: v.optional(v.string()), // Optional for signed-out/anonymous views if allowed
    timestamp: v.number(),
  })
    .index("by_businessId", ["businessId"])
    .index("by_timestamp", ["timestamp"]),

  // Phase 3: Foreign Investor Onboarding & MDA Integration
  mdas: defineTable({
    name: v.string(),
    acronym: v.string(),
    description: v.optional(v.string()),
    sectors: v.array(v.string()), // Sectors this MDA is relevant for
    services: v.array(v.object({
      name: v.string(),
      timeline: v.string(),
      requirements: v.string(),
      cost: v.string(),
      description: v.optional(v.string()),
    })),
    contactPerson: v.optional(v.object({
      name: v.string(),
      role: v.string(),
      email: v.optional(v.string()),
      phone: v.optional(v.string()),
    })),
  })
    .index("by_acronym", ["acronym"]),

  sector_requirements: defineTable({
    sector: v.string(),
    entityType: v.union(v.literal("local"), v.literal("foreign")),
    requirements: v.array(v.object({
      serviceName: v.string(),
      issuingMda: v.string(), // Acronym of the MDA
      description: v.string(),
      isRequired: v.boolean(),
      order: v.number(), // For sequencing the roadmap
    })),
  })
    .index("by_sector_type", ["sector", "entityType"]),

  // Legacy/Internal tables required for schema compliance
  investor_profiles: defineTable({
    userId: v.string(),
    registeredName: v.optional(v.string()),
    sectors: v.array(v.string()),
    regions: v.array(v.string()),
    capitalRange: v.string(),
    riskAppetite: v.string(),
    jurisdiction: v.optional(v.string()),
    bio: v.optional(v.string()),
    incorporationDocs: v.optional(v.array(v.string())),
    taxIdType: v.optional(v.string()),
    taxIdentificationNumber: v.optional(v.string()),
    taxIssuingCountry: v.optional(v.string()),
  }).index("by_userId", ["userId"]),

  matches: defineTable({
    investorId: v.string(),
    businessId: v.id("businesses"),
    score: v.number(),
    factors: v.object({
      sector: v.number(),
      location: v.number(),
      capital: v.number(),
      risk: v.number(),
      stage: v.number(),
    }),
    status: v.union(
      v.literal("new"),
      v.literal("viewed"),
      v.literal("contacted"),
      v.literal("dismissed")
    ),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  }).index("by_investor_business", ["investorId", "businessId"]),

  connections: defineTable({
    participantIds: v.optional(v.array(v.string())),
    status: v.string(),
    businessId: v.optional(v.id("businesses")),
    investorId: v.optional(v.string()),
    initiatedBy: v.optional(v.string()),
    lastActivity: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  }),

  milestones: defineTable({
    connectionId: v.id("connections"),
    title: v.string(),
    description: v.string(),
    deadline: v.number(),
    status: v.string(),
    requiresDocument: v.boolean(),
    documentType: v.optional(v.string()),
    documentStatus: v.optional(v.string()),
    templateUrl: v.optional(v.string()),
    documentUrl: v.optional(v.string()),
    proposedBy: v.string(),
    agreedBy: v.optional(v.string()),
    createdAt: v.optional(v.number()),
  }).index("by_connectionId", ["connectionId"]),

});



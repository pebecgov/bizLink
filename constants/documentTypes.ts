export interface DocumentRequirement {
    id: string;
    name: string;
    category: "core" | "sector_specific" | "additional";
    description: string;
    issuedBy: string;
    whyNeeded: string;
    uploadFormats: string[];
    verificationNotes?: string;
    weight: number; // For scoring
    subsectorSpecific?: string[]; // Array of subsector names if applicable
}

// ==================== CORE REQUIRED DOCUMENTS (All Businesses) ====================

export const CORE_DOCUMENTS: DocumentRequirement[] = [
    {
        id: "CAC_CERTIFICATE",
        name: "CAC Certificate of Incorporation",
        category: "core",
        weight: 10,
        description: "Official proof your business is legally registered in Nigeria",
        issuedBy: "Corporate Affairs Commission (CAC)",
        whyNeeded: "Confirms business legitimacy and legal existence",
        uploadFormats: ["PDF", "JPG", "PNG"],
        verificationNotes: "System checks CAC RC number matches company name",
    },
    {
        id: "MEMAT",
        name: "Memorandum and Articles of Association (MEMAT)",
        category: "core",
        weight: 5,
        description: "Company's constitution outlining ownership structure, shareholding, and operational rules",
        issuedBy: "Part of CAC registration documents",
        whyNeeded: "Shows who owns what, voting rights, and decision-making process",
        uploadFormats: ["PDF"],
        verificationNotes: "Should match details in CAC certificate",
    },
    {
        id: "FORM_CAC_1_1",
        name: "Form CAC 1.1 (Status Report)",
        category: "core",
        weight: 5,
        description: "Current snapshot of company information from CAC registry",
        issuedBy: "Corporate Affairs Commission (downloadable online)",
        whyNeeded: "Shows current directors, shareholders, registered address, share capital",
        uploadFormats: ["PDF"],
        verificationNotes: "Must be recent (within last 6 months recommended)",
    },
    {
        id: "TIN_CERTIFICATE",
        name: "Tax Identification Number (TIN) Certificate",
        category: "core",
        weight: 10,
        description: "Unique tax ID assigned to your business",
        issuedBy: "Federal Inland Revenue Service (FIRS)",
        whyNeeded: "Required for all legal business operations and tax compliance",
        uploadFormats: ["PDF", "JPG", "PNG"],
        verificationNotes: "System validates TIN format",
    },
    {
        id: "TAX_CLEARANCE",
        name: "Tax Clearance Certificate",
        category: "core",
        weight: 10,
        description: "Proof business has filed tax returns and settled tax obligations",
        issuedBy: "Federal Inland Revenue Service (FIRS) or State Internal Revenue Service",
        whyNeeded: "Demonstrates financial compliance and no outstanding tax liabilities",
        uploadFormats: ["PDF"],
        verificationNotes: "Must be current (valid for 12 months from issue date). If business is new (less than 1 year), can upload evidence of tax registration instead",
    },
    {
        id: "BUSINESS_PLAN",
        name: "Business Plan / Pitch Deck",
        category: "core",
        weight: 10,
        description: "Document outlining business model, market opportunity, financials, and growth strategy",
        issuedBy: "Business owner/founders",
        whyNeeded: "Understand the business vision, revenue model, and investment opportunity",
        uploadFormats: ["PDF", "PPT", "PPTX"],
        verificationNotes: "Recommended sections: Executive Summary, Problem & Solution, Market Analysis, Business Model, Financial Projections, Team, Funding Requirements, Use of Funds",
    },
    {
        id: "FINANCIAL_STATEMENTS",
        name: "Financial Statements",
        category: "core",
        weight: 10,
        description: "Audited or management accounts showing business financial performance (Income Statement, Balance Sheet, Cash Flow Statement)",
        issuedBy: "Auditors or internal finance team",
        whyNeeded: "Assess financial health, revenue, profitability, and growth trends",
        uploadFormats: ["PDF", "XLSX"],
        verificationNotes: "Established businesses (2+ years): Last 2 years audited financials preferred. New businesses (under 2 years): Management accounts or financial projections acceptable. Startups (pre-revenue): Financial projections mandatory",
    },
    {
        id: "BOARD_RESOLUTION",
        name: "Board Resolution for Fundraising",
        category: "core",
        weight: 5,
        description: "Official authorization from board of directors to seek investment",
        issuedBy: "Company board/directors",
        whyNeeded: "Legal proof that fundraising is authorized by company leadership",
        uploadFormats: ["PDF"],
        verificationNotes: "Must include: Resolution date, Authorization to raise funds, Amount/range being raised, Terms of engagement, Signatory authorization, Company seal (if applicable)",
    },
];

// ==================== SUBSECTOR-SPECIFIC DOCUMENTS ====================

export const SUBSECTOR_SPECIFIC_DOCUMENTS: Record<string, DocumentRequirement[]> = {
    // ========== INFORMATION, TECHNOLOGY & COMMUNICATION ==========

    "Wired Telecommunications": [
        {
            id: "NCC_LICENSE",
            name: "NCC Operating License",
            category: "sector_specific",
            weight: 15,
            description: "License for telecommunications operations",
            issuedBy: "Nigerian Communications Commission (NCC)",
            whyNeeded: "Required for telecom operators",
            uploadFormats: ["PDF"],
        },
        {
            id: "SPECTRUM_LICENSE",
            name: "Spectrum License",
            category: "sector_specific",
            weight: 15,
            description: "License to use radio frequency spectrum",
            issuedBy: "Nigerian Communications Commission (NCC)",
            whyNeeded: "Required if using wireless spectrum",
            uploadFormats: ["PDF"],
        },
    ],

    "Wireless Telecommunications (GSM Operators)": [
        {
            id: "NCC_LICENSE",
            name: "NCC Operating License",
            category: "sector_specific",
            weight: 10,
            description: "License for GSM operations",
            issuedBy: "Nigerian Communications Commission (NCC)",
            whyNeeded: "Required for telecom operators",
            uploadFormats: ["PDF"],
        },
        {
            id: "SPECTRUM_LICENSE",
            name: "Spectrum License",
            category: "sector_specific",
            weight: 10,
            description: "License to use radio frequency spectrum",
            issuedBy: "Nigerian Communications Commission (NCC)",
            whyNeeded: "Required for wireless operations",
            uploadFormats: ["PDF"],
        },
        {
            id: "INTERCONNECT_AGREEMENT",
            name: "Interconnect Agreements",
            category: "sector_specific",
            weight: 10,
            description: "Agreements with other network operators",
            issuedBy: "Network operators",
            whyNeeded: "Required for network interconnection",
            uploadFormats: ["PDF"],
        },
    ],

    "Internet Service Providers": [
        {
            id: "NCC_ISP_LICENSE",
            name: "NCC ISP License",
            category: "sector_specific",
            weight: 30,
            description: "License to provide internet services",
            issuedBy: "Nigerian Communications Commission (NCC)",
            whyNeeded: "Required for ISP operations",
            uploadFormats: ["PDF"],
        },
    ],

    "Radio Broadcasting": [
        {
            id: "NBC_LICENSE",
            name: "NBC Broadcasting License",
            category: "sector_specific",
            weight: 15,
            description: "License to operate radio station",
            issuedBy: "National Broadcasting Commission (NBC)",
            whyNeeded: "Required for broadcasting",
            uploadFormats: ["PDF"],
        },
        {
            id: "FREQUENCY_ALLOCATION",
            name: "Frequency Allocation Certificate",
            category: "sector_specific",
            weight: 15,
            description: "Allocated radio frequency",
            issuedBy: "National Broadcasting Commission (NBC)",
            whyNeeded: "Required for radio transmission",
            uploadFormats: ["PDF"],
        },
    ],

    "Television Broadcasting": [
        {
            id: "NBC_LICENSE",
            name: "NBC Broadcasting License",
            category: "sector_specific",
            weight: 15,
            description: "License to operate TV station",
            issuedBy: "National Broadcasting Commission (NBC)",
            whyNeeded: "Required for broadcasting",
            uploadFormats: ["PDF"],
        },
        {
            id: "FREQUENCY_ALLOCATION",
            name: "Frequency Allocation Certificate",
            category: "sector_specific",
            weight: 15,
            description: "Allocated TV frequency",
            issuedBy: "National Broadcasting Commission (NBC)",
            whyNeeded: "Required for TV transmission",
            uploadFormats: ["PDF"],
        },
    ],

    "Motion Picture & Video Production": [
        {
            id: "CENSORS_BOARD_CERTIFICATE",
            name: "National Film & Video Censors Board Certificate",
            category: "sector_specific",
            weight: 30,
            description: "Certificate for film production",
            issuedBy: "National Film & Video Censors Board",
            whyNeeded: "Required for film/video production",
            uploadFormats: ["PDF"],
        },
    ],

    // Software Development, IT Consulting, Web Hosting, etc. have NO required documents
    // They will get full 30% sector score automatically

    // ========== FINANCIAL & INSURANCE ACTIVITIES ==========

    "Commercial Banks": [
        {
            id: "CBN_BANKING_LICENSE",
            name: "CBN Banking License",
            category: "sector_specific",
            weight: 15,
            description: "License to operate as a commercial bank",
            issuedBy: "Central Bank of Nigeria (CBN)",
            whyNeeded: "Required for banking operations",
            uploadFormats: ["PDF"],
        },
        {
            id: "NDIC_CERTIFICATE",
            name: "NDIC Certificate",
            category: "sector_specific",
            weight: 15,
            description: "Nigeria Deposit Insurance Corporation certificate",
            issuedBy: "Nigeria Deposit Insurance Corporation (NDIC)",
            whyNeeded: "Required for deposit insurance",
            uploadFormats: ["PDF"],
        },
    ],

    "Microfinance Banks": [
        {
            id: "CBN_MICROFINANCE_LICENSE",
            name: "CBN Microfinance License",
            category: "sector_specific",
            weight: 15,
            description: "License to operate as microfinance bank",
            issuedBy: "Central Bank of Nigeria (CBN)",
            whyNeeded: "Required for microfinance operations",
            uploadFormats: ["PDF"],
        },
        {
            id: "NDIC_CERTIFICATE",
            name: "NDIC Certificate",
            category: "sector_specific",
            weight: 15,
            description: "Nigeria Deposit Insurance Corporation certificate",
            issuedBy: "Nigeria Deposit Insurance Corporation (NDIC)",
            whyNeeded: "Required for deposit insurance",
            uploadFormats: ["PDF"],
        },
    ],

    "Payment Processing Services": [
        {
            id: "CBN_PSP_LICENSE",
            name: "CBN Payment Service Provider License",
            category: "sector_specific",
            weight: 30,
            description: "License for payment processing",
            issuedBy: "Central Bank of Nigeria (CBN)",
            whyNeeded: "Required for payment services",
            uploadFormats: ["PDF"],
        },
    ],

    "Fintech Services": [
        {
            id: "CBN_FINTECH_LICENSE",
            name: "CBN Fintech License",
            category: "sector_specific",
            weight: 30,
            description: "License for fintech operations",
            issuedBy: "Central Bank of Nigeria (CBN)",
            whyNeeded: "Required for fintech services",
            uploadFormats: ["PDF"],
        },
    ],

    "Investment Banks": [
        {
            id: "SEC_REGISTRATION",
            name: "SEC Registration Certificate",
            category: "sector_specific",
            weight: 15,
            description: "Securities and Exchange Commission registration",
            issuedBy: "Securities and Exchange Commission (SEC)",
            whyNeeded: "Required for investment banking",
            uploadFormats: ["PDF"],
        },
        {
            id: "CBN_INVESTMENT_LICENSE",
            name: "CBN Investment Banking License",
            category: "sector_specific",
            weight: 15,
            description: "Investment banking license",
            issuedBy: "Central Bank of Nigeria (CBN)",
            whyNeeded: "Required for investment banking operations",
            uploadFormats: ["PDF"],
        },
    ],

    "Life Insurance": [
        {
            id: "NAICOM_LIFE_LICENSE",
            name: "NAICOM Life Insurance License",
            category: "sector_specific",
            weight: 30,
            description: "License for life insurance",
            issuedBy: "National Insurance Commission (NAICOM)",
            whyNeeded: "Required for life insurance operations",
            uploadFormats: ["PDF"],
        },
    ],

    "Health Insurance": [
        {
            id: "NHIA_REGISTRATION",
            name: "NHIA Registration",
            category: "sector_specific",
            weight: 15,
            description: "National Health Insurance Authority registration",
            issuedBy: "National Health Insurance Authority (NHIA)",
            whyNeeded: "Required for health insurance",
            uploadFormats: ["PDF"],
        },
        {
            id: "NAICOM_LICENSE",
            name: "NAICOM License",
            category: "sector_specific",
            weight: 15,
            description: "Insurance license",
            issuedBy: "National Insurance Commission (NAICOM)",
            whyNeeded: "Required for insurance operations",
            uploadFormats: ["PDF"],
        },
    ],

    // ========== MANUFACTURING ==========

    "Pharmaceutical Manufacturing": [
        {
            id: "NAFDAC_GMP",
            name: "NAFDAC GMP Certificate",
            category: "sector_specific",
            weight: 10,
            description: "Good Manufacturing Practice certificate",
            issuedBy: "National Agency for Food and Drug Administration and Control (NAFDAC)",
            whyNeeded: "Required for pharmaceutical production",
            uploadFormats: ["PDF"],
        },
        {
            id: "NAFDAC_PRODUCT_REG",
            name: "NAFDAC Product Registration",
            category: "sector_specific",
            weight: 10,
            description: "Product registration for pharmaceuticals",
            issuedBy: "NAFDAC",
            whyNeeded: "Required for each product",
            uploadFormats: ["PDF"],
        },
        {
            id: "PCN_MANUFACTURING_LICENSE",
            name: "PCN Manufacturing License",
            category: "sector_specific",
            weight: 10,
            description: "Pharmacists Council manufacturing license",
            issuedBy: "Pharmacists Council of Nigeria (PCN)",
            whyNeeded: "Required for pharmaceutical manufacturing",
            uploadFormats: ["PDF"],
        },
    ],

    "Brewery": [
        {
            id: "NAFDAC_REGISTRATION",
            name: "NAFDAC Registration",
            category: "sector_specific",
            weight: 10,
            description: "Product registration with NAFDAC",
            issuedBy: "NAFDAC",
            whyNeeded: "Required for food/beverage products",
            uploadFormats: ["PDF"],
        },
        {
            id: "SON_CERTIFICATION",
            name: "SON Certification",
            category: "sector_specific",
            weight: 10,
            description: "Standards Organization certification",
            issuedBy: "Standards Organization of Nigeria (SON)",
            whyNeeded: "Product quality certification",
            uploadFormats: ["PDF"],
        },
        {
            id: "EXCISE_LICENSE",
            name: "Excise License",
            category: "sector_specific",
            weight: 10,
            description: "License for alcohol production",
            issuedBy: "Federal Inland Revenue Service (FIRS)",
            whyNeeded: "Required for alcohol manufacturing",
            uploadFormats: ["PDF"],
        },
    ],

    "Bottled Water Manufacturing": [
        {
            id: "NAFDAC_REGISTRATION",
            name: "NAFDAC Registration",
            category: "sector_specific",
            weight: 15,
            description: "Product registration with NAFDAC",
            issuedBy: "NAFDAC",
            whyNeeded: "Required for bottled water",
            uploadFormats: ["PDF"],
        },
        {
            id: "SON_CERTIFICATION",
            name: "SON Certification",
            category: "sector_specific",
            weight: 15,
            description: "Standards Organization certification",
            issuedBy: "SON",
            whyNeeded: "Water quality standards",
            uploadFormats: ["PDF"],
        },
    ],

    // ========== HUMAN HEALTH & SOCIAL WORK ==========

    "Hospitals": [
        {
            id: "MEDICAL_FACILITY_LICENSE",
            name: "Medical Facility License",
            category: "sector_specific",
            weight: 10,
            description: "License to operate medical facility",
            issuedBy: "State Ministry of Health",
            whyNeeded: "Legal requirement for healthcare facilities",
            uploadFormats: ["PDF"],
        },
        {
            id: "MDCN_REGISTRATION",
            name: "MDCN Registration",
            category: "sector_specific",
            weight: 10,
            description: "Medical and Dental Council registration for doctors",
            issuedBy: "Medical and Dental Council of Nigeria (MDCN)",
            whyNeeded: "Required for practicing doctors",
            uploadFormats: ["PDF"],
        },
        {
            id: "FIRE_SAFETY_CERTIFICATE",
            name: "Fire Safety Certificate",
            category: "sector_specific",
            weight: 10,
            description: "Fire safety compliance certificate",
            issuedBy: "Federal/State Fire Service",
            whyNeeded: "Safety requirement for hospitals",
            uploadFormats: ["PDF"],
        },
    ],

    "Pharmacies": [
        {
            id: "PCN_RETAIL_LICENSE",
            name: "PCN Retail Pharmacy License",
            category: "sector_specific",
            weight: 10,
            description: "License to operate retail pharmacy",
            issuedBy: "Pharmacists Council of Nigeria (PCN)",
            whyNeeded: "Required for pharmacy operations",
            uploadFormats: ["PDF"],
        },
        {
            id: "PREMISES_LICENSE",
            name: "Premises License",
            category: "sector_specific",
            weight: 10,
            description: "License for pharmacy premises",
            issuedBy: "Pharmacists Council of Nigeria (PCN)",
            whyNeeded: "Required for pharmacy location",
            uploadFormats: ["PDF"],
        },
        {
            id: "SUPERINTENDENT_LICENSE",
            name: "Superintendent Pharmacist License",
            category: "sector_specific",
            weight: 10,
            description: "License for supervising pharmacist",
            issuedBy: "PCN",
            whyNeeded: "Required to manage pharmacy",
            uploadFormats: ["PDF"],
        },
    ],

    "Diagnostic Laboratories": [
        {
            id: "LABORATORY_LICENSE",
            name: "Laboratory License",
            category: "sector_specific",
            weight: 15,
            description: "License to operate diagnostic lab",
            issuedBy: "State Ministry of Health",
            whyNeeded: "Required for laboratory operations",
            uploadFormats: ["PDF"],
        },
        {
            id: "MLSCN_REGISTRATION",
            name: "MLSCN Registration",
            category: "sector_specific",
            weight: 15,
            description: "Medical Laboratory Science Council registration",
            issuedBy: "Medical Laboratory Science Council of Nigeria (MLSCN)",
            whyNeeded: "Required for lab scientists",
            uploadFormats: ["PDF"],
        },
    ],

    // ========== EDUCATION ==========

    "Universities": [
        {
            id: "NUC_ACCREDITATION",
            name: "NUC Accreditation",
            category: "sector_specific",
            weight: 15,
            description: "National Universities Commission accreditation",
            issuedBy: "National Universities Commission (NUC)",
            whyNeeded: "Required for university operations",
            uploadFormats: ["PDF"],
        },
        {
            id: "MINISTRY_APPROVAL",
            name: "Ministry of Education Approval",
            category: "sector_specific",
            weight: 15,
            description: "Approval to operate educational institution",
            issuedBy: "Federal Ministry of Education",
            whyNeeded: "Legal requirement for universities",
            uploadFormats: ["PDF"],
        },
    ],

    "Polytechnics": [
        {
            id: "NBTE_ACCREDITATION",
            name: "NBTE Accreditation",
            category: "sector_specific",
            weight: 15,
            description: "National Board for Technical Education accreditation",
            issuedBy: "National Board for Technical Education (NBTE)",
            whyNeeded: "Required for polytechnic operations",
            uploadFormats: ["PDF"],
        },
        {
            id: "MINISTRY_APPROVAL",
            name: "Ministry of Education Approval",
            category: "sector_specific",
            weight: 15,
            description: "Approval to operate educational institution",
            issuedBy: "Ministry of Education",
            whyNeeded: "Legal requirement for polytechnics",
            uploadFormats: ["PDF"],
        },
    ],

    "Primary Schools": [
        {
            id: "STATE_MINISTRY_APPROVAL",
            name: "State Ministry of Education Approval",
            category: "sector_specific",
            weight: 15,
            description: "Approval to operate school",
            issuedBy: "State Ministry of Education",
            whyNeeded: "Legal requirement for schools",
            uploadFormats: ["PDF"],
        },
        {
            id: "SCHOOL_REGISTRATION",
            name: "School Registration Certificate",
            category: "sector_specific",
            weight: 15,
            description: "School registration",
            issuedBy: "State Ministry of Education",
            whyNeeded: "Required for school operations",
            uploadFormats: ["PDF"],
        },
    ],

    "Secondary Schools": [
        {
            id: "STATE_MINISTRY_APPROVAL",
            name: "State Ministry of Education Approval",
            category: "sector_specific",
            weight: 15,
            description: "Approval to operate school",
            issuedBy: "State Ministry of Education",
            whyNeeded: "Legal requirement for schools",
            uploadFormats: ["PDF"],
        },
        {
            id: "SCHOOL_REGISTRATION",
            name: "School Registration Certificate",
            category: "sector_specific",
            weight: 15,
            description: "School registration",
            issuedBy: "State Ministry of Education",
            whyNeeded: "Required for school operations",
            uploadFormats: ["PDF"],
        },
    ],
};

// ==================== ADDITIONAL SUPPORTING DOCUMENTS ====================

export const ADDITIONAL_DOCUMENTS: DocumentRequirement[] = [
    {
        id: "CERTIFICATE_OF_OCCUPANCY",
        name: "Certificate of Occupancy (C of O)",
        category: "additional",
        weight: 2,
        description: "Proof of property ownership",
        issuedBy: "State Government",
        whyNeeded: "Shows ownership of business premises",
        uploadFormats: ["PDF"],
    },
    {
        id: "IP_REGISTRATION",
        name: "Intellectual Property Registration",
        category: "additional",
        weight: 2,
        description: "Trademarks, patents registration",
        issuedBy: "Trademarks, Patents and Designs Registry",
        whyNeeded: "Protects intellectual property",
        uploadFormats: ["PDF"],
    },
    {
        id: "INSURANCE_POLICY",
        name: "Insurance Policies",
        category: "additional",
        weight: 1,
        description: "Business insurance coverage",
        issuedBy: "Insurance companies",
        whyNeeded: "Risk management",
        uploadFormats: ["PDF"],
    },
    {
        id: "BANK_REFERENCE",
        name: "Bank Reference Letter",
        category: "additional",
        weight: 1,
        description: "Reference from banking institution",
        issuedBy: "Commercial bank",
        whyNeeded: "Financial credibility",
        uploadFormats: ["PDF"],
    },
    {
        id: "AUDITOR_REPORT",
        name: "Auditor's Report",
        category: "additional",
        weight: 2,
        description: "Independent auditor's opinion on financial statements",
        issuedBy: "Certified auditing firm",
        whyNeeded: "Enhanced financial credibility",
        uploadFormats: ["PDF"],
    },
    {
        id: "QUALITY_CERTIFICATES",
        name: "Quality Management Certificates (ISO, etc.)",
        category: "additional",
        weight: 1,
        description: "International quality certifications",
        issuedBy: "Certifying bodies",
        whyNeeded: "Quality assurance",
        uploadFormats: ["PDF"],
    },
    {
        id: "DIRECTORS_IDS",
        name: "Directors' Valid IDs",
        category: "additional",
        weight: 2,
        description: "Government-issued ID cards of company directors",
        issuedBy: "Government (NIMC, Immigration, FRSC)",
        whyNeeded: "Identity verification of key management",
        uploadFormats: ["PDF", "JPG", "PNG"],
    },
    {
        id: "MARKET_RESEARCH",
        name: "Market Research / Feasibility Study",
        category: "additional",
        weight: 1,
        description: "Research report on target market and competition",
        issuedBy: "Business Owner / Consultant",
        whyNeeded: "Demonstrates market understanding",
        uploadFormats: ["PDF"],
    },
];

// ==================== HELPER FUNCTIONS ====================

/**
 * Get required documents for a specific subsector
 */
export function getRequiredDocumentsForSubsector(subsector: string): DocumentRequirement[] {
    return SUBSECTOR_SPECIFIC_DOCUMENTS[subsector] || [];
}

/**
 * Get all document requirements for a business
 */
export function getAllDocumentRequirements(subsector: string): {
    core: DocumentRequirement[];
    sectorSpecific: DocumentRequirement[];
    additional: DocumentRequirement[];
} {
    return {
        core: CORE_DOCUMENTS,
        sectorSpecific: getRequiredDocumentsForSubsector(subsector),
        additional: ADDITIONAL_DOCUMENTS,
    };
}

/**
 * Calculate total possible weight for a subsector
 */
export function getTotalPossibleWeight(subsector: string): number {
    const core = CORE_DOCUMENTS.reduce((sum, doc) => sum + doc.weight, 0);
    const sectorDocs = getRequiredDocumentsForSubsector(subsector);
    const sectorWeight = sectorDocs.reduce((sum, doc) => sum + doc.weight, 0);
    const additional = ADDITIONAL_DOCUMENTS.reduce((sum, doc) => sum + doc.weight, 0);

    return core + sectorWeight + additional;
}

import { mutation, query } from "./_generated/server";

export const listTestBusinesses = query({
    args: {},
    handler: async (ctx) => {
        const businesses = await ctx.db.query("businesses").collect();
        return businesses.filter(b => b.ownerId.startsWith("test_owner_"));
    },
});

// Seed function to create test businesses for matching
export const seedTestBusinesses = mutation({
    args: {},
    handler: async (ctx) => {
        const testBusinesses = [
            {
                ownerId: "test_owner_1",
                businessName: "TechStart Lagos",
                registrationNumber: "RC123456",
                contactName: "Adebayo Johnson",
                contactPhone: "+234 801 234 5678",
                state: "Lagos",
                lga: "Victoria Island",
                sector: "Digital Economy & Technology",
                subsector: "Software Development",
                documents: [],
                verificationStatus: "verified",
                companyDescription: "A leading fintech startup revolutionizing mobile payments across West Africa. We process over 1 million transactions monthly.",
                businessStage: "Growth",
                numberOfEmployees: "11-50",
                annualRevenue: "₦50M-₦100M",
            },
            {
                ownerId: "test_owner_2",
                businessName: "AgroVest Farms",
                registrationNumber: "RC234567",
                contactName: "Ngozi Okonkwo",
                contactPhone: "+234 802 345 6789",
                state: "Kaduna",
                lga: "Zaria",
                sector: "Agriculture, Forestry & Fishing",
                subsector: "Grain Farming (Rice, Maize, Wheat, Sorghum)",
                documents: [],
                verificationStatus: "verified",
                companyDescription: "Commercial rice farming and processing. We supply to major supermarkets and export to neighboring countries.",
                businessStage: "Established",
                numberOfEmployees: "51-100",
                annualRevenue: "₦100M-₦500M",
            },
            {
                ownerId: "test_owner_3",
                businessName: "CleanEnergy Nigeria",
                registrationNumber: "RC345678",
                contactName: "Ibrahim Musa",
                contactPhone: "+234 803 456 7890",
                state: "Abuja",
                lga: "Central Area",
                sector: "Renewable Energy & Environmental Services",
                subsector: "Solar Energy Systems",
                documents: [],
                verificationStatus: "verified",
                companyDescription: "Solar panel installation and maintenance for residential and commercial properties. Over 500 installations completed.",
                businessStage: "Growth",
                numberOfEmployees: "11-50",
                annualRevenue: "₦20M-₦50M",
            },
            {
                ownerId: "test_owner_4",
                businessName: "HealthPlus Clinics",
                registrationNumber: "RC456789",
                contactName: "Dr. Amina Bello",
                contactPhone: "+234 804 567 8901",
                state: "Kano",
                lga: "Kano Municipal",
                sector: "Human Health & Social Work",
                subsector: "General Medical Clinics",
                documents: [],
                verificationStatus: "verified",
                companyDescription: "Chain of affordable healthcare clinics providing quality primary care services in Northern Nigeria.",
                businessStage: "Established",
                numberOfEmployees: "101-500",
                annualRevenue: "₦500M+",
            },
            {
                ownerId: "test_owner_5",
                businessName: "EduTech Academy",
                registrationNumber: "RC567890",
                contactName: "Chukwuma Eze",
                contactPhone: "+234 805 678 9012",
                state: "Enugu",
                lga: "Enugu North",
                sector: "Education",
                subsector: "Online Education Platforms",
                documents: [],
                verificationStatus: "pending",
                companyDescription: "E-learning platform for secondary school students preparing for WAEC and JAMB examinations.",
                businessStage: "Startup",
                numberOfEmployees: "1-10",
                annualRevenue: "₦1M-₦10M",
            },
            {
                ownerId: "test_owner_6",
                businessName: "Oyo Logistics Hub",
                registrationNumber: "RC678901",
                contactName: "Taiwo Adeyemi",
                contactPhone: "+234 806 789 0123",
                state: "Oyo",
                lga: "Ibadan North",
                sector: "Transportation & Storage",
                subsector: "Freight Trucking",
                documents: [],
                verificationStatus: "verified",
                companyDescription: "Interstate logistics and freight company with a fleet of 50+ trucks covering the South-West region.",
                businessStage: "Established",
                numberOfEmployees: "51-100",
                annualRevenue: "₦100M-₦500M",
            },
            {
                ownerId: "test_owner_7",
                businessName: "Fashion Forward",
                registrationNumber: "RC789012",
                contactName: "Fatima Abubakar",
                contactPhone: "+234 807 890 1234",
                state: "Lagos",
                lga: "Ikeja",
                sector: "Manufacturing",
                subsector: "Apparel Manufacturing",
                documents: [],
                verificationStatus: "verified",
                companyDescription: "Nigerian fashion brand producing ready-to-wear clothing with African-inspired designs for export.",
                businessStage: "Growth",
                numberOfEmployees: "11-50",
                annualRevenue: "₦20M-₦50M",
            },
            {
                ownerId: "test_owner_8",
                businessName: "BuildRight Construction",
                registrationNumber: "RC890123",
                contactName: "Emeka Okoro",
                contactPhone: "+234 808 901 2345",
                state: "Rivers",
                lga: "Port Harcourt",
                sector: "Construction",
                subsector: "Residential Building Construction",
                documents: [],
                verificationStatus: "verified",
                companyDescription: "Residential and commercial construction company with 15+ years experience in the Niger Delta region.",
                businessStage: "Established",
                numberOfEmployees: "101-500",
                annualRevenue: "₦500M+",
            },
            {
                ownerId: "test_owner_9",
                businessName: "MediaWave Studios",
                registrationNumber: "RC901234",
                contactName: "Yinka Badmus",
                contactPhone: "+234 809 012 3456",
                state: "Lagos",
                lga: "Surulere",
                sector: "Creative & Media Industries",
                subsector: "Content Creation",
                documents: [],
                verificationStatus: "verified",
                companyDescription: "Digital content production studio creating viral social media content and brand videos for top Nigerian companies.",
                businessStage: "Growth",
                numberOfEmployees: "11-50",
                annualRevenue: "₦10M-₦20M",
            },
            {
                ownerId: "test_owner_10",
                businessName: "QuickMart Stores",
                registrationNumber: "RC012345",
                contactName: "Blessing Udo",
                contactPhone: "+234 810 123 4567",
                state: "Anambra",
                lga: "Onitsha North",
                sector: "Wholesale & Retail Trade",
                subsector: "Supermarkets & Grocery Stores",
                documents: [],
                verificationStatus: "verified",
                companyDescription: "Modern supermarket chain in South-East Nigeria with 5 locations and plans to expand.",
                businessStage: "Growth",
                numberOfEmployees: "51-100",
                annualRevenue: "₦100M-₦500M",
            },

        ];

        const insertedIds = [];
        for (const business of testBusinesses) {
            const id = await ctx.db.insert("businesses", business);
            insertedIds.push(id);
        }

        return {
            success: true,
            message: `Created ${insertedIds.length} test businesses`,
            ids: insertedIds
        };
    },
});

// Clean up test businesses
export const clearTestBusinesses = mutation({
    args: {},
    handler: async (ctx) => {
        // Collect all businesses and filter manually for test owners
        const allBusinesses = await ctx.db.query("businesses").collect();
        const toDelete = allBusinesses.filter(b => b.ownerId.startsWith("test_owner_"));

        for (const business of toDelete) {
            await ctx.db.delete(business._id);
        }

        return {
            success: true,
            message: `Deleted ${toDelete.length} test businesses`
        };
    },
});

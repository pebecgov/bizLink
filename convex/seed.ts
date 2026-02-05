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
        const testBusinesses: any[] = [
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
                logoUrl: "https://images.unsplash.com/photo-1551288049-bbbda536639a?w=128&q=80",
                companyTagline: "Building the future of finance in Africa",
                companyDescription: "A leading fintech startup revolutionizing mobile payments across West Africa. We process over 1 million transactions monthly with a focus on ease of use and security.",
                businessStage: "Growth",
                numberOfEmployees: "11-50",
                annualRevenue: "₦50M-₦100M",
                plan: "premium",
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
                logoUrl: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=128&q=80",
                companyTagline: "Sustainable farming for a brighter future",
                companyDescription: "Commercial rice farming and processing. We supply to major supermarkets and export to neighboring countries, ensuring food security in the region.",
                businessStage: "Established",
                numberOfEmployees: "51-100",
                annualRevenue: "₦100M-₦500M",
                plan: "free",
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
                logoUrl: "https://images.unsplash.com/photo-1509391366360-fe5bb58583bb?w=128&q=80",
                companyTagline: "Powering Nigeria with sunshine",
                companyDescription: "Solar panel installation and maintenance for residential and commercial properties. Over 500 installations completed with a 98% satisfaction rate.",
                businessStage: "Growth",
                numberOfEmployees: "11-50",
                annualRevenue: "₦20M-₦50M",
                plan: "premium",
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
                logoUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=128&q=80",
                companyTagline: "Your health, our priority",
                companyDescription: "Chain of affordable healthcare clinics providing quality primary care services in Northern Nigeria. We use modern equipment and patient-first care.",
                businessStage: "Established",
                numberOfEmployees: "101-500",
                annualRevenue: "₦500M+",
                plan: "free",
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
                verificationStatus: "verified",
                logoUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=128&q=80",
                companyTagline: "Learning without limits",
                companyDescription: "E-learning platform for secondary school students preparing for WAEC and JAMB examinations. We offer interactive lessons and mock exams.",
                businessStage: "Startup",
                numberOfEmployees: "1-10",
                annualRevenue: "₦1M-₦10M",
                plan: "premium",
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
                logoUrl: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=128&q=80",
                companyTagline: "Fast and reliable logistics across Nigeria",
                companyDescription: "Interstate logistics and freight company with a fleet of 50+ trucks covering the South-West region with GPS tracking and safety first.",
                businessStage: "Established",
                numberOfEmployees: "51-100",
                annualRevenue: "₦100M-₦500M",
                plan: "free",
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
                logoUrl: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=128&q=80",
                companyTagline: "Authentic African style for the world",
                companyDescription: "Nigerian fashion brand producing ready-to-wear clothing with African-inspired designs for export and premium local boutiques.",
                businessStage: "Growth",
                numberOfEmployees: "11-50",
                annualRevenue: "₦20M-₦50M",
                plan: "premium",
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
                logoUrl: "https://images.unsplash.com/photo-1503387762-592dea58ef23?w=128&q=80",
                companyTagline: "Solid foundations for your dreams",
                companyDescription: "Residential and commercial construction company with 15+ years experience in the Niger Delta region, specializing in eco-friendly building.",
                businessStage: "Established",
                numberOfEmployees: "101-500",
                annualRevenue: "₦500M+",
                plan: "free",
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
                logoUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=128&q=80",
                companyTagline: "Creative storytelling for modern brands",
                companyDescription: "Digital content production studio creating viral social media content and brand videos for top Nigerian companies and international agencies.",
                businessStage: "Growth",
                numberOfEmployees: "11-50",
                annualRevenue: "₦10M-₦20M",
                plan: "premium",
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
                logoUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=128&q=80",
                companyTagline: "Quality goods at your doorstep",
                companyDescription: "Modern supermarket chain in South-East Nigeria with 5 locations and plans to expand to 20 locations by 2027.",
                businessStage: "Growth",
                numberOfEmployees: "51-100",
                annualRevenue: "₦100M-₦500M",
                plan: "free",
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

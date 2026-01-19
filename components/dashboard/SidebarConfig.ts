import {
    Home, Globe, Building, Handshake, Users, Settings, DollarSign, BarChart,
    Shield, Link, FileText, Bell, Award, CheckCircle, Briefcase, MessageSquare,
    FileCheck, Calendar, TrendingUp, AlertCircle, HeadphonesIcon, Database,
    Activity, Key, Webhook, Bug, CreditCard, Repeat, Wallet, FileBarChart,
    Search, Lock, Receipt, Boxes, Zap, BookOpen, LogOut
} from "lucide-react";

export interface SidebarSubItem {
    label: string;
    path: string;
}

export interface SidebarItem {
    icon: any;
    label: string;
    path?: string;
    subItems?: SidebarSubItem[];
}

export interface RoleConfig {
    role: string;
    items: SidebarItem[];
}

const commonItems: SidebarItem[] = [
    {
        icon: Bell,
        label: "Notifications",
        path: "/dashboard/notifications"
    },
    {
        icon: MessageSquare,
        label: "Messages",
        path: "/dashboard/messages"
    },
    {
        icon: HeadphonesIcon,
        label: "Help & Support",
        subItems: [
            { label: "Help Center", path: "/dashboard/help" },
            { label: "FAQs", path: "/dashboard/faqs" },
            { label: "Contact Support", path: "/dashboard/support" },
            { label: "Submit Feedback", path: "/dashboard/feedback" }
        ]
    },
    {
        icon: Settings,
        label: "Settings",
        subItems: [
            { label: "My Profile", path: "/dashboard/profile" },
            { label: "Account Settings", path: "/dashboard/settings/account" },
            { label: "Notification Preferences", path: "/dashboard/settings/notifications" },
            { label: "Privacy Settings", path: "/dashboard/settings/privacy" },
            { label: "Security (2FA)", path: "/dashboard/settings/security" },
            { label: "Language Preferences", path: "/dashboard/settings/language" }
        ]
    },
    {
        icon: LogOut,
        label: "Logout",
        path: "/logout"
    }
];

export const roleConfigs: RoleConfig[] = [
    {
        role: "SUPER ADMIN",
        items: [
            { icon: Home, label: "Dashboard", path: "/dashboard" },
            {
                icon: Globe,
                label: "Continental Overview",
                subItems: [
                    { label: "Global Map View", path: "/dashboard/continental/map" },
                    { label: "Country Performance", path: "/dashboard/continental/performance" },
                    { label: "Regional Analytics", path: "/dashboard/continental/analytics" },
                    { label: "Cross-Border Activity", path: "/dashboard/continental/cross-border" }
                ]
            },
            {
                icon: Building,
                label: "Country Management",
                subItems: [
                    { label: "Country Onboarding", path: "/dashboard/countries/onboarding" },
                    { label: "Pending Approvals", path: "/dashboard/countries/approvals" },
                    { label: "Active Countries", path: "/dashboard/countries/active" },
                    { label: "Integration Status", path: "/dashboard/countries/integration" }
                ]
            },
            {
                icon: Handshake,
                label: "Institutional Partnerships",
                subItems: [
                    { label: "Active Partners", path: "/dashboard/partnerships/active" },
                    { label: "Partner Agreements", path: "/dashboard/partnerships/agreements" },
                    { label: "Integration Dashboard", path: "/dashboard/partnerships/integration" },
                    { label: "Partnership Requests", path: "/dashboard/partnerships/requests" }
                ]
            },
            {
                icon: Users,
                label: "User Management",
                subItems: [
                    { label: "All Users", path: "/dashboard/users/all" },
                    { label: "Role Management", path: "/dashboard/users/roles" },
                    { label: "Suspended Accounts", path: "/dashboard/users/suspended" },
                    { label: "User Activity Logs", path: "/dashboard/users/logs" }
                ]
            },
            {
                icon: CheckCircle,
                label: "Verification Management",
                subItems: [
                    // { label: "Verification Queue", path: "/dashboard/verification/queue" },
                    { label: "Pending Verifications Document", path: "/dashboard/verification/pending" },
                    // { label: "In Progress", path: "/dashboard/verification/progress" },
                    { label: "Approved Businesses Document", path: "/dashboard/verification/approved" },
                    // { label: "Rejected Applications", path: "/dashboard/verification/rejected" },
                    // { label: "Re-verification Queue", path: "/dashboard/verification/requeue" },
                    // { label: "Verification Analytics", path: "/dashboard/verification/analytics" },
                    // { label: "Document Review", path: "/dashboard/verification/documents" }
                ]
            },
            {
                icon: Settings,
                label: "System Configuration",
                subItems: [
                    { label: "Global Settings", path: "/dashboard/system/settings" },
                    { label: "Security Policies", path: "/dashboard/system/security" },
                    { label: "API Configuration", path: "/dashboard/system/api" },
                    { label: "Feature Flags", path: "/dashboard/system/features" },
                    { label: "System Parameters", path: "/dashboard/system/parameters" }
                ]
            },
            {
                icon: DollarSign,
                label: "Revenue & Monetization",
                subItems: [
                    { label: "Pricing Tiers", path: "/dashboard/revenue/pricing" },
                    { label: "Revenue Analytics", path: "/dashboard/revenue/analytics" },
                    { label: "Subscription Management", path: "/dashboard/revenue/subscriptions" },
                    { label: "Monetization Rules", path: "/dashboard/revenue/rules" }
                ]
            },
            {
                icon: BarChart,
                label: "Analytics & KPIs",
                subItems: [
                    { label: "National KPIs", path: "/dashboard/analytics/national" },
                    { label: "Continental KPIs", path: "/dashboard/analytics/continental" },
                    { label: "Performance Metrics", path: "/dashboard/analytics/performance" },
                    { label: "Investment Analytics", path: "/dashboard/analytics/investment" },
                    { label: "Custom Reports", path: "/dashboard/analytics/reports" }
                ]
            },
            {
                icon: Shield,
                label: "Security & Compliance",
                subItems: [
                    { label: "Security Dashboard", path: "/dashboard/security/dashboard" },
                    { label: "Incident Management", path: "/dashboard/security/incidents" },
                    { label: "Compliance Status", path: "/dashboard/security/compliance" },
                    { label: "Escalated Issues", path: "/dashboard/security/escalations" }
                ]
            },
            {
                icon: Link,
                label: "Integrations",
                subItems: [
                    { label: "FIRS Integration", path: "/dashboard/integrations/firs" },
                    { label: "National Registries", path: "/dashboard/integrations/registries" },
                    { label: "AfCFTA Systems", path: "/dashboard/integrations/afcfta" },
                    { label: "Payment Gateways", path: "/dashboard/integrations/payments" },
                    { label: "DFI Connections", path: "/dashboard/integrations/dfi" }
                ]
            },
            {
                icon: FileText,
                label: "Audit & Logs",
                subItems: [
                    { label: "System Audit Logs", path: "/dashboard/audit/system" },
                    { label: "User Activity Logs", path: "/dashboard/audit/users" },
                    { label: "Transaction Logs", path: "/dashboard/audit/transactions" },
                    { label: "Compliance Reports", path: "/dashboard/audit/compliance" }
                ]
            },
            {
                icon: Activity,
                label: "System Health",
                subItems: [
                    { label: "Uptime Monitor", path: "/dashboard/health/uptime" },
                    { label: "Performance Metrics", path: "/dashboard/health/performance" },
                    { label: "API Health", path: "/dashboard/health/api" },
                    { label: "Server Status", path: "/dashboard/health/servers" }
                ]
            },
            {
                icon: BookOpen,
                label: "Resources",
                subItems: [
                    { label: "Documentation", path: "/dashboard/resources/docs" },
                    { label: "Policy Documents", path: "/dashboard/resources/policies" },
                    { label: "Training Materials", path: "/dashboard/resources/training" }
                ]
            },
            ...commonItems
        ]
    },
    {
        role: "SYSTEM ADMIN",
        items: [
            { icon: Home, label: "Dashboard", path: "/dashboard" },
            {
                icon: Users,
                label: "User Management",
                subItems: [
                    { label: "All Users", path: "/dashboard/users/all" },
                    { label: "Pending Activations", path: "/dashboard/users/pending" },
                    { label: "Active Users", path: "/dashboard/users/active" },
                    { label: "Suspended Users", path: "/dashboard/users/suspended" },
                    { label: "User Roles", path: "/dashboard/users/roles" },
                    { label: "Bulk Actions", path: "/dashboard/users/bulk" }
                ]
            },
            {
                icon: CheckCircle,
                label: "Verification Management",
                subItems: [
                    { label: "Verification Queue", path: "/dashboard/verification/queue" },
                    { label: "Pending Verifications", path: "/dashboard/verification/pending" },
                    { label: "In Progress", path: "/dashboard/verification/progress" },
                    { label: "Approved Businesses", path: "/dashboard/verification/approved" },
                    { label: "Rejected Applications", path: "/dashboard/verification/rejected" },
                    { label: "Re-verification Queue", path: "/dashboard/verification/requeue" },
                    { label: "Verification Analytics", path: "/dashboard/verification/analytics" },
                    { label: "Document Review", path: "/dashboard/verification/documents" }
                ]
            },
            {
                icon: Building,
                label: "Business Management",
                subItems: [
                    { label: "All Businesses", path: "/dashboard/businesses/all" },
                    { label: "Verified Businesses", path: "/dashboard/businesses/verified" },
                    { label: "Pending Verification", path: "/dashboard/businesses/pending" },
                    { label: "Flagged Profiles", path: "/dashboard/businesses/flagged" },
                    { label: "Business Categories", path: "/dashboard/businesses/categories" }
                ]
            },
            {
                icon: Briefcase,
                label: "Investor Management",
                subItems: [
                    { label: "All Investors", path: "/dashboard/investors/all" },
                    { label: "Active Investors", path: "/dashboard/investors/active" },
                    { label: "KYC Status", path: "/dashboard/investors/kyc" },
                    { label: "Investment Activity", path: "/dashboard/investors/activity" }
                ]
            },
            {
                icon: Shield,
                label: "Content Moderation",
                subItems: [
                    { label: "Flagged Content", path: "/dashboard/moderation/flagged" },
                    { label: "Reported Listings", path: "/dashboard/moderation/reported" },
                    { label: "Fraudulent Alerts", path: "/dashboard/moderation/fraud" },
                    { label: "Content Review Queue", path: "/dashboard/moderation/queue" }
                ]
            },
            {
                icon: Link,
                label: "API & Integrations",
                subItems: [
                    { label: "API Health Monitor", path: "/dashboard/api/health" },
                    { label: "FIRS Integration", path: "/dashboard/api/firs" },
                    { label: "Registry Connections", path: "/dashboard/api/registry" },
                    { label: "Payment Gateway Status", path: "/dashboard/api/payments" },
                    { label: "Integration Logs", path: "/dashboard/api/logs" }
                ]
            },
            {
                icon: BarChart,
                label: "System Analytics",
                subItems: [
                    { label: "Platform Statistics", path: "/dashboard/analytics/platform" },
                    { label: "User Activity", path: "/dashboard/analytics/activity" },
                    { label: "Performance Metrics", path: "/dashboard/analytics/performance" },
                    { label: "Growth Trends", path: "/dashboard/analytics/trends" }
                ]
            },
            {
                icon: HeadphonesIcon,
                label: "Support Management",
                subItems: [
                    { label: "Support Tickets", path: "/dashboard/support/tickets" },
                    { label: "Escalated Issues", path: "/dashboard/support/escalated" },
                    { label: "Ticket Analytics", path: "/dashboard/support/analytics" }
                ]
            },
            {
                icon: FileText,
                label: "Compliance & Audit",
                subItems: [
                    { label: "Audit Logs", path: "/dashboard/compliance/logs" },
                    { label: "Compliance Reports", path: "/dashboard/compliance/reports" },
                    { label: "Data Access Logs", path: "/dashboard/compliance/access" },
                    { label: "Security Events", path: "/dashboard/compliance/events" }
                ]
            },
            {
                icon: Settings,
                label: "System Configuration",
                subItems: [
                    { label: "Platform Settings", path: "/dashboard/config/platform" },
                    { label: "Email Templates", path: "/dashboard/config/emails" },
                    { label: "Notification Settings", path: "/dashboard/config/notifications" },
                    { label: "Feature Management", path: "/dashboard/config/features" }
                ]
            },
            {
                icon: BookOpen,
                label: "Resources",
                subItems: [
                    { label: "Admin Documentation", path: "/dashboard/resources/admin" },
                    { label: "User Guides", path: "/dashboard/resources/guides" },
                    { label: "Best Practices", path: "/dashboard/resources/practices" }
                ]
            },
            ...commonItems
        ]
    },
    {
        role: "BUSINESS USER",
        items: [
            { icon: Home, label: "Dashboard", path: "/dashboard" },
            {
                icon: Building,
                label: "My Business Profile",
                subItems: [
                    { label: "Company Overview", path: "/dashboard/business/overview" },
                    { label: "Edit Profile", path: "/dashboard/business/edit" },
                    { label: "Compliance & Documentation", path: "/dashboard/business/documents" },
                    { label: "Verification Status", path: "/dashboard/business/verification" },
                    { label: "Credibility Score", path: "/dashboard/business/score" }
                ]
            },
            {
                icon: Award,
                label: "Investor Matching",
                subItems: [
                    { label: "Recommended Investors", path: "/dashboard/matching/recommended" },
                    { label: "Match Requests", path: "/dashboard/matching/requests" },
                    { label: "Saved Investors", path: "/dashboard/matching/saved" },
                    { label: "Match History", path: "/dashboard/matching/history" }
                ]
            },
            {
                icon: MessageSquare,
                label: "Messages & Networking",
                subItems: [
                    { label: "Inbox", path: "/dashboard/messages/inbox" },
                    { label: "Sent Messages", path: "/dashboard/messages/sent" },
                    { label: "Active Conversations", path: "/dashboard/messages/active" },
                    { label: "Archived Chats", path: "/dashboard/messages/archived" }
                ]
            },
            {
                icon: Handshake,
                label: "Deals & Contracts",
                subItems: [
                    { label: "Active Deals", path: "/dashboard/deals/active" },
                    { label: "Pending Contracts", path: "/dashboard/deals/pending" },
                    { label: "Signed Contracts", path: "/dashboard/deals/signed" },
                    { label: "Deal Pipeline", path: "/dashboard/deals/pipeline" },
                    { label: "Deal History", path: "/dashboard/deals/history" }
                ]
            },
            {
                icon: DollarSign,
                label: "Transactions",
                subItems: [
                    { label: "Transaction History", path: "/dashboard/transactions/history" },
                    { label: "Pending Payments", path: "/dashboard/transactions/pending" },
                    { label: "Payment Methods", path: "/dashboard/transactions/methods" },
                    { label: "Financial Reports", path: "/dashboard/transactions/reports" }
                ]
            },
            {
                icon: FileCheck,
                label: "Compliance Center",
                subItems: [
                    { label: "TIN Verification", path: "/dashboard/compliance/tin" },
                    { label: "Tax Compliance Status", path: "/dashboard/compliance/tax" },
                    { label: "Licenses & Permits", path: "/dashboard/compliance/licenses" },
                    { label: "Document Expiry Alerts", path: "/dashboard/compliance/expiry" },
                    { label: "Regulatory Requirements", path: "/dashboard/compliance/requirements" }
                ]
            },
            {
                icon: BarChart,
                label: "Business Analytics",
                subItems: [
                    { label: "Profile Views", path: "/dashboard/analytics/views" },
                    { label: "Investor Interest", path: "/dashboard/analytics/interest" },
                    { label: "Engagement Metrics", path: "/dashboard/analytics/engagement" },
                    { label: "Performance Reports", path: "/dashboard/analytics/reports" }
                ]
            },
            {
                icon: Calendar,
                label: "Events & Opportunities",
                subItems: [
                    { label: "Upcoming Events", path: "/dashboard/events/upcoming" },
                    { label: "Pitch Sessions", path: "/dashboard/events/pitch" },
                    { label: "Webinars", path: "/dashboard/events/webinars" },
                    { label: "Registered Events", path: "/dashboard/events/registered" },
                    { label: "Past Events", path: "/dashboard/events/past" }
                ]
            },
            {
                icon: Globe,
                label: "Market Intelligence",
                subItems: [
                    { label: "Industry Trends", path: "/dashboard/market/trends" },
                    { label: "Sector Reports", path: "/dashboard/market/reports" },
                    { label: "Economic Indicators", path: "/dashboard/market/indicators" },
                    { label: "Competitor Analysis", path: "/dashboard/market/competitors" }
                ]
            },
            {
                icon: BookOpen,
                label: "Resources & Support",
                subItems: [
                    { label: "Help Center", path: "/dashboard/resources/help" },
                    { label: "Video Tutorials", path: "/dashboard/resources/tutorials" },
                    { label: "FAQs", path: "/dashboard/resources/faqs" },
                    { label: "Contact Support", path: "/dashboard/resources/support" }
                ]
            },
            ...commonItems
        ]
    },
    {
        role: "INVESTOR USER",
        items: [
            { icon: Home, label: "Dashboard", path: "/dashboard" },
            {
                icon: Search,
                label: "Discover Opportunities",
                subItems: [
                    { label: "AI-Matched Businesses", path: "/dashboard/discover/matched" },
                    { label: "Browse All Businesses", path: "/dashboard/discover/browse" },
                    { label: "Advanced Search", path: "/dashboard/discover/search" },
                    { label: "Saved Searches", path: "/dashboard/discover/saved" },
                    { label: "Watchlist", path: "/dashboard/discover/watchlist" }
                ]
            },
            {
                icon: Briefcase,
                label: "My Investment Portfolio",
                subItems: [
                    { label: "Portfolio Overview", path: "/dashboard/portfolio/overview" },
                    { label: "Active Investments", path: "/dashboard/portfolio/active" },
                    { label: "Investment Performance", path: "/dashboard/portfolio/performance" },
                    { label: "Portfolio Analytics", path: "/dashboard/portfolio/analytics" },
                    { label: "Returns & ROI", path: "/dashboard/portfolio/roi" }
                ]
            },
            {
                icon: Award,
                label: "Investment Preferences",
                subItems: [
                    { label: "My Investment Profile", path: "/dashboard/preferences/profile" },
                    { label: "Sector Preferences", path: "/dashboard/preferences/sectors" },
                    { label: "Geographic Preferences", path: "/dashboard/preferences/geographic" },
                    { label: "Risk Appetite", path: "/dashboard/preferences/risk" },
                    { label: "Capital Range", path: "/dashboard/preferences/capital" }
                ]
            },
            {
                icon: MessageSquare,
                label: "Messages & Networking",
                subItems: [
                    { label: "Inbox", path: "/dashboard/messages/inbox" },
                    { label: "Active Conversations", path: "/dashboard/messages/active" },
                    { label: "Business Inquiries", path: "/dashboard/messages/inquiries" },
                    { label: "Archived Chats", path: "/dashboard/messages/archived" }
                ]
            },
            {
                icon: Handshake,
                label: "Deals & Contracts",
                subItems: [
                    { label: "Active Negotiations", path: "/dashboard/deals/negotiations" },
                    { label: "Pending Contracts", path: "/dashboard/deals/pending" },
                    { label: "Signed Contracts", path: "/dashboard/deals/signed" },
                    { label: "Deal Pipeline", path: "/dashboard/deals/pipeline" },
                    { label: "Deal History", path: "/dashboard/deals/history" }
                ]
            },
            {
                icon: DollarSign,
                label: "Financial Management",
                subItems: [
                    { label: "Escrow Account", path: "/dashboard/financial/escrow" },
                    { label: "Payment Methods", path: "/dashboard/financial/methods" },
                    { label: "Transaction History", path: "/dashboard/financial/transactions" },
                    { label: "Pending Transactions", path: "/dashboard/financial/pending" },
                    { label: "Financial Reports", path: "/dashboard/financial/reports" }
                ]
            },
            {
                icon: TrendingUp,
                label: "Market Intelligence",
                subItems: [
                    { label: "Sector Analysis", path: "/dashboard/market/sectors" },
                    { label: "Country Reports", path: "/dashboard/market/countries" },
                    { label: "Economic Indicators", path: "/dashboard/market/indicators" },
                    { label: "Trade Flow Analytics", path: "/dashboard/market/trade" },
                    { label: "Investment Trends", path: "/dashboard/market/trends" }
                ]
            },
            {
                icon: FileCheck,
                label: "Due Diligence Center",
                subItems: [
                    { label: "Business Verification Reports", path: "/dashboard/diligence/verification" },
                    { label: "Risk Assessment", path: "/dashboard/diligence/risk" },
                    { label: "Financial Analysis", path: "/dashboard/diligence/financial" },
                    { label: "Compliance Checks", path: "/dashboard/diligence/compliance" }
                ]
            },
            {
                icon: Calendar,
                label: "Events & Networking",
                subItems: [
                    { label: "Upcoming Events", path: "/dashboard/events/upcoming" },
                    { label: "Virtual Pitch Sessions", path: "/dashboard/events/pitch" },
                    { label: "Investment Forums", path: "/dashboard/events/forums" },
                    { label: "Registered Events", path: "/dashboard/events/registered" },
                    { label: "Past Events", path: "/dashboard/events/past" }
                ]
            },
            {
                icon: Boxes,
                label: "Saved & Bookmarked",
                subItems: [
                    { label: "Saved Businesses", path: "/dashboard/saved/businesses" },
                    { label: "Bookmarked Opportunities", path: "/dashboard/saved/opportunities" },
                    { label: "Favorite Sectors", path: "/dashboard/saved/sectors" }
                ]
            },
            {
                icon: BookOpen,
                label: "Resources & Support",
                subItems: [
                    { label: "Investment Guides", path: "/dashboard/resources/guides" },
                    { label: "Country Guides", path: "/dashboard/resources/countries" },
                    { label: "Help Center", path: "/dashboard/resources/help" },
                    { label: "Contact Support", path: "/dashboard/resources/support" }
                ]
            },
            ...commonItems
        ]
    },
    {
        role: "REGULATORY OFFICER",
        items: [
            { icon: Home, label: "Dashboard", path: "/dashboard" },
            {
                icon: CheckCircle,
                label: "Verification Queue",
                subItems: [
                    { label: "Pending Verifications", path: "/dashboard/verification/pending" },
                    { label: "In Progress", path: "/dashboard/verification/progress" },
                    { label: "Completed Verifications", path: "/dashboard/verification/completed" },
                    { label: "Rejected Applications", path: "/dashboard/verification/rejected" }
                ]
            },
            {
                icon: FileText,
                label: "Compliance Applications",
                subItems: [
                    { label: "License Applications", path: "/dashboard/compliance/licenses" },
                    { label: "Permit Requests", path: "/dashboard/compliance/permits" },
                    { label: "Registration Applications", path: "/dashboard/compliance/registrations" },
                    { label: "Pending Approvals", path: "/dashboard/compliance/pending" },
                    { label: "Application History", path: "/dashboard/compliance/history" }
                ]
            },
            {
                icon: Building,
                label: "Business Registry",
                subItems: [
                    { label: "Verified Businesses", path: "/dashboard/registry/verified" },
                    { label: "My Jurisdiction", path: "/dashboard/registry/jurisdiction" },
                    { label: "Business Search", path: "/dashboard/registry/search" },
                    { label: "Business Categories", path: "/dashboard/registry/categories" },
                    { label: "Risk Classifications", path: "/dashboard/registry/risk" }
                ]
            },
            {
                icon: BookOpen,
                label: "Regulatory Content",
                subItems: [
                    { label: "Manage Requirements", path: "/dashboard/regulatory/requirements" },
                    { label: "Publish Guidelines", path: "/dashboard/regulatory/guidelines" },
                    { label: "Update Procedures", path: "/dashboard/regulatory/procedures" },
                    { label: "Regulatory Reforms", path: "/dashboard/regulatory/reforms" },
                    { label: "Content Library", path: "/dashboard/regulatory/library" }
                ]
            },
            {
                icon: MessageSquare,
                label: "Inquiries & Support",
                subItems: [
                    { label: "Business Inquiries", path: "/dashboard/inquiries/business" },
                    { label: "Investor Inquiries", path: "/dashboard/inquiries/investor" },
                    { label: "Pending Responses", path: "/dashboard/inquiries/pending" },
                    { label: "Inquiry History", path: "/dashboard/inquiries/history" }
                ]
            },
            {
                icon: BarChart,
                label: "Compliance Analytics",
                subItems: [
                    { label: "Submission Trends", path: "/dashboard/analytics/submissions" },
                    { label: "Processing Metrics", path: "/dashboard/analytics/processing" },
                    { label: "Compliance Rates", path: "/dashboard/analytics/rates" },
                    { label: "Sector Analysis", path: "/dashboard/analytics/sectors" },
                    { label: "Performance Reports", path: "/dashboard/analytics/reports" }
                ]
            },
            {
                icon: AlertCircle,
                label: "Fraud & Risk Management",
                subItems: [
                    { label: "Flagged Profiles", path: "/dashboard/fraud/flagged" },
                    { label: "Investigation Cases", path: "/dashboard/fraud/investigations" },
                    { label: "Risk Alerts", path: "/dashboard/fraud/alerts" },
                    { label: "Fraud Reports", path: "/dashboard/fraud/reports" }
                ]
            },
            {
                icon: FileText,
                label: "Reports & Documentation",
                subItems: [
                    { label: "Generate Reports", path: "/dashboard/reports/generate" },
                    { label: "Compliance Reports", path: "/dashboard/reports/compliance" },
                    { label: "Audit Documents", path: "/dashboard/reports/audit" },
                    { label: "Statistical Reports", path: "/dashboard/reports/statistics" }
                ]
            },
            {
                icon: Link,
                label: "Inter-Agency Collaboration",
                subItems: [
                    { label: "Shared Cases", path: "/dashboard/collaboration/cases" },
                    { label: "Cross-Border Verifications", path: "/dashboard/collaboration/cross-border" },
                    { label: "Agency Communications", path: "/dashboard/collaboration/communications" }
                ]
            },
            {
                icon: BookOpen,
                label: "Resources",
                subItems: [
                    { label: "Regulatory Guidelines", path: "/dashboard/resources/guidelines" },
                    { label: "Training Materials", path: "/dashboard/resources/training" },
                    { label: "Help Center", path: "/dashboard/resources/help" }
                ]
            },
            ...commonItems
        ]
    },
    {
        role: "VERIFICATION OFFICER",
        items: [
            { icon: Home, label: "Dashboard", path: "/dashboard" },
            {
                icon: FileText,
                label: "Verification Queue",
                subItems: [
                    { label: "New Submissions", path: "/dashboard/queue/new" },
                    { label: "In Review", path: "/dashboard/queue/review" },
                    { label: "Pending Information", path: "/dashboard/queue/pending" },
                    { label: "Priority Cases", path: "/dashboard/queue/priority" },
                    { label: "Overdue Reviews", path: "/dashboard/queue/overdue" }
                ]
            },
            {
                icon: FileCheck,
                label: "Document Review",
                subItems: [
                    { label: "Documents Pending Review", path: "/dashboard/documents/pending" },
                    { label: "Legal Documents", path: "/dashboard/documents/legal" },
                    { label: "Financial Documents", path: "/dashboard/documents/financial" },
                    { label: "Tax Records", path: "/dashboard/documents/tax" },
                    { label: "Supporting Documents", path: "/dashboard/documents/supporting" }
                ]
            },
            {
                icon: AlertCircle,
                label: "Risk Assessment",
                subItems: [
                    { label: "Assign Risk Scores", path: "/dashboard/risk/assign" },
                    { label: "Risk Rating Dashboard", path: "/dashboard/risk/dashboard" },
                    { label: "High-Risk Profiles", path: "/dashboard/risk/high-risk" },
                    { label: "Risk Analysis Tools", path: "/dashboard/risk/tools" }
                ]
            },
            {
                icon: CheckCircle,
                label: "Verification Decisions",
                subItems: [
                    { label: "Approve Verifications", path: "/dashboard/decisions/approve" },
                    { label: "Reject Applications", path: "/dashboard/decisions/reject" },
                    { label: "Request More Info", path: "/dashboard/decisions/request-info" },
                    { label: "Conditional Approvals", path: "/dashboard/decisions/conditional" }
                ]
            },
            {
                icon: Shield,
                label: "Flagged Profiles",
                subItems: [
                    { label: "Suspicious Activities", path: "/dashboard/flagged/suspicious" },
                    { label: "Incomplete Submissions", path: "/dashboard/flagged/incomplete" },
                    { label: "Fraud Alerts", path: "/dashboard/flagged/fraud" },
                    { label: "Investigation Queue", path: "/dashboard/flagged/investigation" }
                ]
            },
            {
                icon: Search,
                label: "Data Verification Tools",
                subItems: [
                    { label: "Registry Lookup", path: "/dashboard/tools/registry" },
                    { label: "Chamber Verification", path: "/dashboard/tools/chamber" },
                    { label: "Financial Institution Check", path: "/dashboard/tools/financial" },
                    { label: "Tax Authority Verification", path: "/dashboard/tools/tax" },
                    { label: "GIS Location Validation", path: "/dashboard/tools/gis" }
                ]
            },
            {
                icon: BarChart,
                label: "Verification Analytics",
                subItems: [
                    { label: "My Performance Metrics", path: "/dashboard/analytics/performance" },
                    { label: "Verification Statistics", path: "/dashboard/analytics/statistics" },
                    { label: "Processing Time Analysis", path: "/dashboard/analytics/processing" },
                    { label: "Quality Scores", path: "/dashboard/analytics/quality" },
                    { label: "Team Performance", path: "/dashboard/analytics/team" }
                ]
            },
            {
                icon: FileText,
                label: "Audit Trail",
                subItems: [
                    { label: "My Verification History", path: "/dashboard/audit/history" },
                    { label: "Peer Reviews", path: "/dashboard/audit/peer" },
                    { label: "Decision Logs", path: "/dashboard/audit/decisions" },
                    { label: "Historical Data", path: "/dashboard/audit/data" }
                ]
            },
            {
                icon: Briefcase,
                label: "Case Management",
                subItems: [
                    { label: "Active Cases", path: "/dashboard/cases/active" },
                    { label: "Completed Cases", path: "/dashboard/cases/completed" },
                    { label: "Case Notes", path: "/dashboard/cases/notes" },
                    { label: "Case Assignments", path: "/dashboard/cases/assignments" }
                ]
            },
            {
                icon: BookOpen,
                label: "Resources",
                subItems: [
                    { label: "Verification Guidelines", path: "/dashboard/resources/guidelines" },
                    { label: "Best Practices", path: "/dashboard/resources/practices" },
                    { label: "Training Materials", path: "/dashboard/resources/training" },
                    { label: "Help Center", path: "/dashboard/resources/help" }
                ]
            },
            ...commonItems
        ]
    },
    {
        role: "DATA ANALYST",
        items: [
            { icon: Home, label: "Dashboard", path: "/dashboard" },
            {
                icon: Database,
                label: "Analytics Workspace",
                subItems: [
                    { label: "Custom Dashboards", path: "/dashboard/workspace/dashboards" },
                    { label: "My Reports", path: "/dashboard/workspace/reports" },
                    { label: "Saved Queries", path: "/dashboard/workspace/queries" },
                    { label: "Report Builder", path: "/dashboard/workspace/builder" }
                ]
            },
            {
                icon: Globe,
                label: "Trade Flow Analytics",
                subItems: [
                    { label: "Cross-Border Transactions", path: "/dashboard/trade/cross-border" },
                    { label: "Trade Routes", path: "/dashboard/trade/routes" },
                    { label: "Import/Export Analysis", path: "/dashboard/trade/import-export" },
                    { label: "Trade Volume Trends", path: "/dashboard/trade/volume" }
                ]
            },
            {
                icon: Briefcase,
                label: "Investment Analytics",
                subItems: [
                    { label: "Investment Flows", path: "/dashboard/investment/flows" },
                    { label: "Deal Analytics", path: "/dashboard/investment/deals" },
                    { label: "Investor Behavior", path: "/dashboard/investment/behavior" },
                    { label: "Sector Performance", path: "/dashboard/investment/sectors" },
                    { label: "Geographic Distribution", path: "/dashboard/investment/geographic" }
                ]
            },
            {
                icon: Building,
                label: "Business Intelligence",
                subItems: [
                    { label: "Business Growth Trends", path: "/dashboard/business/growth" },
                    { label: "Verification Rates", path: "/dashboard/business/verification" },
                    { label: "Industry Analysis", path: "/dashboard/business/industry" },
                    { label: "Business Demographics", path: "/dashboard/business/demographics" }
                ]
            },
            {
                icon: Globe,
                label: "Country & Regional Analysis",
                subItems: [
                    { label: "Country Comparisons", path: "/dashboard/regional/comparisons" },
                    { label: "Regional Performance", path: "/dashboard/regional/performance" },
                    { label: "Multi-Country Trends", path: "/dashboard/regional/trends" },
                    { label: "Continental Overview", path: "/dashboard/regional/continental" }
                ]
            },
            {
                icon: TrendingUp,
                label: "Economic Indicators",
                subItems: [
                    { label: "Macroeconomic Data", path: "/dashboard/economic/macro" },
                    { label: "Sector Indicators", path: "/dashboard/economic/sectors" },
                    { label: "Market Trends", path: "/dashboard/economic/trends" },
                    { label: "Economic Forecasts", path: "/dashboard/economic/forecasts" }
                ]
            },
            {
                icon: Award,
                label: "Policy Impact Analysis",
                subItems: [
                    { label: "Reform Impact Studies", path: "/dashboard/policy/reforms" },
                    { label: "Before/After Analysis", path: "/dashboard/policy/before-after" },
                    { label: "Policy Effectiveness", path: "/dashboard/policy/effectiveness" },
                    { label: "Regulatory Impact", path: "/dashboard/policy/regulatory" }
                ]
            },
            {
                icon: BarChart,
                label: "Performance Metrics",
                subItems: [
                    { label: "Platform KPIs", path: "/dashboard/metrics/kpis" },
                    { label: "User Engagement", path: "/dashboard/metrics/engagement" },
                    { label: "System Performance", path: "/dashboard/metrics/system" },
                    { label: "Growth Metrics", path: "/dashboard/metrics/growth" }
                ]
            },
            {
                icon: Database,
                label: "Data Management",
                subItems: [
                    { label: "Data Sources", path: "/dashboard/data/sources" },
                    { label: "Data Quality Checks", path: "/dashboard/data/quality" },
                    { label: "Data Export", path: "/dashboard/data/export" },
                    { label: "Raw Datasets", path: "/dashboard/data/raw" }
                ]
            },
            {
                icon: FileText,
                label: "Report Generation",
                subItems: [
                    { label: "Generate Reports", path: "/dashboard/reports/generate" },
                    { label: "Scheduled Reports", path: "/dashboard/reports/scheduled" },
                    { label: "Report Templates", path: "/dashboard/reports/templates" },
                    { label: "Report Library", path: "/dashboard/reports/library" }
                ]
            },
            {
                icon: BarChart,
                label: "Visualization Tools",
                subItems: [
                    { label: "Chart Builder", path: "/dashboard/viz/charts" },
                    { label: "Map Visualizations", path: "/dashboard/viz/maps" },
                    { label: "Interactive Dashboards", path: "/dashboard/viz/dashboards" },
                    { label: "Data Explorer", path: "/dashboard/viz/explorer" }
                ]
            },
            {
                icon: BookOpen,
                label: "Resources",
                subItems: [
                    { label: "Data Dictionary", path: "/dashboard/resources/dictionary" },
                    { label: "Analytics Guides", path: "/dashboard/resources/guides" },
                    { label: "Help Center", path: "/dashboard/resources/help" }
                ]
            },
            ...commonItems
        ]
    },
    {
        role: "CUSTOMER SUPPORT",
        items: [
            { icon: Home, label: "Dashboard", path: "/dashboard" },
            {
                icon: HeadphonesIcon,
                label: "Ticket Management",
                subItems: [
                    { label: "My Assigned Tickets", path: "/dashboard/tickets/assigned" },
                    { label: "Open Tickets", path: "/dashboard/tickets/open" },
                    { label: "Pending Tickets", path: "/dashboard/tickets/pending" },
                    { label: "Resolved Tickets", path: "/dashboard/tickets/resolved" },
                    { label: "Closed Tickets", path: "/dashboard/tickets/closed" }
                ]
            },
            {
                icon: FileText,
                label: "Ticket Queue",
                subItems: [
                    { label: "New Tickets", path: "/dashboard/queue/new" },
                    { label: "Critical Priority", path: "/dashboard/queue/critical" },
                    { label: "High Priority", path: "/dashboard/queue/high" },
                    { label: "Medium Priority", path: "/dashboard/queue/medium" },
                    { label: "Low Priority", path: "/dashboard/queue/low" }
                ]
            },
            {
                icon: AlertCircle,
                label: "Escalations",
                subItems: [
                    { label: "Escalated Issues", path: "/dashboard/escalations/issues" },
                    { label: "Regulatory Escalations", path: "/dashboard/escalations/regulatory" },
                    { label: "Technical Escalations", path: "/dashboard/escalations/technical" },
                    { label: "Management Escalations", path: "/dashboard/escalations/management" }
                ]
            },
            {
                icon: MessageSquare,
                label: "Live Chat",
                subItems: [
                    { label: "Active Chats", path: "/dashboard/chat/active" },
                    { label: "Queued Chats", path: "/dashboard/chat/queued" },
                    { label: "Chat History", path: "/dashboard/chat/history" }
                ]
            },
            {
                icon: Users,
                label: "User Support",
                subItems: [
                    { label: "User Lookup", path: "/dashboard/users/lookup" },
                    { label: "Account Issues", path: "/dashboard/users/account" },
                    { label: "Profile Assistance", path: "/dashboard/users/profile" },
                    { label: "Access Problems", path: "/dashboard/users/access" }
                ]
            },
            {
                icon: Shield,
                label: "Grievance & Disputes",
                subItems: [
                    { label: "Active Grievances", path: "/dashboard/grievances/active" },
                    { label: "Dispute Cases", path: "/dashboard/grievances/disputes" },
                    { label: "Resolution Tracking", path: "/dashboard/grievances/tracking" },
                    { label: "Closed Cases", path: "/dashboard/grievances/closed" }
                ]
            },
            {
                icon: BarChart,
                label: "Performance Metrics",
                subItems: [
                    { label: "My Performance", path: "/dashboard/metrics/performance" },
                    { label: "Response Time", path: "/dashboard/metrics/response" },
                    { label: "Resolution Time", path: "/dashboard/metrics/resolution" },
                    { label: "SLA Compliance", path: "/dashboard/metrics/sla" },
                    { label: "Customer Satisfaction", path: "/dashboard/metrics/satisfaction" }
                ]
            },
            {
                icon: BookOpen,
                label: "Knowledge Base",
                subItems: [
                    { label: "FAQs", path: "/dashboard/kb/faqs" },
                    { label: "Troubleshooting Guides", path: "/dashboard/kb/troubleshooting" },
                    { label: "User Manuals", path: "/dashboard/kb/manuals" },
                    { label: "Video Tutorials", path: "/dashboard/kb/videos" },
                    { label: "Best Practices", path: "/dashboard/kb/practices" }
                ]
            },
            {
                icon: Boxes,
                label: "Issue Categories",
                subItems: [
                    { label: "Technical Issues", path: "/dashboard/categories/technical" },
                    { label: "Account Issues", path: "/dashboard/categories/account" },
                    { label: "Payment Issues", path: "/dashboard/categories/payment" },
                    { label: "Verification Issues", path: "/dashboard/categories/verification" },
                    { label: "General Inquiries", path: "/dashboard/categories/general" }
                ]
            },
            {
                icon: TrendingUp,
                label: "Analytics",
                subItems: [
                    { label: "Ticket Statistics", path: "/dashboard/analytics/tickets" },
                    { label: "Common Issues", path: "/dashboard/analytics/common" },
                    { label: "Trending Problems", path: "/dashboard/analytics/trending" },
                    { label: "User Feedback", path: "/dashboard/analytics/feedback" }
                ]
            },
            {
                icon: BookOpen,
                label: "Resources",
                subItems: [
                    { label: "Support Guidelines", path: "/dashboard/resources/guidelines" },
                    { label: "Training Materials", path: "/dashboard/resources/training" },
                    { label: "Contact Supervisor", path: "/dashboard/resources/supervisor" }
                ]
            },
            ...commonItems
        ]
    },
    {
        role: "FINANCE ADMIN",
        items: [
            { icon: Home, label: "Dashboard", path: "/dashboard" },
            {
                icon: DollarSign,
                label: "Revenue Management",
                subItems: [
                    { label: "Revenue Overview", path: "/dashboard/revenue/overview" },
                    { label: "Daily Revenue", path: "/dashboard/revenue/daily" },
                    { label: "Monthly Revenue", path: "/dashboard/revenue/monthly" },
                    { label: "Revenue by Country", path: "/dashboard/revenue/country" },
                    { label: "Revenue Forecasts", path: "/dashboard/revenue/forecasts" }
                ]
            },
            {
                icon: CreditCard,
                label: "Subscription Management",
                subItems: [
                    { label: "Active Subscriptions", path: "/dashboard/subscriptions/active" },
                    { label: "Subscription Tiers", path: "/dashboard/subscriptions/tiers" },
                    { label: "Pricing Configuration", path: "/dashboard/subscriptions/pricing" },
                    { label: "Renewal Tracking", path: "/dashboard/subscriptions/renewals" },
                    { label: "Churn Analysis", path: "/dashboard/subscriptions/churn" }
                ]
            },
            {
                icon: Repeat,
                label: "Transaction Management",
                subItems: [
                    { label: "All Transactions", path: "/dashboard/transactions/all" },
                    { label: "Pending Transactions", path: "/dashboard/transactions/pending" },
                    { label: "Completed Transactions", path: "/dashboard/transactions/completed" },
                    { label: "Failed Transactions", path: "/dashboard/transactions/failed" },
                    { label: "Refunds & Reversals", path: "/dashboard/transactions/refunds" }
                ]
            },
            {
                icon: Wallet,
                label: "Escrow Management",
                subItems: [
                    { label: "Escrow Accounts", path: "/dashboard/escrow/accounts" },
                    { label: "Funds Held", path: "/dashboard/escrow/held" },
                    { label: "Pending Releases", path: "/dashboard/escrow/pending" },
                    { label: "Released Funds", path: "/dashboard/escrow/released" },
                    { label: "Escrow Disputes", path: "/dashboard/escrow/disputes" }
                ]
            },
            {
                icon: Repeat,
                label: "Payment Reconciliation",
                subItems: [
                    { label: "Reconciliation Dashboard", path: "/dashboard/reconciliation/dashboard" },
                    { label: "Matched Transactions", path: "/dashboard/reconciliation/matched" },
                    { label: "Unmatched Transactions", path: "/dashboard/reconciliation/unmatched" },
                    { label: "Discrepancies", path: "/dashboard/reconciliation/discrepancies" },
                    { label: "Reconciliation Reports", path: "/dashboard/reconciliation/reports" }
                ]
            },
            {
                icon: Globe,
                label: "Multi-Currency Management",
                subItems: [
                    { label: "Currency Overview", path: "/dashboard/currency/overview" },
                    { label: "Exchange Rates", path: "/dashboard/currency/rates" },
                    { label: "Currency Conversion", path: "/dashboard/currency/conversion" },
                    { label: "Currency Reports", path: "/dashboard/currency/reports" }
                ]
            },
            {
                icon: CreditCard,
                label: "Payment Gateway Management",
                subItems: [
                    { label: "Gateway Status", path: "/dashboard/gateway/status" },
                    { label: "Gateway Configuration", path: "/dashboard/gateway/config" },
                    { label: "Transaction Success Rates", path: "/dashboard/gateway/success-rates" },
                    { label: "Gateway Performance", path: "/dashboard/gateway/performance" }
                ]
            },
            {
                icon: FileBarChart,
                label: "Financial Reports",
                subItems: [
                    { label: "P&L Statements", path: "/dashboard/financial-reports/pl" },
                    { label: "Revenue Reports", path: "/dashboard/financial-reports/revenue" },
                    { label: "Transaction Reports", path: "/dashboard/financial-reports/transactions" },
                    { label: "Audit Reports", path: "/dashboard/financial-reports/audit" },
                    { label: "Tax Reports", path: "/dashboard/financial-reports/tax" }
                ]
            },
            {
                icon: TrendingUp,
                label: "Financial Analytics",
                subItems: [
                    { label: "Revenue Analytics", path: "/dashboard/analytics/revenue" },
                    { label: "Subscription Metrics", path: "/dashboard/analytics/subscriptions" },
                    { label: "Payment Trends", path: "/dashboard/analytics/payments" },
                    { label: "Financial KPIs", path: "/dashboard/analytics/kpis" }
                ]
            },
            {
                icon: Shield,
                label: "Fraud & Risk Monitoring",
                subItems: [
                    { label: "Fraud Alerts", path: "/dashboard/fraud/alerts" },
                    { label: "Suspicious Transactions", path: "/dashboard/fraud/suspicious" },
                    { label: "Risk Assessment", path: "/dashboard/fraud/risk" },
                    { label: "Blocked Transactions", path: "/dashboard/fraud/blocked" }
                ]
            },
            {
                icon: Receipt,
                label: "Invoicing & Billing",
                subItems: [
                    { label: "Generate Invoices", path: "/dashboard/invoicing/generate" },
                    { label: "Invoice History", path: "/dashboard/invoicing/history" },
                    { label: "Payment Reminders", path: "/dashboard/invoicing/reminders" },
                    { label: "Billing Cycles", path: "/dashboard/invoicing/cycles" }
                ]
            },
            {
                icon: BookOpen,
                label: "Resources",
                subItems: [
                    { label: "Financial Policies", path: "/dashboard/resources/policies" },
                    { label: "Compliance Guidelines", path: "/dashboard/resources/compliance" },
                    { label: "Help Center", path: "/dashboard/resources/help" }
                ]
            },
            ...commonItems
        ]
    },
    {
        role: "API PARTNER",
        items: [
            { icon: Home, label: "Dashboard", path: "/dashboard" },
            {
                icon: Link,
                label: "API Management",
                subItems: [
                    { label: "API Overview", path: "/dashboard/api/overview" },
                    { label: "API Keys", path: "/dashboard/api/keys" },
                    { label: "API Documentation", path: "/dashboard/api/docs" },
                    { label: "API Changelog", path: "/dashboard/api/changelog" }
                ]
            },
            {
                icon: Activity,
                label: "API Performance",
                subItems: [
                    { label: "API Health Monitor", path: "/dashboard/performance/health" },
                    { label: "Uptime Statistics", path: "/dashboard/performance/uptime" },
                    { label: "Response Time Analytics", path: "/dashboard/performance/response" },
                    { label: "Error Rates", path: "/dashboard/performance/errors" },
                    { label: "Success Rates", path: "/dashboard/performance/success" }
                ]
            },
            {
                icon: BarChart,
                label: "API Usage",
                subItems: [
                    { label: "Request Volume", path: "/dashboard/usage/volume" },
                    { label: "Rate Limit Status", path: "/dashboard/usage/limits" },
                    { label: "Endpoint Usage", path: "/dashboard/usage/endpoints" },
                    { label: "Usage Analytics", path: "/dashboard/usage/analytics" }
                ]
            },
            {
                icon: Repeat,
                label: "Data Synchronization",
                subItems: [
                    { label: "Sync Status", path: "/dashboard/sync/status" },
                    { label: "Last Sync Times", path: "/dashboard/sync/times" },
                    { label: "Pending Syncs", path: "/dashboard/sync/pending" },
                    { label: "Failed Syncs", path: "/dashboard/sync/failed" },
                    { label: "Sync Logs", path: "/dashboard/sync/logs" }
                ]
            },
            {
                icon: Zap,
                label: "Sandbox Environment",
                subItems: [
                    { label: "Test API Endpoints", path: "/dashboard/sandbox/endpoints" },
                    { label: "Sample Requests", path: "/dashboard/sandbox/samples" },
                    { label: "Test Data", path: "/dashboard/sandbox/data" },
                    { label: "Integration Testing", path: "/dashboard/sandbox/testing" }
                ]
            },
            {
                icon: Webhook,
                label: "Webhooks",
                subItems: [
                    { label: "Webhook Configuration", path: "/dashboard/webhooks/config" },
                    { label: "Active Webhooks", path: "/dashboard/webhooks/active" },
                    { label: "Webhook Logs", path: "/dashboard/webhooks/logs" },
                    { label: "Delivery Status", path: "/dashboard/webhooks/delivery" }
                ]
            },
            {
                icon: Bug,
                label: "Error Management",
                subItems: [
                    { label: "Error Log", path: "/dashboard/errors/log" },
                    { label: "Error Types", path: "/dashboard/errors/types" },
                    { label: "Error Notifications", path: "/dashboard/errors/notifications" },
                    { label: "Resolution Status", path: "/dashboard/errors/resolution" }
                ]
            },
            {
                icon: Database,
                label: "Data Feed Management",
                subItems: [
                    { label: "Active Data Feeds", path: "/dashboard/feeds/active" },
                    { label: "Push Data", path: "/dashboard/feeds/push" },
                    { label: "Feed History", path: "/dashboard/feeds/history" },
                    { label: "Data Validation", path: "/dashboard/feeds/validation" }
                ]
            },
            {
                icon: Lock,
                label: "Security & Compliance",
                subItems: [
                    { label: "Security Settings", path: "/dashboard/security/settings" },
                    { label: "Access Logs", path: "/dashboard/security/logs" },
                    { label: "Compliance Status", path: "/dashboard/security/compliance" },
                    { label: "Security Alerts", path: "/dashboard/security/alerts" }
                ]
            },
            {
                icon: HeadphonesIcon,
                label: "Support & Issues",
                subItems: [
                    { label: "Technical Support Tickets", path: "/dashboard/support/tickets" },
                    { label: "Report Issues", path: "/dashboard/support/report" },
                    { label: "Integration Support", path: "/dashboard/support/integration" },
                    { label: "Ticket History", path: "/dashboard/support/history" }
                ]
            },
            {
                icon: BookOpen,
                label: "Resources",
                subItems: [
                    { label: "API Documentation", path: "/dashboard/resources/api-docs" },
                    { label: "Integration Guides", path: "/dashboard/resources/guides" },
                    { label: "Code Examples", path: "/dashboard/resources/examples" },
                    { label: "Best Practices", path: "/dashboard/resources/practices" }
                ]
            },
            ...commonItems
        ]
    },
    {
        role: "AUDITOR",
        items: [
            { icon: Home, label: "Dashboard", path: "/dashboard" },
            {
                icon: FileText,
                label: "Audit Trails",
                subItems: [
                    { label: "Transaction Logs", path: "/dashboard/audit/transactions" },
                    { label: "User Activity Logs", path: "/dashboard/audit/users" },
                    { label: "System Logs", path: "/dashboard/audit/system" },
                    { label: "Data Access Logs", path: "/dashboard/audit/access" },
                    { label: "Blockchain Records", path: "/dashboard/audit/blockchain" }
                ]
            },
            {
                icon: CheckCircle,
                label: "Verification History",
                subItems: [
                    { label: "All Verifications", path: "/dashboard/verification/all" },
                    { label: "Verification Decisions", path: "/dashboard/verification/decisions" },
                    { label: "Verification Timeline", path: "/dashboard/verification/timeline" },
                    { label: "Verification Analytics", path: "/dashboard/verification/analytics" }
                ]
            },
            {
                icon: Shield,
                label: "Compliance Monitoring",
                subItems: [
                    { label: "Compliance Dashboard", path: "/dashboard/compliance/dashboard" },
                    { label: "NDPR Compliance", path: "/dashboard/compliance/ndpr" },
                    { label: "GDPR Compliance", path: "/dashboard/compliance/gdpr" },
                    { label: "ISO 27001 Status", path: "/dashboard/compliance/iso27001" },
                    { label: "Country-Specific Compliance", path: "/dashboard/compliance/country" }
                ]
            },
            {
                icon: AlertCircle,
                label: "Fraud Detection",
                subItems: [
                    { label: "Fraud Alerts", path: "/dashboard/fraud/alerts" },
                    { label: "Suspicious Activities", path: "/dashboard/fraud/suspicious" },
                    { label: "Investigation Cases", path: "/dashboard/fraud/cases" },
                    { label: "Fraud Patterns", path: "/dashboard/fraud/patterns" },
                    { label: "Risk Assessment", path: "/dashboard/fraud/risk" }
                ]
            },
            {
                icon: Repeat,
                label: "Transaction Monitoring",
                subItems: [
                    { label: "All Transactions", path: "/dashboard/transactions/all" },
                    { label: "High-Value Transactions", path: "/dashboard/transactions/high-value" },
                    { label: "Failed Transactions", path: "/dashboard/transactions/failed" },
                    { label: "Disputed Transactions", path: "/dashboard/transactions/disputed" },
                    { label: "Transaction Analytics", path: "/dashboard/transactions/analytics" }
                ]
            },
            {
                icon: Lock,
                label: "Security Monitoring",
                subItems: [
                    { label: "Security Incidents", path: "/dashboard/security/incidents" },
                    { label: "Breach Attempts", path: "/dashboard/security/breaches" },
                    { label: "Access Violations", path: "/dashboard/security/violations" },
                    { label: "Security Reports", path: "/dashboard/security/reports" }
                ]
            },
            {
                icon: FileBarChart,
                label: "Audit Reports",
                subItems: [
                    { label: "Generate Audit Reports", path: "/dashboard/reports/generate" },
                    { label: "Scheduled Reports", path: "/dashboard/reports/scheduled" },
                    { label: "Compliance Certificates", path: "/dashboard/reports/certificates" },
                    { label: "Audit Report Library", path: "/dashboard/reports/library" },
                    { label: "Export Reports", path: "/dashboard/reports/export" }
                ]
            },
            {
                icon: CheckCircle,
                label: "Compliance Testing",
                subItems: [
                    { label: "System Integrity Tests", path: "/dashboard/testing/integrity" },
                    { label: "Data Validation", path: "/dashboard/testing/validation" },
                    { label: "Security Tests", path: "/dashboard/testing/security" },
                    { label: "Test Results", path: "/dashboard/testing/results" }
                ]
            },
            {
                icon: Briefcase,
                label: "Investigation Management",
                subItems: [
                    { label: "Active Investigations", path: "/dashboard/investigations/active" },
                    { label: "Closed Investigations", path: "/dashboard/investigations/closed" },
                    { label: "Investigation Reports", path: "/dashboard/investigations/reports" },
                    { label: "Evidence Management", path: "/dashboard/investigations/evidence" }
                ]
            },
            {
                icon: TrendingUp,
                label: "Compliance Analytics",
                subItems: [
                    { label: "Compliance Trends", path: "/dashboard/analytics/trends" },
                    { label: "Risk Metrics", path: "/dashboard/analytics/risk" },
                    { label: "Audit Statistics", path: "/dashboard/analytics/statistics" },
                    { label: "Performance Indicators", path: "/dashboard/analytics/performance" }
                ]
            },
            {
                icon: BookOpen,
                label: "Resources",
                subItems: [
                    { label: "Compliance Standards", path: "/dashboard/resources/standards" },
                    { label: "Audit Guidelines", path: "/dashboard/resources/guidelines" },
                    { label: "Regulatory Framework", path: "/dashboard/resources/framework" },
                    { label: "Help Center", path: "/dashboard/resources/help" }
                ]
            },
            ...commonItems
        ]
    }
];

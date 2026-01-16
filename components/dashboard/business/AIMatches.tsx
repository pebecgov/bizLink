import { Zap, MapPin, Target } from "lucide-react";

export function AIMatches() {
    return (
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-2xl shadow-lg text-white">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-lg font-bold flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        AI-Matched Investors
                    </h2>
                    <p className="text-sm text-gray-400 mt-1">Based on your sector, stage, and funding needs</p>
                </div>
                <button className="text-sm font-medium text-gray-300 hover:text-white transition-colors">View All Matches</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <InvestorCard
                    name="John Okafor"
                    type="Tech Investor"
                    budget="₦5M - ₦50M"
                    match={95}
                    location="Lagos"
                />
                <InvestorCard
                    name="Sarah Lee"
                    type="Agri Investor"
                    budget="₦10M - ₦100M"
                    match={89}
                    location="Abuja"
                />
                <InvestorCard
                    name="David Obi"
                    type="Angel Inv."
                    budget="₦2M - ₦20M"
                    match={87}
                    location="Port Harcourt"
                />
            </div>
        </div>
    );
}

function InvestorCard({ name, type, budget, match, location }: { name: string, type: string, budget: string, match: number, location: string }) {
    return (
        <div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-xl hover:bg-white/15 transition-all cursor-pointer group">
            <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-lg font-bold text-white shadow-lg">
                    {name.charAt(0)}
                </div>
                <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs font-bold rounded-md border border-green-500/30">
                    {match}% Match
                </span>
            </div>

            <h3 className="font-bold text-lg">{name}</h3>
            <p className="text-gray-400 text-sm">{type}</p>

            <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Target className="w-4 h-4 text-gray-500" />
                    {budget}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    {location}
                </div>
            </div>

            <button className="w-full mt-5 py-2 bg-white text-gray-900 font-bold text-sm rounded-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                Connect Now
            </button>
        </div>
    );
}

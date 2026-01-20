import { BarChart, ChevronRight } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function DealPipeline() {
    const connections = useQuery(api.connections.getMyConnections);

    const counts = {
        lead: connections?.filter(c => c.status === "lead").length || 0,
        connected: connections?.filter(c => c.status === "connected").length || 0,
        contract: connections?.filter(c => c.status === "contract").length || 0,
        closed: connections?.filter(c => c.status === "closed").length || 0,
    };

    const stages = [
        { name: "Leads", count: counts.lead, color: "bg-gray-100 text-gray-600" },
        { name: "Connections", count: counts.connected, color: "bg-blue-100 text-blue-600" },
        { name: "Contracts", count: counts.contract, color: "bg-purple-100 text-purple-600" },
        { name: "Closed", count: counts.closed, color: "bg-green-100 text-green-600" },
    ];

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <BarChart className="w-5 h-5 text-gray-600" />
                    Deal Pipeline
                </h2>
                <div className="text-right">
                    <p className="text-xs text-gray-400">Total Pipeline Value</p>
                    <p className="text-lg font-bold text-green-600">₦127,000,000</p>
                </div>
            </div>

            {/* Funnel Visualization */}
            <div className="flex flex-wrap md:flex-nowrap items-center gap-2 mb-8">
                {stages.map((stage, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center relative group">
                        <div className={`w-full h-12 flex items-center justify-center font-bold text-lg rounded-lg mb-2 ${stage.color} relative z-10 transition-transform group-hover:-translate-y-1`}>
                            {stage.count}
                        </div>
                        <p className="text-xs font-medium text-gray-500 text-center">{stage.name}</p>

                        {/* Connector line */}
                        {index < stages.length - 1 && (
                            <div className="hidden md:block absolute top-6 -right-1/2 w-full h-0.5 bg-gray-100 -z-0"></div>
                        )}

                        {/* Mobile arrow */}
                        {index < stages.length - 1 && (
                            <div className="md:hidden w-full flex justify-center py-2">
                                <ChevronRight className="w-4 h-4 text-gray-300 transform rotate-90" />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="text-sm">
                    <span className="text-gray-500">Conversion Rate: </span>
                    <span className="font-bold text-gray-900">15%</span>
                    <span className="text-xs text-green-600 ml-2">(+3% vs Industry)</span>
                </div>
                <button className="text-sm font-semibold text-green-600 hover:text-green-700">
                    View Full Pipeline
                </button>
            </div>
        </div>
    );
}

import { DollarSign, FileText, PenTool } from "lucide-react";

export function FinancialCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Funding */}
            <div className="bg-gradient-to-br from-green-600 to-green-700 p-6 rounded-2xl text-white shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-medium text-green-50">Total Funding Raised</span>
                </div>
                <div className="mb-4">
                    <h3 className="text-3xl font-bold">₦45,000,000</h3>
                    <p className="text-sm text-green-100 mt-1">From 3 Investors</p>
                </div>
                <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors border border-white/20">
                    View Transactions
                </button>
            </div>

            {/* Pending Contracts */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-orange-50 rounded-lg">
                        <FileText className="w-6 h-6 text-orange-600" />
                    </div>
                    <span className="font-medium text-gray-600">Pending Contracts</span>
                </div>
                <div className="mb-6">
                    <h3 className="text-3xl font-bold text-gray-900">5</h3>
                    <p className="text-sm text-gray-500 mt-1">₦12M Total Value</p>
                </div>
                <div className="space-y-2">
                    <div className="text-xs flex justify-between text-gray-500">
                        <span>Awaiting Signature</span>
                        <span className="font-medium text-orange-600">3 Urgent</span>
                    </div>
                    <button className="w-full py-2 text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-lg text-sm font-medium transition-colors">
                        Review Contracts
                    </button>
                </div>
            </div>

            {/* Signed Deals */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-50 rounded-lg">
                        <PenTool className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-600">Signed Deals</span>
                </div>
                <div className="mb-6">
                    <h3 className="text-3xl font-bold text-gray-900">8</h3>
                    <p className="text-sm text-gray-500 mt-1">₦33M Total Value</p>
                </div>
                <div className="space-y-2">
                    <div className="text-xs flex justify-between text-gray-500">
                        <span>Success Rate</span>
                        <span className="font-medium text-green-600">High</span>
                    </div>
                    <button className="w-full py-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm font-medium transition-colors">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
}

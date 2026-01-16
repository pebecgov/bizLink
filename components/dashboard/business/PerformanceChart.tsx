import { TrendingUp, Lightbulb, Users } from "lucide-react";

export function PerformanceChart() {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-gray-600" />
                        Performance Analytics
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Comparisons vs. last 30 days & industry</p>
                </div>
                <select className="mt-2 md:mt-0 bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-green-500">
                    <option>Last 30 Days</option>
                    <option>This Quarter</option>
                    <option>Year to Date</option>
                </select>
            </div>

            {/* Placeholder for real chart - using simple CSS bars for now */}
            <div className="h-48 flex items-end gap-2 mb-8 px-2">
                {[40, 65, 45, 80, 55, 70, 90, 60, 75, 50, 85, 95].map((height, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                        <div className="w-full bg-green-100 h-48 rounded-t-sm relative overflow-hidden group-hover:bg-green-200 transition-colors">
                            <div
                                className="absolute bottom-0 w-full bg-green-500 transition-all duration-700 hover:bg-green-600"
                                style={{ height: `${height}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
                <h4 className="font-bold text-yellow-800 text-sm flex items-center gap-2 mb-2">
                    <Lightbulb className="w-4 h-4" />
                    Key Insights
                </h4>
                <div className="space-y-2 text-sm text-yellow-700">
                    <p className="flex gap-2">
                        <span className="font-bold text-green-600">✓</span>
                        Profile views increased <span className="font-bold">35%</span> after completing verification
                    </p>
                    <p className="flex gap-2">
                        <span className="font-bold text-red-500">⚠</span>
                        Response time slower than <span className="font-bold">85%</span> of businesses in your sector
                    </p>
                </div>
            </div>
        </div>
    );
}

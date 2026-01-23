import { Upload, Edit, Search, MessageSquare, Calendar, FileText, PieChart, HelpCircle } from "lucide-react";

export function QuickActions({ seekingFunding }: { seekingFunding?: boolean }) {
    return (
        <div className="bg-gray-900 p-6 rounded-2xl shadow-lg text-white">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-green-500 rounded-full"></span>
                Quick Actions
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ActionBtn icon={Upload} label="Upload Doc" />
                <ActionBtn icon={Edit} label="Update Profile" />
                <ActionBtn icon={Search} label="Search Partners" />
                <ActionBtn icon={MessageSquare} label="Message" />
                <ActionBtn icon={Calendar} label="Schedule Meeting" />
                <ActionBtn icon={FileText} label="View Contracts" />
                <ActionBtn icon={PieChart} label="Reports" />
                <ActionBtn icon={HelpCircle} label="Get Support" />
            </div>
        </div>
    );
}

function ActionBtn({ icon: Icon, label }: { icon: any, label: string }) {
    return (
        <button className="flex flex-col items-center justify-center p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 hover:border-white/20 transition-all group">
            <Icon className="w-6 h-6 text-gray-400 group-hover:text-green-400 mb-2 transition-colors" />
            <span className="text-sm font-medium text-gray-300 group-hover:text-white">{label}</span>
        </button>
    );
}

import { MessageSquare, Bell, Clock, ChevronRight } from "lucide-react";

export function MessagesWidget() {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-gray-600" />
                    Messages & Inquiries
                </h2>
                <div className="flex gap-3">
                    <span className="text-xs font-semibold px-2 py-1 bg-red-100 text-red-600 rounded-md flex items-center gap-1">
                        <Bell className="w-3 h-3" /> 12 Unread
                    </span>
                    <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-600 rounded-md flex items-center gap-1">
                        <Clock className="w-3 h-3" /> 3 Pending
                    </span>
                </div>
            </div>

            <div className="space-y-4">
                <MessageItem
                    name="John Adebayo"
                    role="Agency Rep"
                    message="Your compliance documents have been received..."
                    time="2hrs ago"
                    unread={true}
                />
                <MessageItem
                    name="Sarah Chen"
                    role="Business Hub"
                    message="Interested in listing collaboration for tech sector"
                    time="5hrs ago"
                    unread={true}
                />
                <MessageItem
                    name="Mike Johnson"
                    role="Partner"
                    message="Can we schedule a call to discuss the terms?"
                    time="1 day ago"
                    unread={false}
                />
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between">
                <button className="text-sm font-medium text-gray-500 hover:text-gray-900">View All Messages</button>
                <button className="text-sm font-semibold text-green-600 hover:text-green-700 flex items-center gap-1">
                    Respond Now <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

function MessageItem({ name, role, message, time, unread }: { name: string, role: string, message: string, time: string, unread: boolean }) {
    return (
        <div className={`flex items-start gap-4 p-3 rounded-xl transition-colors ${unread ? "bg-blue-50/50" : "hover:bg-gray-50"}`}>
            <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-sm font-bold text-gray-600">
                {name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                    <h4 className="text-sm font-bold text-gray-900 truncate">
                        {name} <span className="text-xs font-normal text-gray-500 ml-1">• {role}</span>
                    </h4>
                    <span className="text-xs text-gray-400 whitespace-nowrap">{time}</span>
                </div>
                <p className={`text-sm mt-0.5 truncate ${unread ? "font-medium text-gray-800" : "text-gray-500"}`}>
                    {message}
                </p>
            </div>
            {unread && <div className="w-2 h-2 rounded-full bg-blue-600 mt-2"></div>}
        </div>
    );
}

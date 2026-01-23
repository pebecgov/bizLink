import { Calendar, Video, MapPin, ExternalLink } from "lucide-react";

export function EventsWidget() {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-600" />
                    Upcoming Events
                </h2>
                <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    8 Recommended
                </span>
            </div>

            <div className="space-y-4">
                <EventItem
                    title="Tech Sector Networking Day"
                    date="Jan 25, 2026"
                    type="Virtual"
                    action="Register"
                />
                <EventItem
                    title="Manufacturing Sector Webinar"
                    date="Jan 28, 2026"
                    type="Lagos"
                    action="Registered"
                    registered={true}
                />
                <EventItem
                    title="AfCFTA Trade & Policy Forum"
                    date="Feb 2, 2026"
                    type="Accra"
                    action="Register"
                />
            </div>

            <button className="w-full mt-6 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                View All Events
            </button>
        </div>
    );
}

function EventItem({ title, date, type, action, registered }: { title: string, date: string, type: string, action: string, registered?: boolean }) {
    return (
        <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100 hover:border-gray-200">
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex flex-col items-center justify-center text-gray-500 shrink-0">
                    <span className="text-xs font-bold">{date.split(' ')[0]}</span>
                    <span className="text-lg font-bold text-gray-900">{date.split(' ')[1].replace(',', '')}</span>
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 text-sm">{title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                            {type === 'Virtual' ? <Video className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                            {type}
                        </span>
                    </div>
                </div>
            </div>

            <button className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${registered ? "bg-green-100 text-green-700 cursor-default" : "bg-gray-900 text-white hover:bg-gray-800"}`}>
                {action}
            </button>
        </div>
    );
}

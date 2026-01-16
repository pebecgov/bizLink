import { CheckCircle2, AlertTriangle, XCircle, ChevronRight } from "lucide-react";

export function VerificationWidget() {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        Verification Status
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Complete your profile to unlock full access</p>
                </div>
                <button className="mt-4 md:mt-0 px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors">
                    Complete Verification
                </button>
            </div>

            <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-gray-700">Profile Completion</span>
                    <span className="font-bold text-green-600">95%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full transition-all duration-1000" style={{ width: "95%" }}></div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatusItem label="Business Documents" status="verified" />
                <StatusItem label="CAC Certificate" status="verified" />
                <StatusItem label="TIN Verification" status="verified" />
                <StatusItem label="Bank Details" status="verified" />
                <StatusItem label="Tax Compliance" status="pending" warning="Pending Review" />
                <StatusItem label="License Renewal" status="warning" warning="Expires in 30 days" />
            </div>
        </div>
    );
}

function StatusItem({ label, status, warning }: { label: string, status: 'verified' | 'pending' | 'warning' | 'error', warning?: string }) {
    const getIcon = () => {
        switch (status) {
            case 'verified': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
            case 'pending': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
            case 'warning': return <AlertTriangle className="w-5 h-5 text-orange-500" />;
            case 'error': return <XCircle className="w-5 h-5 text-red-500" />;
        }
    };

    return (
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
            {getIcon()}
            <div>
                <p className="text-sm font-medium text-gray-900">{label}</p>
                {warning && <p className="text-xs text-yellow-600 font-medium">{warning}</p>}
                {!warning && status === 'verified' && <p className="text-xs text-green-600">Verified</p>}
            </div>
        </div>
    );
}

import { TopMetrics } from "./TopMetrics";
import { VerificationWidget } from "./VerificationWidget";
import { FinancialCards } from "./FinancialCards";
import { MessagesWidget } from "./MessagesWidget";
import { AIMatches } from "./AIMatches";
import { DealPipeline } from "./DealPipeline";
import { EventsWidget } from "./EventsWidget";
import { PerformanceChart } from "./PerformanceChart";
import { MarketIntel } from "./MarketIntel";
import { QuickActions } from "./QuickActions";

export function BusinessDashboard() {
    return (
        <div className="space-y-8 pb-12">

            {/* Header / Welcome (Optional, can be separate) */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Business Dashboard</h1>
                <p className="text-gray-500">Monitor your performance and manage investor relations</p>
            </div>

            {/* Row 1: Top Metrics */}
            <section>
                <TopMetrics />
            </section>

            {/* Row 2: Verification */}
            <section>
                <VerificationWidget />
            </section>

            {/* Row 3: Financials */}
            <section>
                <FinancialCards />
            </section>

            {/* Row 4: Messages (Width control if needed, currently full) */}
            <section>
                <MessagesWidget />
            </section>

            {/* Row 5: AI Matches */}
            <section>
                <AIMatches />
            </section>

            {/* Info Grid: Pipeline, Events, Chart, Intel */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Column 1 */}
                <div className="space-y-8">
                    <DealPipeline />
                </div>

                {/* Column 2 */}
                <div className="space-y-8">
                    <EventsWidget />
                    
                </div>
            </div>

            {/* Row 10: Quick Actions */}
            <section>
                <QuickActions />
            </section>
        </div>
    );
}

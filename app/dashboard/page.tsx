"use client";

import { useUser, SignOutButton } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const { user } = useUser();
    const currentUser = useQuery(api.users.getCurrentUser);
    const router = useRouter();

    if (currentUser === undefined) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p className="loading-text">Loading dashboard...</p>
            </div>
        );
    }

    if (currentUser === null) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p className="loading-text">Setting up your account...</p>
            </div>
        );
    }

    return (
        <div className="dashboard-wrapper">
            <nav className="dashboard-nav">
                <div className="container">
                    <div className="nav-content">
                        <h1 className="nav-logo">PEBEC BIZ LINK</h1>
                        <div className="nav-actions">
                            <span className="user-email">{user?.emailAddresses[0]?.emailAddress}</span>
                            <SignOutButton>
                                <button className="btn btn-outline">Sign Out</button>
                            </SignOutButton>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="dashboard-main">
                <div className="container">
                    <div className="dashboard-header">
                        <div>
                            <h2 className="dashboard-title">Welcome to Your Dashboard</h2>
                            <p className="dashboard-subtitle">
                                Manage your business presence on Africa's leading investment platform
                            </p>
                        </div>
                        <div className="user-badge">
                            <span className="badge-label">Role:</span>
                            <span className="badge-value">{currentUser.role}</span>
                        </div>
                    </div>

                    <div className="user-info-grid">
                        <div className="info-card">
                            <div className="info-icon">👤</div>
                            <div className="info-content">
                                <h3 className="info-label">User Role</h3>
                                <p className="info-value">{currentUser.role || "Not set"}</p>
                            </div>
                        </div>

                        {currentUser.jurisdiction && (
                            <div className="info-card">
                                <div className="info-icon">🌍</div>
                                <div className="info-content">
                                    <h3 className="info-label">Jurisdiction</h3>
                                    <p className="info-value">{currentUser.jurisdiction}</p>
                                </div>
                            </div>
                        )}

                        <div className="info-card">
                            <div className="info-icon">✓</div>
                            <div className="info-content">
                                <h3 className="info-label">Status</h3>
                                <p className="info-value">{currentUser.status || "Active"}</p>
                            </div>
                        </div>

                        <div className="info-card">
                            <div className="info-icon">📧</div>
                            <div className="info-content">
                                <h3 className="info-label">Email</h3>
                                <p className="info-value">{user?.emailAddresses[0]?.emailAddress}</p>
                            </div>
                        </div>
                    </div>

                    <div className="quick-actions">
                        <h3 className="section-heading">Quick Actions</h3>
                        <div className="actions-grid">
                            <div className="action-card">
                                <div className="action-icon">🏢</div>
                                <h4 className="action-title">Register Business</h4>
                                <p className="action-description">Add your business to the verified registry</p>
                                <button className="btn btn-primary">Get Started</button>
                            </div>

                            <div className="action-card">
                                <div className="action-icon">🔍</div>
                                <h4 className="action-title">Find Investors</h4>
                                <p className="action-description">Connect with investors across Africa</p>
                                <button className="btn btn-primary">Search Now</button>
                            </div>

                            <div className="action-card">
                                <div className="action-icon">📊</div>
                                <h4 className="action-title">View Analytics</h4>
                                <p className="action-description">Track your business performance</p>
                                <button className="btn btn-primary">View Stats</button>
                            </div>

                            <div className="action-card">
                                <div className="action-icon">📄</div>
                                <h4 className="action-title">Compliance Check</h4>
                                <p className="action-description">Ensure regulatory compliance</p>
                                <button className="btn btn-primary">Check Status</button>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-footer-note">
                        <p>
                            🚀 This is your PEBEC BIZ LINK dashboard. More features coming soon!
                        </p>
                    </div>
                </div>
            </main>

            <style jsx>{`
        .dashboard-wrapper {
          min-height: 100vh;
          background: var(--bg-secondary);
        }

        .dashboard-nav {
          background: var(--gradient-primary);
          padding: var(--spacing-md) 0;
          box-shadow: var(--shadow-md);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--spacing-md);
        }

        .nav-logo {
          color: var(--text-white);
          font-size: 1.5rem;
          margin: 0;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
        }

        .user-email {
          color: var(--text-white);
          font-size: 0.95rem;
          display: none;
        }

        @media (min-width: 768px) {
          .user-email {
            display: inline;
          }
        }

        .dashboard-main {
          padding: var(--spacing-3xl) 0;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-3xl);
          flex-wrap: wrap;
          gap: var(--spacing-lg);
        }

        .dashboard-title {
          margin-bottom: var(--spacing-xs);
        }

        .dashboard-subtitle {
          color: var(--text-secondary);
          font-size: 1.125rem;
        }

        .user-badge {
          background: var(--gradient-primary);
          color: var(--text-white);
          padding: var(--spacing-md) var(--spacing-lg);
          border-radius: var(--radius-lg);
          display: flex;
          gap: var(--spacing-sm);
          align-items: center;
        }

        .badge-label {
          font-weight: 600;
          opacity: 0.9;
        }

        .badge-value {
          font-weight: 700;
          font-size: 1.125rem;
        }

        .user-info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--spacing-lg);
          margin-bottom: var(--spacing-3xl);
        }

        .info-card {
          background: var(--bg-primary);
          padding: var(--spacing-lg);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-md);
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          transition: all var(--transition-base);
        }

        .info-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-lg);
        }

        .info-icon {
          font-size: 2.5rem;
          flex-shrink: 0;
        }

        .info-content {
          flex: 1;
        }

        .info-label {
          font-size: 0.875rem;
          color: var(--text-muted);
          margin-bottom: 0.25rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .info-value {
          font-size: 1.125rem;
          color: var(--text-primary);
          font-weight: 700;
          margin: 0;
        }

        .quick-actions {
          margin-bottom: var(--spacing-2xl);
        }

        .section-heading {
          font-size: 1.75rem;
          margin-bottom: var(--spacing-xl);
          color: var(--text-primary);
        }

        .actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--spacing-xl);
        }

        .action-card {
          background: var(--bg-primary);
          padding: var(--spacing-xl);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-md);
          text-align: center;
          transition: all var(--transition-base);
          border: 2px solid transparent;
        }

        .action-card:hover {
          border-color: var(--primary-green);
          transform: translateY(-5px);
          box-shadow: var(--shadow-xl);
        }

        .action-icon {
          font-size: 3rem;
          margin-bottom: var(--spacing-md);
        }

        .action-title {
          font-size: 1.25rem;
          color: var(--text-primary);
          margin-bottom: var(--spacing-sm);
        }

        .action-description {
          color: var(--text-secondary);
          margin-bottom: var(--spacing-lg);
          line-height: 1.6;
        }

        .dashboard-footer-note {
          background: var(--very-light-green);
          border-left: 4px solid var(--primary-green);
          padding: var(--spacing-lg);
          border-radius: var(--radius-md);
          text-align: center;
        }

        .dashboard-footer-note p {
          color: var(--dark-green);
          font-weight: 600;
          margin: 0;
        }
      `}</style>
        </div>
    );
}

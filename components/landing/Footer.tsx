"use client";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        platform: [
            { name: "Features", href: "#features" },
            { name: "Stakeholders", href: "#stakeholders" },
            { name: "Impact", href: "#stats" },
            { name: "Documentation", href: "#" }
        ],
        resources: [
            { name: "Help Center", href: "#" },
            { name: "API Documentation", href: "#" },
            { name: "Compliance Guide", href: "#" },
            { name: "Blog", href: "#" }
        ],
        legal: [
            { name: "Privacy Policy", href: "#" },
            { name: "Terms of Service", href: "#" },
            { name: "Data Protection", href: "#" },
            { name: "Cookie Policy", href: "#" }
        ],
        contact: [
            { name: "Contact Us", href: "#" },
            { name: "Support", href: "#" },
            { name: "Partners", href: "#" },
            { name: "Media Kit", href: "#" }
        ]
    };

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <h3 className="footer-logo">PEBEC BIZ LINK</h3>
                        <p className="footer-tagline">
                            Empowering African business through digital innovation and verified connections
                        </p>
                        <div className="footer-badges">
                            <span className="footer-badge">🇳🇬 Nigeria</span>
                            <span className="footer-badge">🌍 Pan-African</span>
                            <span className="footer-badge">✓ Government Backed</span>
                        </div>
                    </div>

                    <div className="footer-links-grid">
                        <div className="footer-links-column">
                            <h4 className="footer-links-title">Platform</h4>
                            <ul className="footer-links-list">
                                {footerLinks.platform.map((link, index) => (
                                    <li key={index}>
                                        <a href={link.href} className="footer-link">{link.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="footer-links-column">
                            <h4 className="footer-links-title">Resources</h4>
                            <ul className="footer-links-list">
                                {footerLinks.resources.map((link, index) => (
                                    <li key={index}>
                                        <a href={link.href} className="footer-link">{link.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="footer-links-column">
                            <h4 className="footer-links-title">Legal</h4>
                            <ul className="footer-links-list">
                                {footerLinks.legal.map((link, index) => (
                                    <li key={index}>
                                        <a href={link.href} className="footer-link">{link.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="footer-links-column">
                            <h4 className="footer-links-title">Contact</h4>
                            <ul className="footer-links-list">
                                {footerLinks.contact.map((link, index) => (
                                    <li key={index}>
                                        <a href={link.href} className="footer-link">{link.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-partners">
                    <p className="partners-intro">In Partnership With</p>
                    <div className="partners-list">
                        <span className="partner-tag">PEBEC</span>
                        <span className="partner-tag">FIRS</span>
                        <span className="partner-tag">AfCFTA Secretariat</span>
                        <span className="partner-tag">NIPC</span>
                        <span className="partner-tag">ECOWAS</span>
                        <span className="partner-tag">African Union</span>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="footer-copyright">
                        © {currentYear} PEBEC BIZ LINK. All rights reserved. A Presidential Enabling Business Environment Council Initiative.
                    </p>
                    <div className="footer-social">
                        <a href="#" className="social-link" aria-label="Twitter">
                            <svg fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                            </svg>
                        </a>
                        <a href="#" className="social-link" aria-label="LinkedIn">
                            <svg fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </a>
                        <a href="#" className="social-link" aria-label="Facebook">
                            <svg fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

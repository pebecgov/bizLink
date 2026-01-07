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
        <footer className="bg-bg-dark text-white pt-20 pb-10 border-t border-white/10">
            <div className="container mx-auto px-6 md:px-8 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-16">
                    <div className="lg:w-1/3">
                        <h3 className="text-2xl font-bold mb-4">PEBEC BIZ<span className="text-gold">LINK</span></h3>
                        <p className="text-white/70 mb-8 leading-relaxed">
                            Empowering African business through digital innovation and verified connections
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-semibold text-white/90 border border-white/20">🇳🇬 Nigeria</span>
                            <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-semibold text-white/90 border border-white/20">🌍 Pan-African</span>
                            <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-semibold text-white/90 border border-white/20">✓ Government Backed</span>
                        </div>
                    </div>

                    <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <h4 className="font-bold mb-6 text-white text-lg">Platform</h4>
                            <ul className="space-y-4">
                                {footerLinks.platform.map((link, index) => (
                                    <li key={index}>
                                        <a href={link.href} className="text-white/60 hover:text-gold transition-colors text-sm">{link.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold mb-6 text-white text-lg">Resources</h4>
                            <ul className="space-y-4">
                                {footerLinks.resources.map((link, index) => (
                                    <li key={index}>
                                        <a href={link.href} className="text-white/60 hover:text-gold transition-colors text-sm">{link.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold mb-6 text-white text-lg">Legal</h4>
                            <ul className="space-y-4">
                                {footerLinks.legal.map((link, index) => (
                                    <li key={index}>
                                        <a href={link.href} className="text-white/60 hover:text-gold transition-colors text-sm">{link.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold mb-6 text-white text-lg">Contact</h4>
                            <ul className="space-y-4">
                                {footerLinks.contact.map((link, index) => (
                                    <li key={index}>
                                        <a href={link.href} className="text-white/60 hover:text-gold transition-colors text-sm">{link.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-10 pb-10">
                    <p className="text-sm font-bold uppercase tracking-widest text-white/40 mb-6 text-center lg:text-left">In Partnership With</p>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                        <span className="text-white/60 text-sm font-semibold hover:text-white transition-colors cursor-default">PEBEC</span>
                        <span className="text-white/20 text-sm">|</span>
                        <span className="text-white/60 text-sm font-semibold hover:text-white transition-colors cursor-default">FIRS</span>
                        <span className="text-white/20 text-sm">|</span>
                        <span className="text-white/60 text-sm font-semibold hover:text-white transition-colors cursor-default">AfCFTA Secretariat</span>
                        <span className="text-white/20 text-sm">|</span>
                        <span className="text-white/60 text-sm font-semibold hover:text-white transition-colors cursor-default">NIPC</span>
                        <span className="text-white/20 text-sm">|</span>
                        <span className="text-white/60 text-sm font-semibold hover:text-white transition-colors cursor-default">ECOWAS</span>
                        <span className="text-white/20 text-sm">|</span>
                        <span className="text-white/60 text-sm font-semibold hover:text-white transition-colors cursor-default">African Union</span>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-white/40 text-sm text-center md:text-left">
                        © {currentYear} <span className="text-white/60">PEBEC BIZLINK</span>. All rights reserved. A Presidential Enabling Business Environment Council Initiative.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="text-white/40 hover:text-gold transition-colors" aria-label="Twitter">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                            </svg>
                        </a>
                        <a href="#" className="text-white/40 hover:text-gold transition-colors" aria-label="LinkedIn">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </a>
                        <a href="#" className="text-white/40 hover:text-gold transition-colors" aria-label="Facebook">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

"use client";

import React from "react";
import { Building2, Mail, Phone, ExternalLink } from "lucide-react";

interface Service {
    name: string;
    timeline: string;
    requirements: string;
    cost: string;
}

interface MDA {
    name: string;
    acronym: string;
    description?: string;
    services: Service[];
    contactPerson?: {
        name: string;
        role: string;
        email?: string;
        phone?: string;
    };
}

export default function MdaInfoCard({ mda }: { mda: MDA }) {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-slate-900 p-6 text-white">
                <div className="flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Building2 className="w-5 h-5 text-blue-400" />
                            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">{mda.acronym}</span>
                        </div>
                        <h3 className="text-xl font-bold">{mda.name}</h3>
                    </div>
                    <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                    </button>
                </div>
                <p className="text-slate-400 text-sm mt-4 leading-relaxed line-clamp-2">
                    {mda.description}
                </p>
            </div>

            <div className="p-6">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Key Services & SLAs</h4>
                <div className="space-y-4">
                    {mda.services.slice(0, 3).map((service, i) => (
                        <div key={i} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                            <div>
                                <p className="text-sm font-semibold text-slate-800">{service.name}</p>
                                <p className="text-xs text-slate-500">{service.timeline}</p>
                            </div>
                            <p className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                {service.cost}
                            </p>
                        </div>
                    ))}
                </div>

                {mda.contactPerson && (
                    <div className="mt-6 pt-6 border-t border-slate-100">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Concierge Point of Contact</h4>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                                {mda.contactPerson.name.charAt(0)}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-900">{mda.contactPerson.name}</p>
                                <p className="text-xs text-slate-500">{mda.contactPerson.role}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {mda.contactPerson.email && (
                                <a href={`mailto:${mda.contactPerson.email}`} className="flex items-center gap-2 text-xs text-slate-600 hover:text-blue-600">
                                    <Mail className="w-3.5 h-3.5" />
                                    Email
                                </a>
                            )}
                            {mda.contactPerson.phone && (
                                <a href={`tel:${mda.contactPerson.phone}`} className="flex items-center gap-2 text-xs text-slate-600 hover:text-blue-600">
                                    <Phone className="w-3.5 h-3.5" />
                                    Call
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

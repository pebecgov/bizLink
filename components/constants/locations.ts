export interface Location {
    state: string;
    lgas: {
        name: string;
        wards: string[];
    }[];
}

// Simplified dataset for demonstration. 
// In a production app, this should likely be fetched from an API or a comprehensive library.
export const NIGERIA_LOCATIONS: Location[] = [
    {
        state: "Lagos",
        lgas: [
            {
                name: "Ikeja",
                wards: [
                    "Adeniyi Jones",
                    "Alausa",
                    "Anifowoshe",
                    "GRA/Police Barracks",
                    "Ipodo/Seriki Aro",
                    "Ogba",
                    "Oke-Ira",
                    "Onigbongbo",
                    "Opebi",
                    "Wasimi/Opebi"
                ]
            },
            {
                name: "Eti-Osa",
                wards: [
                    "Victoria Island I",
                    "Victoria Island II",
                    "Ikoyi I",
                    "Ikoyi II",
                    "Lekki",
                    "Ajah",
                    "Sangotedo",
                    "Ado-Langbasa",
                    "Badore",
                    "Ilasan"
                ]
            },
            // ... other LGAs
        ]
    },
    {
        state: "Abuja (FCT)",
        lgas: [
            {
                name: "Abuja Municipal",
                wards: [
                    "City Centre",
                    "Garki",
                    "Gui",
                    "Gwagwa",
                    "Gwarinpa",
                    "Jiwa",
                    "Kabusa",
                    "Karshi",
                    "Karu",
                    "Nyanya",
                    "Orozo",
                    "Wuse",
                    "Wuse II"
                ]
            }
        ]
    },
    // ... other states
];

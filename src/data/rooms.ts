export interface RoomFeature {
  key: string;
  label: string;
}

export interface RoomData {
  id:           string;
  name:         string;
  deity:        string;
  deityOrigin:  string;
  description:  string;
  editorial:    string;   // richer, magazine-voice paragraph
  mainImage:    string;
  gallery:      string[];
  features:     RoomFeature[];
  bedType:      "King" | "Queen";
}

export const ROOMS: RoomData[] = [
  {
    id:          "ezili",
    name:        "Ezili Suite",
    deity:       "Ezili",
    deityOrigin: "Caribbean Sea Goddess",
    description: "Spacious and serene, with designer furnishings and a luxurious en-suite bathroom.",
    editorial:
      "Ezili unfolds like a slow exhale — wide, unhurried, and entirely your own. Designer furnishings occupy the space with the quiet authority of things that belong. The en-suite is a study in warmth: stone surfaces, curated fixtures, and an atmosphere that asks nothing of you but your presence.",
    mainImage: "/images/EZILI_1.jpg",
    gallery: [
      "/images/EZILI_2.jpg",
      "/images/EZILI_3.jpg",
      "/images/EZILI_4.jpg",
      "/images/EZILI BATHROOM_1.jpg",
      "/images/EZILI BATHROOM_2.jpg",
    ],
    features: [
      { key: "bed-king",  label: "King Bed"         },
      { key: "bath",      label: "En-suite Bath"     },
      { key: "ac",        label: "Air-conditioned"   },
      { key: "tv",        label: "Smart TV"          },
      { key: "wardrobe",  label: "Walk-in Wardrobe"  },
    ],
    bedType: "King",
  },
  {
    id:          "lir",
    name:        "Lir Suite",
    deity:       "Lir",
    deityOrigin: "Celtic Sea Deity",
    description: "Elegant and airy, with wooded ceilings and curated artwork.",
    editorial:
      "Named for the Irish god of the sea, Lir is a room that breathes. Wooded ceilings pull the eye upward; curated artwork returns it to the moment. Airy and luminous through the day, intimate and warm as evening draws in — a suite that earns the word elegant without effort.",
    mainImage: "/images/LIR_1.jpg",
    gallery: [
      "/images/LIR_2.jpg",
      "/images/LIR_3.jpg",
      "/images/LIR_4.jpg",
      "/images/LIR BATHROOM_1.jpg",
      "/images/LIR BATHROOM_2.jpg",
    ],
    features: [
      { key: "bed-king",  label: "King Bed"              },
      { key: "bath",      label: "En-suite Bath"          },
      { key: "ac",        label: "Air-conditioned"        },
      { key: "tv",        label: "Smart TV"               },
      { key: "seating",   label: "Private Seating Area"   },
    ],
    bedType: "King",
  },
  {
    id:          "mazu",
    name:        "Mazu Suite",
    deity:       "Mazu",
    deityOrigin: "Chinese Sea Goddess",
    description: "A tranquil retreat with garden views and premium linens.",
    editorial:
      "Mazu watches over those at sea. Her suite at Azara does something similar: it holds you. Garden views frame the mornings through wide glass. Premium linens draw the evenings close. The bathroom is a private world — calm and considered, like the room it serves.",
    mainImage: "/images/Mazu_1.jpg",
    gallery: [
      "/images/MAZU_2.jpg",
      "/images/MAZU_3.jpg",
      "/images/MAZU_4.jpg",
      "/images/MAZU BATHROOM_1.jpg",
      "/images/MAZU BATHROOM_2.jpg",
    ],
    features: [
      { key: "bed-queen", label: "Queen Bed"        },
      { key: "bath",      label: "En-suite Bath"    },
      { key: "ac",        label: "Air-conditioned"  },
      { key: "tv",        label: "Smart TV"         },
      { key: "wardrobe",  label: "Wardrobe"         },
    ],
    bedType: "Queen",
  },
  {
    id:          "sujin",
    name:        "Sujin Suite",
    deity:       "Sujin",
    deityOrigin: "Japanese Water Deity",
    description: "Contemporary comfort with warm wood accents and natural light.",
    editorial:
      "Light falls differently in Sujin. The Japanese influence — economy, precision, the quiet beauty of the unobtrusive — is felt rather than declared. Warm wood accents ground the space. Natural light completes it. Contemporary in sensibility, and entirely timeless in feeling.",
    mainImage: "/images/SUJIN_1.jpg",
    gallery: [
      "/images/SUJIN_2.jpg",
      "/images/SUJIN_3.jpg",
      "/images/SUJIN_4.jpg",
      "/images/SUJIN BATHROOM_1.jpg",
      "/images/SUJIN BATHROOM_2.jpg",
    ],
    features: [
      { key: "bed-queen", label: "Queen Bed"       },
      { key: "bath",      label: "En-suite Bath"   },
      { key: "ac",        label: "Air-conditioned" },
      { key: "tv",        label: "Smart TV"        },
      { key: "seating",   label: "Seating Area"    },
    ],
    bedType: "Queen",
  },
  {
    id:          "varuna",
    name:        "Varuna Suite",
    deity:       "Varuna",
    deityOrigin: "Hindu God of Water",
    description: "Pool-facing sanctuary with designer interiors and a spa-like bathroom.",
    editorial:
      "Varuna — keeper of the cosmic waters — faces the pool. His suite follows suit: expansive, open, designed to make you feel the scale of things without overwhelming them. Designer interiors give way to a spa-like bathroom that brings the immersion full circle.",
    mainImage: "/images/VARUNA_1.jpg",
    gallery: [
      "/images/VARUNA_2.jpg",
      "/images/VARUNA_3.jpg",
      "/images/VARUNA_4.jpg",
      "/images/VARUNA BATHROOM_1.jpg",
      "/images/VARUNA BATHROOM_2.jpg",
    ],
    features: [
      { key: "bed-queen", label: "Queen Bed"       },
      { key: "bath",      label: "En-suite Bath"   },
      { key: "ac",        label: "Air-conditioned" },
      { key: "tv",        label: "Smart TV"        },
      { key: "pool-view", label: "Pool View"       },
    ],
    bedType: "Queen",
  },
];

/** Features shared by all rooms — shown at bottom of page */
export const SHARED_FEATURES = [
  "Premium Linens & Towels",
  "Luxury Toiletries",
  "High-speed Wi-Fi",
  "In-room Safe",
  "Daily Housekeeping",
  "24 / 7 Room Service",
];

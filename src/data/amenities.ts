export interface AmenityItem {
  icon:   string;   /* Lucide icon key, mapped in AmenitySection */
  label:  string;
  detail: string;   /* editorial sub-line */
}

export interface AmenityCategory {
  id:       string;
  number:   string;
  name:     string;
  tagline:  string;
  image:    string;
  imageAlt: string;
  items:    AmenityItem[];
}

export const AMENITY_CATEGORIES: AmenityCategory[] = [
  {
    id:       "wellness",
    number:   "01",
    name:     "Wellness",
    tagline:  "Restore, recover, reconnect.",
    image:    "/images/Pool_2.jpg",
    imageAlt: "Azara Beach House — infinity pool",
    items: [
      { icon: "thermometer", label: "Infrared Sauna",          detail: "Full-spectrum · Private wellness suite"           },
      { icon: "waves",       label: "Rooftop Infinity Pool",   detail: "Heated · Open-air · Panoramic views"              },
      { icon: "droplets",    label: "Main Chevron Pool",       detail: "Fountain feature · Sunloungers · All day"          },
      { icon: "bath",        label: "Hot Tub / Jacuzzi",       detail: "Therapeutic jets · Available on request"           },
      { icon: "dumbbell",    label: "Fitness Center",          detail: "Premium equipment · Open all hours"                },
    ],
  },
  {
    id:       "dining",
    number:   "02",
    name:     "Dining & Entertainment",
    tagline:  "Curated flavours, open air, any hour.",
    image:    "/images/FOOD_2.jpg",
    imageAlt: "Azara Beach House — private dining",
    items: [
      { icon: "chef-hat",  label: "Private Chef",              detail: "À la carte · Full English · Continental"           },
      { icon: "utensils",  label: "Fully Equipped Kitchen",    detail: "Professional-grade · Open-plan layout"             },
      { icon: "wine",      label: "Bar with Counter",          detail: "Curated spirits · Cocktail & mocktail service"     },
      { icon: "umbrella",  label: "Outdoor Dining Pavilion",   detail: "Alfresco · Candlelit evenings · Gazebo setting"    },
      { icon: "flame",     label: "BBQ / Grill Area",          detail: "Live fire · Chef-attended or self-service"         },
    ],
  },
  {
    id:       "service",
    number:   "03",
    name:     "Service",
    tagline:  "Every request, anticipated.",
    image:    "/images/GAZEBO_2.jpg",
    imageAlt: "Azara Beach House — gazebo",
    items: [
      { icon: "bell",         label: "24/7 Butler Service",     detail: "On-call · Dedicated to your entire stay"          },
      { icon: "sparkles",     label: "Daily Housekeeping",      detail: "Twice-daily service available on request"         },
      { icon: "map-pin",      label: "Concierge & Travel Desk", detail: "Bookings · Tours · Airport transfers"             },
      { icon: "key",          label: "Car Rental Service",      detail: "Curated fleet · Licensed chauffeurs available"    },
      { icon: "shield-check", label: "Full-Day Security",       detail: "Gated property · CCTV · Uniformed personnel"      },
    ],
  },
  {
    id:       "property",
    number:   "04",
    name:     "The Property",
    tagline:  "Space to breathe, space to be.",
    image:    "/images/MAIN BUILDING_3.jpg",
    imageAlt: "Azara Beach House — main building",
    items: [
      { icon: "maximize2",  label: "13,000 Sq. Ft. Plot",        detail: "Standalone villa · Entirely private"              },
      { icon: "leaf",       label: "Tropical Gardens & Pond",    detail: "Manicured · Koi pond · Year-round greenery"       },
      { icon: "home",       label: "Outdoor Lounge Pavilion",    detail: "The Gazebo · Sheltered open-air living space"     },
      { icon: "wifi",       label: "High-speed WiFi",            detail: "Throughout the property · All indoor areas"       },
      { icon: "car",        label: "Free Private Parking",       detail: "Secured · CCTV monitored · Multiple vehicles"     },
    ],
  },
];

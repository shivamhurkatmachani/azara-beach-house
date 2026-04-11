export type GalleryCategory =
  | "all"
  | "exterior"
  | "interiors"
  | "bedrooms"
  | "dining"
  | "lifestyle";

export interface GalleryImage {
  src:      string;
  alt:      string;
  category: Exclude<GalleryCategory, "all">;
  /** Aspect ratio hint for layout: "tall" | "wide" | "square" */
  ratio?:   "tall" | "wide" | "square";
}

export const GALLERY_CATEGORIES: { id: GalleryCategory; label: string }[] = [
  { id: "all",       label: "All"               },
  { id: "exterior",  label: "Exterior & Pools"   },
  { id: "interiors", label: "Interiors"          },
  { id: "bedrooms",  label: "Bedrooms"           },
  { id: "dining",    label: "Dining & Kitchen"   },
  { id: "lifestyle", label: "Lifestyle & Food"   },
];

export const GALLERY_IMAGES: GalleryImage[] = [
  /* ── Exterior & Pools ─────────────────────────────────────── */
  { src: "/images/Pool_1.jpg",           alt: "Azara Beach House — rooftop infinity pool panoramic view",        category: "exterior", ratio: "wide"   },
  { src: "/images/Pool_2.jpg",           alt: "Azara Beach House — chevron pool with fountain feature",          category: "exterior", ratio: "wide"   },
  { src: "/images/Pool_3.jpg",           alt: "Azara Beach House — pool at golden hour",                         category: "exterior", ratio: "wide"   },
  { src: "/images/AZARA_ENTRANCE.jpg",   alt: "Azara Beach House — grand entrance gate",                         category: "exterior", ratio: "wide"   },
  { src: "/images/MAIN BUILDING_1.jpg",  alt: "Azara Beach House — main building facade",                        category: "exterior", ratio: "wide"   },
  { src: "/images/MAIN BUILDING_2.jpg",  alt: "Azara Beach House — villa exterior at dusk",                      category: "exterior", ratio: "wide"   },
  { src: "/images/MAIN BUILDING_3.jpg",  alt: "Azara Beach House — property overview from gardens",              category: "exterior", ratio: "wide"   },
  { src: "/images/MAIN BUILDING_4.JPG",  alt: "Azara Beach House — exterior architecture detail",                category: "exterior", ratio: "square" },
  { src: "/images/PATIO AREA_1.jpg",     alt: "Azara Beach House — patio area with tropical greenery",           category: "exterior", ratio: "wide"   },
  { src: "/images/PARKING 1 .jpg",       alt: "Azara Beach House — secured private parking area",                category: "exterior", ratio: "wide"   },
  { src: "/images/GAZEBO_1.jpg",         alt: "Azara Beach House — outdoor gazebo pavilion",                     category: "exterior", ratio: "wide"   },
  { src: "/images/GAZEBO_2.jpg",         alt: "Azara Beach House — gazebo with evening lighting",                category: "exterior", ratio: "wide"   },

  /* ── Interiors ─────────────────────────────────────────────── */
  { src: "/images/Living Room_1.jpg",    alt: "Azara Beach House — living room with designer furnishings",       category: "interiors", ratio: "wide"   },
  { src: "/images/LIVING ROOM_2.jpg",    alt: "Azara Beach House — open-plan living area",                       category: "interiors", ratio: "wide"   },
  { src: "/images/LIVING ROOM_3.jpg",    alt: "Azara Beach House — lounge area detail",                          category: "interiors", ratio: "wide"   },
  { src: "/images/BAR AREA_1.jpg",       alt: "Azara Beach House — curated bar with counter seating",            category: "interiors", ratio: "wide"   },
  { src: "/images/BAR AREA_2.jpg",       alt: "Azara Beach House — bar area spirits display",                    category: "interiors", ratio: "tall"   },
  { src: "/images/KITCHEN PRIVATE_1.jpg",alt: "Azara Beach House — professional-grade private kitchen",          category: "interiors", ratio: "wide"   },

  /* ── Bedrooms ──────────────────────────────────────────────── */
  { src: "/images/VARUNA_1.jpg",         alt: "Varuna Suite — master bedroom with king bed",                     category: "bedrooms", ratio: "wide"   },
  { src: "/images/VARUNA_2.jpg",         alt: "Varuna Suite — bedroom seating area",                             category: "bedrooms", ratio: "wide"   },
  { src: "/images/VARUNA_3.jpg",         alt: "Varuna Suite — bedroom detail and décor",                         category: "bedrooms", ratio: "square" },
  { src: "/images/VARUNA_4.jpg",         alt: "Varuna Suite — wardrobe and dressing area",                       category: "bedrooms", ratio: "tall"   },
  { src: "/images/VARUNA BATHROOM_1.jpg",alt: "Varuna Suite — ensuite bathroom",                                 category: "bedrooms", ratio: "wide"   },
  { src: "/images/VARUNA BATHROOM_2.jpg",alt: "Varuna Suite — rainfall shower",                                  category: "bedrooms", ratio: "tall"   },
  { src: "/images/VARUNA BATHROOM_3.jpg",alt: "Varuna Suite — bathroom detail",                                  category: "bedrooms", ratio: "square" },
  { src: "/images/LIR_1.jpg",            alt: "Lir Room — serene bedroom with natural light",                    category: "bedrooms", ratio: "wide"   },
  { src: "/images/LIR_2.jpg",            alt: "Lir Room — bed and soft furnishings",                             category: "bedrooms", ratio: "wide"   },
  { src: "/images/LIR_3.jpg",            alt: "Lir Room — room atmosphere at dusk",                              category: "bedrooms", ratio: "square" },
  { src: "/images/LIR_4.jpg",            alt: "Lir Room — décor detail",                                         category: "bedrooms", ratio: "tall"   },
  { src: "/images/LIR BATHROOM_1.jpg",   alt: "Lir Room — ensuite bathroom",                                    category: "bedrooms", ratio: "wide"   },
  { src: "/images/LIR BATHROOM_2.jpg",   alt: "Lir Room — bathroom fittings detail",                            category: "bedrooms", ratio: "tall"   },
  { src: "/images/MAZU_3.jpg",           alt: "Mazu Room — bedroom with pool view",                              category: "bedrooms", ratio: "wide"   },
  { src: "/images/MAZU_4.jpg",           alt: "Mazu Room — bedroom décor",                                       category: "bedrooms", ratio: "square" },
  { src: "/images/MAZU BATHROOM_1.jpg",  alt: "Mazu Room — bathroom",                                           category: "bedrooms", ratio: "wide"   },
  { src: "/images/MAZU BATHROOM_2.jpg",  alt: "Mazu Room — bath and fittings",                                   category: "bedrooms", ratio: "tall"   },
  { src: "/images/MAZU BATHROOM_3.jpg",  alt: "Mazu Room — bathroom detail",                                     category: "bedrooms", ratio: "square" },
  { src: "/images/SUJIN_1.jpg",          alt: "Sujin Room — bedroom interior",                                   category: "bedrooms", ratio: "wide"   },
  { src: "/images/SUJIN_2.jpg",          alt: "Sujin Room — bed and furnishings",                                category: "bedrooms", ratio: "wide"   },
  { src: "/images/SUJIN_3.jpg",          alt: "Sujin Room — room detail",                                        category: "bedrooms", ratio: "square" },
  { src: "/images/SUJIN_4.jpg",          alt: "Sujin Room — décor and wardrobe",                                 category: "bedrooms", ratio: "tall"   },
  { src: "/images/SUJIN BATHROOM_1.jpg", alt: "Sujin Room — ensuite bathroom",                                   category: "bedrooms", ratio: "wide"   },
  { src: "/images/SUJIN BATHROOM_2.jpg", alt: "Sujin Room — shower and fittings",                                category: "bedrooms", ratio: "tall"   },
  { src: "/images/SUJIN BATHROOM_3.jpg", alt: "Sujin Room — bathroom detail",                                    category: "bedrooms", ratio: "square" },
  { src: "/images/EZILI_1.jpg",          alt: "Ezili Room — cozy bedroom",                                       category: "bedrooms", ratio: "wide"   },
  { src: "/images/EZILI_2.jpg",          alt: "Ezili Room — bed and soft furnishings",                            category: "bedrooms", ratio: "wide"   },
  { src: "/images/EZILI_3.jpg",          alt: "Ezili Room — room atmosphere",                                     category: "bedrooms", ratio: "square" },
  { src: "/images/EZILI_4.jpg",          alt: "Ezili Room — décor detail",                                        category: "bedrooms", ratio: "tall"   },
  { src: "/images/EZILI BATHROOM_1.jpg", alt: "Ezili Room — ensuite bathroom",                                   category: "bedrooms", ratio: "wide"   },
  { src: "/images/EZILI BATHROOM_2.jpg", alt: "Ezili Room — bathroom fittings",                                  category: "bedrooms", ratio: "tall"   },

  /* ── Dining & Kitchen ─────────────────────────────────────── */
  { src: "/images/DINING AREA_1.jpg",    alt: "Azara Beach House — alfresco dining pavilion set for dinner",     category: "dining", ratio: "wide"   },
  { src: "/images/DINING AREA_2.jpg",    alt: "Azara Beach House — dining table detail with candlelight",        category: "dining", ratio: "wide"   },
  { src: "/images/FOOD_1.jpg",           alt: "Azara Beach House — private chef breakfast spread",               category: "dining", ratio: "wide"   },
  { src: "/images/FOOD_2.jpg",           alt: "Azara Beach House — artisanal plating",                           category: "dining", ratio: "square" },

  /* ── Lifestyle & Food ─────────────────────────────────────── */
  { src: "/images/FOOD_3.jpg",           alt: "Azara Beach House — Goan cuisine with fresh produce",             category: "lifestyle", ratio: "square" },
  { src: "/images/FOOD_4.jpg",           alt: "Azara Beach House — cocktail and mocktail service",               category: "lifestyle", ratio: "tall"   },
  { src: "/images/FOOD_5.jpg",           alt: "Azara Beach House — poolside refreshments",                       category: "lifestyle", ratio: "square" },
  { src: "/images/FOOD_6.jpg",           alt: "Azara Beach House — chef-prepared continental breakfast",         category: "lifestyle", ratio: "wide"   },
  { src: "/images/FOOD_7.JPG",           alt: "Azara Beach House — tropical fruit platter",                      category: "lifestyle", ratio: "square" },
  { src: "/images/FOOD_8.JPG",           alt: "Azara Beach House — evening drinks by the pool",                  category: "lifestyle", ratio: "tall"   },
  { src: "/images/FOOD_9.JPG",           alt: "Azara Beach House — BBQ grill spread",                            category: "lifestyle", ratio: "square" },
  { src: "/images/FOOD_10.JPG",          alt: "Azara Beach House — dessert plating",                             category: "lifestyle", ratio: "wide"   },
  { src: "/images/FOOD_11.JPG",          alt: "Azara Beach House — fresh Goan seafood",                          category: "lifestyle", ratio: "square" },
  { src: "/images/FOOD_12.jpg",          alt: "Azara Beach House — curated wine selection",                      category: "lifestyle", ratio: "tall"   },
  { src: "/images/FOOD_13.jpg",          alt: "Azara Beach House — poolside dining setup",                       category: "lifestyle", ratio: "wide"   },
  { src: "/images/FOOD_14.jpg",          alt: "Azara Beach House — chef at work in the kitchen",                 category: "lifestyle", ratio: "square" },
  { src: "/images/Mazu_1.jpg",           alt: "Mazu Room — lifestyle shot, morning light",                       category: "lifestyle", ratio: "wide"   },
  { src: "/images/MAZU_2.jpg",           alt: "Azara Beach House — villa morning lifestyle",                     category: "lifestyle", ratio: "wide"   },
  { src: "/images/EZILI BATHROOM_3.jpg", alt: "Ezili Room — spa-like bathroom morning",                          category: "lifestyle", ratio: "wide"   },
  { src: "/images/EZILI BATHROOM_4.jpg", alt: "Ezili Room — bathroom with natural light",                        category: "lifestyle", ratio: "tall"   },
];

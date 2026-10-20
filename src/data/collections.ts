import { clientImages } from './images';

export interface Collection {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  focal?: string;
  featured?: boolean;
}

export const collections: Collection[] = [
  {
    id: 'crushed-diamond',
    slug: 'crushed-diamond',
    name: 'Crushed Diamond',
    tagline: 'Signature High-Shine Crystal Pieces',
    description: 'Each piece features thousands of precision-cut crushed crystals sealed behind bevelled optical glass, catching every beam of daylight.',
    image: clientImages.heroLivingRoom.src,
    imageAlt: clientImages.heroLivingRoom.alt,
    featured: true,
  },
  {
    id: 'mirrored-furniture',
    slug: 'mirrored-furniture',
    name: 'Mirrored Furniture',
    tagline: 'Bevelled Venetian Reflections',
    description: 'Brighten and expand your interiors with hand-finished bevelled mirrors, consoles, tallboys, and glass cabinets.',
    image: clientImages.veniceDisplayCabinet.src,
    imageAlt: clientImages.veniceDisplayCabinet.alt,
    featured: true,
  },
  {
    id: 'dining-sets',
    slug: 'dining-sets',
    name: 'Dining Sets',
    tagline: 'Statement Ariana Marble & Velvet',
    description: 'Showstopper dining suites featuring heavy veined marble tops, polished chrome C-pedestals, and plush knockerback velvet chairs.',
    image: clientImages.heroShowroomDining.src,
    imageAlt: clientImages.heroShowroomDining.alt,
    featured: true,
  },
  {
    id: 'living-room-tv-units',
    slug: 'living-room-tv-units',
    name: 'Living Room & TV Units',
    tagline: 'Centrepieces For Modern Living',
    description: 'From 150cm crushed diamond media consoles to matching coffee tables and sideboards designed to elevate your lounge.',
    image: clientImages.crushedDiamondTvUnitLarge.src,
    imageAlt: clientImages.crushedDiamondTvUnitLarge.alt,
    featured: true,
  },
  {
    id: 'fireplaces',
    slug: 'fireplaces',
    name: 'Fireplaces',
    tagline: 'Electric Flames in Crystal Surrounds',
    description: 'Warm your home with breathtaking crystal fireplace suites featuring realistic flickering LED flames and adjustable heat controls.',
    image: clientImages.heroFireplace.src,
    imageAlt: clientImages.heroFireplace.alt,
    featured: true,
  },
  {
    id: 'chairs-seating',
    slug: 'chairs-seating',
    name: 'Chairs & Seating',
    tagline: 'Deep Buttoned Lion Knockerbacks',
    description: 'Opulent brushed velvet dining chairs and matching dining benches with polished chrome lion-head door knockers and studding.',
    image: clientImages.knightsbridgeChairsCollection.src,
    imageAlt: clientImages.knightsbridgeChairsCollection.alt,
    featured: true,
  },
  {
    id: 'lighting-decor',
    slug: 'lighting-decor',
    name: 'Lighting & Décor',
    tagline: 'Crystal Floor Lamps, Mirrors & Clocks',
    description: 'Tiered crushed diamond floor lamps, backlit LED wall mirrors, and oversized 90cm mirrored clocks for the finishing touch.',
    image: clientImages.crushedDiamondStackedFloorLamp.src,
    imageAlt: clientImages.crushedDiamondStackedFloorLamp.alt,
    featured: true,
  },
  {
    id: 'clearance',
    slug: 'clearance',
    name: 'Clearance & Outlet',
    tagline: 'Showroom Specials Up to 40% Off',
    description: 'Last-chance ex-display and overstock showstoppers with immediate nationwide dispatch or local showroom collection.',
    image: clientImages.crushedDiamondLandscapeMirror.src,
    imageAlt: clientImages.crushedDiamondLandscapeMirror.alt,
    featured: false,
  },
];

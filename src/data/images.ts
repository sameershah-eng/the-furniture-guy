export interface RegisteredImage {
  src: string;
  alt: string;
  focal?: string;
  source: 'client' | 'unsplash';
}

export const clientImages = {
  // Hero & Showcase
  heroShowroomDining: {
    src: '/images/client/hero-showroom-dining-set.jpg',
    alt: 'The Furniture Guy showroom featuring crushed diamond round dining table with studded black velvet chairs',
    focal: 'center 40%',
    source: 'client',
  } as RegisteredImage,

  heroLivingRoom: {
    src: '/images/client/crushed-diamond-mirrored-coffee-table-living-room.jpg',
    alt: 'Crushed diamond mirrored coffee table styled in a luxury living room with white roses',
    focal: 'center center',
    source: 'client',
  } as RegisteredImage,

  heroFireplace: {
    src: '/images/client/crushed-diamond-fireplace-electric-flame.jpg',
    alt: 'Crushed diamond fireplace surround with realistic electric flame and ambient LED glow',
    focal: 'center 35%',
    source: 'client',
  } as RegisteredImage,

  // Products
  veniceDisplayCabinet: {
    src: '/images/client/venice-mirrored-display-cabinet-led.jpg',
    alt: 'Venice mirrored display cabinet with integrated LED lights and crushed diamond pillars',
    focal: 'center center',
    source: 'client',
  } as RegisteredImage,

  heartConsoleTable: {
    src: '/images/client/heart-console-table-led-crushed-diamond.jpg',
    alt: 'Heart console table with LED light up center and sparkling crushed diamond inlay',
    focal: 'center 30%',
    source: 'client',
  } as RegisteredImage,

  crushedDiamondTvUnitLarge: {
    src: '/images/client/crushed-diamond-3-drawer-tv-unit-150cm.jpg',
    alt: 'Large 150cm crushed diamond mirrored TV unit with 3 bevelled glass drawers',
    focal: 'center center',
    source: 'client',
  } as RegisteredImage,

  crushedDiamondTvUnitRange: {
    src: '/images/client/mirrored-crushed-diamond-tv-unit-large-small.jpg',
    alt: 'Crushed diamond mirrored TV unit range with silver wooden edges and crystal handles',
    focal: 'center center',
    source: 'client',
  } as RegisteredImage,

  crushedDiamondTvUnitCompact: {
    src: '/images/client/mirrored-tv-unit-crushed-diamond-120cm.jpg',
    alt: 'Mirrored 120cm TV unit with crushed diamond double cupboards and center media shelf',
    focal: 'center center',
    source: 'client',
  } as RegisteredImage,

  mirrored5DrawerTallboy: {
    src: '/images/client/mirrored-5-drawer-crushed-diamond-tallboy.jpg',
    alt: 'Glam 5-drawer mirrored tallboy chest with crushed crystal drawer panels',
    focal: 'center 20%',
    source: 'client',
  } as RegisteredImage,

  crushedDiamondSideboard3Drawer: {
    src: '/images/client/crushed-diamond-3-drawer-sideboard.jpg',
    alt: 'Crushed diamond 3-drawer 2-door mirrored sideboard credenza',
    focal: 'center center',
    source: 'client',
  } as RegisteredImage,

  crushedDiamondLuxurySideboard: {
    src: '/images/client/crushed-diamond-luxury-sideboard.jpg',
    alt: 'Luxury 4-door mirrored sideboard with crushed crystal panels',
    focal: 'center center',
    source: 'client',
  } as RegisteredImage,

  crushedDiamondCoffeeTableRect: {
    src: '/images/client/crushed-diamond-rectangular-coffee-table.jpg',
    alt: 'Crushed diamond and mirrored rectangular coffee table with lower display shelf',
    focal: 'center center',
    source: 'client',
  } as RegisteredImage,

  arianaMarbleDiningSet: {
    src: '/images/client/styled-home-marble-dining-room.jpg',
    alt: 'Ariana marble dining table with 6 grey velvet knockerback chairs in client home',
    focal: 'center 45%',
    source: 'client',
  } as RegisteredImage,

  arianaMarbleTableDoubleC: {
    src: '/images/client/ariana-marble-dining-table.jpg',
    alt: 'Ariana luxury grey marble dining table with polished chrome double C pedestal base',
    focal: 'center center',
    source: 'client',
  } as RegisteredImage,

  arianaMarbleBenchSet: {
    src: '/images/client/ariana-marble-dining-table-bench-set.jpg',
    alt: 'Ariana marble dining table paired with plush button-tufted grey dining bench and chairs',
    focal: 'center center',
    source: 'client',
  } as RegisteredImage,

  arianaMarbleCoffeeTable: {
    src: '/images/client/ariana-marble-coffee-table.jpg',
    alt: 'Ariana marble coffee table with curved chrome support legs',
    focal: 'center center',
    source: 'client',
  } as RegisteredImage,

  arianaMarbleLampTable: {
    src: '/images/client/ariana-marble-square-lamp-table.jpg',
    alt: 'Ariana marble square lamp table with polished chrome pedestal',
    focal: 'center center',
    source: 'client',
  } as RegisteredImage,

  knightsbridgeChairsCollection: {
    src: '/images/client/knightsbridge-lion-knocker-velvet-chairs.jpg',
    alt: 'Knightsbridge lion knocker velvet dining chairs in grey, blush, black, cream and navy',
    focal: 'center center',
    source: 'client',
  } as RegisteredImage,

  // Mirrors
  crushedDiamondPortraitMirror: {
    src: '/images/client/crushed-diamond-portrait-mirror-120x80.jpg',
    alt: 'Bevelled crushed diamond wall mirror portrait 120cm x 80cm',
    focal: 'center center',
    source: 'client',
  } as RegisteredImage,

  crushedDiamondLandscapeMirror: {
    src: '/images/client/crushed-diamond-landscape-mirror-120x80.jpg',
    alt: 'Bevelled crushed diamond wall mirror landscape 120cm x 80cm',
    focal: 'center center',
    source: 'client',
  } as RegisteredImage,

  crushedDiamondLedMirror: {
    src: '/images/client/crushed-diamond-led-wall-mirror.jpg',
    alt: 'Backlit crushed diamond wall mirror with ambient touch LED border',
    focal: 'center center',
    source: 'client',
  } as RegisteredImage,

  crystalFullLengthMirror: {
    src: '/images/client/crystal-full-length-mirror-180x70cm.jpg',
    alt: 'Large crystal full length leaner mirror 180cm x 70cm',
    focal: 'center center',
    source: 'client',
  } as RegisteredImage,

  heartIlluminatedMirror: {
    src: '/images/client/heart-crushed-diamond-illuminated-mirror.jpg',
    alt: 'Heart shaped illuminated crushed diamond vanity wall mirror with bottom shelf',
    focal: 'center center',
    source: 'client',
  } as RegisteredImage,

  sunburstRoundMirror: {
    src: '/images/client/sunburst-round-crushed-diamond-wall-mirror.jpg',
    alt: 'Round sunburst mirrored wall mirror with multi-faceted crystal prisms',
    focal: 'center center',
    source: 'client',
  } as RegisteredImage,

  mirroredWallClock90cm: {
    src: '/images/client/mirrored-crushed-diamond-wall-clock-90cm.jpg',
    alt: 'Large square 90cm mirrored wall clock with crushed diamond face and Roman numerals',
    focal: 'center center',
    source: 'client',
  } as RegisteredImage,

  // Lighting
  crushedDiamondFloorLamp: {
    src: '/images/client/crushed-diamond-floor-lamp.jpg',
    alt: 'Crushed diamond standing floor lamp with silk white square shade',
    focal: 'center 40%',
    source: 'client',
  } as RegisteredImage,

  crushedDiamondTieredFloorLamp: {
    src: '/images/client/crushed-diamond-tiered-floor-lamp.jpg',
    alt: 'Tiered crushed diamond column floor lamp',
    focal: 'center 40%',
    source: 'client',
  } as RegisteredImage,

  crushedDiamondStackedFloorLamp: {
    src: '/images/client/crushed-diamond-stacked-floor-lamp.jpg',
    alt: 'Stacked geometric crushed crystal floor lamp with square shade',
    focal: 'center 40%',
    source: 'client',
  } as RegisteredImage,

  crushedDiamondTableLampBlackShade: {
    src: '/images/client/crushed-diamond-table-lamp-black-shade.jpg',
    alt: 'Crushed diamond table lamp with black pleated drum shade',
    focal: 'center center',
    source: 'client',
  } as RegisteredImage,

  crushedDiamondColumnTableLamp: {
    src: '/images/client/crushed-diamond-column-table-lamp.jpg',
    alt: 'Crushed crystal column table lamp with ivory fabric shade',
    focal: 'center center',
    source: 'client',
  } as RegisteredImage,

  crushedDiamondPillarTableLamp: {
    src: '/images/client/crushed-diamond-pillar-table-lamp.jpg',
    alt: 'Pillar crushed diamond bedside and table lamp',
    focal: 'center center',
    source: 'client',
  } as RegisteredImage,

  mirroredZTableLamp: {
    src: '/images/client/mirrored-z-table-lamp.jpg',
    alt: 'Modern architectural Z-shape mirrored table lamp with crushed diamond stem',
    focal: 'center center',
    source: 'client',
  } as RegisteredImage,

  crushedDiamondGeometricTableLamp: {
    src: '/images/client/crushed-diamond-geometric-table-lamp.jpg',
    alt: 'Geometric multi-tier crushed crystal accent table lamp',
    focal: 'center center',
    source: 'client',
  } as RegisteredImage,

  mirroredRectangularCrystalLamp: {
    src: '/images/client/mirrored-rectangular-crystal-lamp.jpg',
    alt: 'Mirrored rectangular crystal table lamp with flared shade',
    focal: 'center center',
    source: 'client',
  } as RegisteredImage,

  // Décor & Gifts
  crushedDiamondDecanterSet: {
    src: '/images/client/crushed-diamond-luxury-decanter-gift-set.jpg',
    alt: 'Luxury crushed crystal champagne decanter and 2 crystal glasses gift set',
    focal: 'center center',
    source: 'client',
  } as RegisteredImage,

  crushedDiamondWhiskeySet: {
    src: '/images/client/crushed-diamond-whiskey-bottle-gift-set.jpg',
    alt: 'Crushed crystal whiskey bottle and tumbler presentation gift set',
    focal: 'center center',
    source: 'client',
  } as RegisteredImage,

  // Lifestyle & Styled Real Homes
  styledCrushedDiamondLivingRoom: {
    src: '/images/client/styled-crushed-diamond-living-room.jpg',
    alt: 'Real UK home styled with King of Bling coffee table, TV unit, and crystal mirrors',
    focal: 'center center',
    source: 'client',
  } as RegisteredImage,

  styledArianaMarbleDining: {
    src: '/images/client/ariana-marble-dining-table-grey-chairs.jpg',
    alt: 'Real customer dining room with Ariana marble table and grey velvet chairs',
    focal: 'center center',
    source: 'client',
  } as RegisteredImage,

  styledArianaBenchRoom: {
    src: '/images/client/ariana-marble-bench-coffee-table.jpg',
    alt: 'Ariana marble range styled together with matching bench and coffee table',
    focal: 'center center',
    source: 'client',
  } as RegisteredImage,

  crushedDiamondMirrorBeveled: {
    src: '/images/client/crushed-diamond-mirror-beveled.jpg',
    alt: 'Hand-finished bevelled crushed diamond statement wall mirror',
    focal: 'center center',
    source: 'client',
  } as RegisteredImage,

  crushedDiamondGeometricBorderMirror: {
    src: '/images/client/crushed-diamond-geometric-border-mirror.jpg',
    alt: 'Geometric stepped crushed diamond wall mirror 120 x 80 cm',
    focal: 'center center',
    source: 'client',
  } as RegisteredImage,
};

// High quality curated Unsplash backups (marked with TODO comment as requested)
export const backupImages = {
  // TODO: replace with client photo
  velvetWingbackChairPink: {
    src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
    alt: 'Blush pink plush velvet wingback accent chair with gold legs',
    focal: 'center center',
    source: 'unsplash',
  } as RegisteredImage,

  // TODO: replace with client photo
  crystalChandelier: {
    src: 'https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?auto=format&fit=crop&w=1200&q=80',
    alt: 'Cascading crystal chandelier catching the warm light',
    focal: 'center center',
    source: 'unsplash',
  } as RegisteredImage,

  // TODO: replace with client photo
  monacoConsoleTable: {
    src: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    alt: 'Modern minimalist mirrored console table with floral arrangement',
    focal: 'center center',
    source: 'unsplash',
  } as RegisteredImage,
};

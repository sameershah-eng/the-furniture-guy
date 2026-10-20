export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  review: string;
  productPurchased: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'test-01',
    name: 'Gemma & Mark S.',
    location: 'Cheshire',
    rating: 5,
    date: '2 weeks ago',
    review: 'We ordered the Ariana marble dining table with the grey lion knocker chairs. Words cannot describe how stunning it is in real life! The delivery team brought it into our dining room and set it up carefully. Everyone who visits stops and stares.',
    productPurchased: 'Ariana Grey Marble Dining Table with 6 Knockerback Chairs',
  },
  {
    id: 'test-02',
    name: 'Chloe L.',
    location: 'Manchester',
    rating: 5,
    date: '1 month ago',
    review: 'King of Bling never disappoints! Purchased the 150cm Crushed Diamond TV unit and matching coffee table. The sparkle in the evening when the lamp is on is unbelievable. The Furniture Guy is the real deal.',
    productPurchased: 'Crushed Diamond 3-Drawer Mirrored TV Unit (150cm)',
  },
  {
    id: 'test-03',
    name: 'Danielle H.',
    location: 'Liverpool',
    rating: 5,
    date: '3 weeks ago',
    review: 'Had my eye on the Diamond Crush electric fireplace for months. Finally ordered it and it arrived in 3 days. The remote control flame effect makes the room feel so cozy and glam. Best purchase we’ve made this year.',
    productPurchased: 'Diamond Crush Fireplace Surround with LED Flame',
  },
  {
    id: 'test-04',
    name: 'Kelly M.',
    location: 'Birmingham',
    rating: 5,
    date: 'Last month',
    review: 'The Heart Console table with the LED light up is sensational in our hallway. Great communication on WhatsApp beforehand to verify measurements, and delivery was smooth with full tracking.',
    productPurchased: 'Heart Console Table with Illuminated Crushed Diamond Center',
  },
  {
    id: 'test-05',
    name: 'Sophie & Darren T.',
    location: 'Leeds',
    rating: 5,
    date: '2 months ago',
    review: 'Got the 180cm crystal leaner mirror and Venice display cabinet. True showroom quality at half the price of high street boutiques. Hand-finished crystals and flawless mirror panels.',
    productPurchased: 'Venice Mirrored Display Cabinet with LED Lights',
  },
  {
    id: 'test-06',
    name: 'Rachel B.',
    location: 'Bolton',
    rating: 5,
    date: '2 months ago',
    review: 'Visited the showroom in person after finding them on Facebook. The owner was so friendly, showed us around all the collections with no pressure. Ended up buying the whole living room set!',
    productPurchased: 'Living Room Crushed Diamond Suite',
  },
];

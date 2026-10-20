export interface SiteConfig {
  businessName: string;
  subBrand: string;
  tagline: string;
  description: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  email: string;
  address: string;
  showroomLocation: string;
  openingHours: string;
  facebook: string;
  currency: string;
  currencySymbol: string;
  freeDeliveryThreshold: number;
  expressDeliveryCost: number;
  formEndpoint: string;
}

export const siteConfig: SiteConfig = {
  businessName: "The Furniture Guy",
  subBrand: "King of Bling",
  tagline: "Glam furniture that catches the light",
  description: "Britain's premier destination for luxury mirrored furniture, crushed diamond fireplaces, marble dining sets, and bespoke glam home décor.",
  phone: "+441613270654",
  phoneDisplay: "0161 327 0654",
  whatsapp: "447494000000",
  email: "sales@thefurnitureguy.co.uk",
  address: "King of Bling Showroom Emporium, Greater Manchester, UK",
  showroomLocation: "Greater Manchester & North West Delivery",
  openingHours: "Mon – Sat: 10:00 – 18:00 | Sunday: Viewing by Appointment",
  facebook: "https://www.facebook.com/thefurnitureguy.co.uk/",
  currency: "GBP",
  currencySymbol: "£",
  freeDeliveryThreshold: 499,
  expressDeliveryCost: 49.99,
  formEndpoint: "", // Configurable POST endpoint (e.g. Formspree/Zapier). Falls back to localStorage.
};

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Delivery' | 'Showroom' | 'Payment' | 'Care';
}

export const faqs: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Can I view the furniture in person before ordering?',
    answer: 'Absolutely! We welcome customers to our King of Bling showroom emporium in Greater Manchester. You can browse our full mirrored, crushed diamond, and marble suites in person. We also offer private 1-on-1 consultations and live WhatsApp video viewings if you are further afield.',
    category: 'Showroom',
  },
  {
    id: 'faq-2',
    question: 'How does delivery work and is it free?',
    answer: 'We provide Free Local Delivery on orders over £499 throughout Greater Manchester, Cheshire, Merseyside, and Lancashire with our own dedicated two-man delivery fleet. For nationwide UK orders, we offer express pallet and specialist courier delivery from £49.99.',
    category: 'Delivery',
  },
  {
    id: 'faq-3',
    question: 'Can I secure an order with a deposit and pay on delivery?',
    answer: 'Yes! As advertised on our Facebook showroom page, you can reserve select in-stock showpieces with as little as a £20 deposit, with the remaining balance settled securely upon delivery or showroom collection.',
    category: 'Payment',
  },
  {
    id: 'faq-4',
    question: 'Do you offer white-glove assembly services?',
    answer: 'Yes. Most of our pieces—including our tallboys, consoles, and bedside units—arrive fully assembled. For heavy marble dining tables and display cabinets, our two-man team can unbox, position in your room of choice, and assemble for a small optional fee at checkout.',
    category: 'Delivery',
  },
  {
    id: 'faq-5',
    question: 'How do I care for and clean crushed diamond and mirrored furniture?',
    answer: 'Our crushed diamond crystals are hermetically encased behind crystal-clear bevelled glass panels, which means dust never penetrates the crystals. Clean effortlessly using a soft microfibre cloth and standard ammonia-free glass cleaner. Avoid abrasive scouring pads.',
    category: 'Care',
  },
  {
    id: 'faq-6',
    question: 'Do the electric fireplaces require a chimney or flue?',
    answer: 'None at all! Our crushed diamond fireplace suites are 100% freestanding electric units. You simply plug them into any standard UK 3-pin wall socket. The flame effect and heater operate independently, so you can enjoy the ambient glow throughout the summer months without heat.',
    category: 'Care',
  },
  {
    id: 'faq-7',
    question: 'What happens if a mirrored item arrives damaged?',
    answer: 'We use reinforced wooden crates and multi-layer shock foam packaging. In the rare event of transit damage, our two-man team inspects the goods with you upon arrival. If an issue is noted, we immediately swap or replace the piece at zero charge to you.',
    category: 'Delivery',
  },
];

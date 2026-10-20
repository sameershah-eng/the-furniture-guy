import React from 'react';
import { Sparkles } from 'lucide-react';
import { siteConfig } from '@/config/site';

const reasons = [
  {
    num: '01',
    title: 'True Showroom Quality, Direct From The Source',
    description: 'We cut out the lavish central London showroom overheads. You receive hand-finished, heavy Venetian mirrored and crushed diamond furniture built to last, at prices that beat traditional high-street luxury retailers.',
  },
  {
    num: '02',
    title: 'Two-Man White Glove Delivery Direct to Your Room',
    description: 'We never dump heavy mirrors or stone tables at your front kerb on a wooden pallet. Our dedicated two-man delivery team carries your items safely into your room of choice, ready for immediate inspection.',
  },
  {
    num: '03',
    title: 'Precision-Cut Optical Crystals, Never Plastic Glitter',
    description: 'The sparkle of genuine King of Bling furniture is unmistakable. We use thousands of real multifaceted glass crystals hermetically sealed beneath bevelled glass that catches and refracts every beam of light.',
  },
  {
    num: '04',
    title: 'Reserve Any Showpiece With Just a £20 Deposit',
    description: 'Order with complete peace of mind. As featured across our Facebook showroom emporium, you can secure select in-stock dining tables, TV units, or fireplaces with just £20, paying the balance upon inspection.',
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-white border-y border-[#EEE8E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#9F7453] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A27E]" />
            The King of Bling Difference
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1C1B1F]">
            Why thousands of British homes trust The Furniture Guy
          </h2>
        </div>

        {/* Numbered Editorial List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {reasons.map((item) => (
            <div
              key={item.num}
              className="group flex flex-col sm:flex-row items-start gap-6 pb-8 border-b border-[#EEE8E1]"
            >
              <span className="font-serif text-4xl sm:text-5xl text-[#C9A27E] font-medium leading-none shrink-0 group-hover:text-[#9F7453] transition-colors">
                {item.num}
              </span>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-[#1C1B1F] group-hover:text-[#9F7453] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B6670] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

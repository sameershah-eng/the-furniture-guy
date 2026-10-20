import React, { useState } from 'react';
import { X, PhoneCall, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { saveFormSubmission } from '@/lib/utils';
import { siteConfig } from '@/config/site';

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
}

export const CallbackModal: React.FC<CallbackModalProps> = ({
  isOpen,
  onClose,
  productName,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredTime, setPreferredTime] = useState<'morning' | 'afternoon' | 'evening'>('afternoon');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [refId, setRefId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setIsSubmitting(true);
    const newRefId = `CB-${Math.floor(10000 + Math.random() * 90000)}`;

    setTimeout(() => {
      saveFormSubmission('callback', {
        refId: newRefId,
        name,
        phone,
        preferredTime,
        productName: productName || 'General Enquiry',
        notes,
      });

      setRefId(newRefId);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setNotes('');
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1C1B1F]/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[#FBF9F6] rounded-2xl shadow-2xl border border-[#EEE8E1] overflow-hidden relative">
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 p-2 text-[#6B6670] hover:text-[#1C1B1F] rounded-full hover:bg-[#EEE8E1]/50 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 bg-[#E8D3B9]/30 rounded-lg text-[#9F7453]">
                <PhoneCall className="w-5 h-5" />
              </span>
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#9F7453]">
                Direct Showroom Specialist
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1C1B1F] mb-1">
              Request a Call Back
            </h3>
            <p className="text-xs sm:text-sm text-[#6B6670] mb-6">
              {productName
                ? `Discuss delivery, dimensions, and styling for ${productName}.`
                : 'Speak directly with our showroom team about delivery schedules, stock availability, or bespoke orders.'}
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1C1B1F] mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full px-4 py-2.5 bg-white border border-[#EEE8E1] rounded-lg text-sm text-[#1C1B1F] placeholder:text-[#A19DA8] focus:outline-none focus:border-[#C9A27E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1C1B1F] mb-1.5">
                  UK Contact Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 07700 900123"
                  className="w-full px-4 py-2.5 bg-white border border-[#EEE8E1] rounded-lg text-sm text-[#1C1B1F] placeholder:text-[#A19DA8] focus:outline-none focus:border-[#C9A27E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1C1B1F] mb-1.5">
                  Preferred Time of Call
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'morning', label: 'Morning', time: '10:00 – 12:00' },
                    { id: 'afternoon', label: 'Afternoon', time: '12:00 – 16:00' },
                    { id: 'evening', label: 'Evening', time: '16:00 – 18:00' },
                  ].map((slot) => (
                    <button
                      type="button"
                      key={slot.id}
                      onClick={() => setPreferredTime(slot.id as any)}
                      className={`p-2.5 rounded-lg border text-center transition-all ${
                        preferredTime === slot.id
                          ? 'border-[#9F7453] bg-white shadow-sm'
                          : 'border-[#EEE8E1] bg-white/60 hover:bg-white text-[#6B6670]'
                      }`}
                    >
                      <span className="block text-xs font-bold text-[#1C1B1F]">{slot.label}</span>
                      <span className="block text-[10px] text-[#6B6670] mt-0.5">{slot.time}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1C1B1F] mb-1.5">
                  Questions or Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Can you deliver to Cheshire next Thursday? Do you assemble the marble table?"
                  className="w-full px-4 py-2 bg-white border border-[#EEE8E1] rounded-lg text-sm text-[#1C1B1F] placeholder:text-[#A19DA8] focus:outline-none focus:border-[#C9A27E] resize-none"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <span className="text-[11px] text-[#6B6670] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#C9A27E]" />
                Typical response &lt; 30 mins
              </span>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-gradient-to-r from-[#E8D3B9] via-[#D9A89A] to-[#C9A27E] text-[#1C1B1F] font-semibold text-xs tracking-wider uppercase rounded-lg hover:brightness-105 transition-all shadow-md active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Request Call'}
              </button>
            </div>
          </form>
        ) : (
          <div className="p-8 text-center">
            <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#9F7453]">
              Request Received
            </span>
            <h3 className="font-serif text-3xl font-medium text-[#1C1B1F] mt-1 mb-2">
              We'll Call You Shortly
            </h3>
            <p className="text-sm text-[#6B6670] mb-4 max-w-sm mx-auto">
              Thank you, <span className="font-semibold text-[#1C1B1F]">{name}</span>. One of our specialists will call you on{' '}
              <span className="font-semibold text-[#1C1B1F]">{phone}</span> during the {preferredTime}.
            </p>
            <div className="inline-block px-4 py-2 bg-white rounded-lg border border-[#EEE8E1] text-xs text-[#1C1B1F] font-mono mb-6">
              Reference: <span className="font-bold text-[#9F7453]">{refId}</span>
            </div>

            <div>
              <button
                onClick={handleReset}
                className="w-full py-2.5 bg-[#1C1B1F] text-white text-xs font-semibold rounded-lg hover:bg-black transition-colors"
              >
                Return to Browsing
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

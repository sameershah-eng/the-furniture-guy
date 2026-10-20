import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Video, ArrowRight, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { saveFormSubmission } from '@/lib/utils';

export const ShowroomBanner: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [visitType, setVisitType] = useState('Showroom Visit');
  const [preferredDate, setPreferredDate] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleMiniSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    saveFormSubmission('quick_booking', {
      name,
      phone,
      visitType,
      preferredDate: preferredDate || 'Flexible this week',
    });

    setSubmitted(true);
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-r from-[#F7E7E1]/80 via-[#FBF9F6] to-[#ECEAF2]/80 border-b border-[#EEE8E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-[#EEE8E1] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-4">
            <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#9F7453] flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#C9A27E]" />
              King of Bling Emporium
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1C1B1F] leading-tight">
              See the sparkle for yourself. Book your showroom viewing.
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6670] leading-relaxed">
              Step into our Greater Manchester gallery to test the comfort of our lion-knocker velvet chairs, admire the marble grain under lighting, and inspect crushed diamond fireplaces before deciding.
            </p>

            <div className="pt-2 flex items-center gap-6 text-xs text-[#1C1B1F] font-semibold">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#9F7453]" />
                <span>Mon – Sat: 10:00 – 18:00</span>
              </div>
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-[#9F7453]" />
                <span>Live WhatsApp video call option</span>
              </div>
            </div>
          </div>

          {/* Right Mini-Booking Form */}
          <div className="lg:col-span-6 bg-[#FBF9F6] p-6 sm:p-8 rounded-2xl border border-[#EEE8E1]">
            {!submitted ? (
              <form onSubmit={handleMiniSubmit} className="space-y-4">
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#1C1B1F]">
                  Quick Showroom Reservation
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1C1B1F] mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Jessica Miller"
                      className="w-full px-3.5 py-2 bg-white border border-[#EEE8E1] rounded-lg text-xs text-[#1C1B1F] focus:outline-none focus:border-[#C9A27E]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1C1B1F] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 07123 456789"
                      className="w-full px-3.5 py-2 bg-white border border-[#EEE8E1] rounded-lg text-xs text-[#1C1B1F] focus:outline-none focus:border-[#C9A27E]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1C1B1F] mb-1">
                      Appointment Type
                    </label>
                    <select
                      value={visitType}
                      onChange={(e) => setVisitType(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#EEE8E1] rounded-lg text-xs text-[#1C1B1F] focus:outline-none focus:border-[#C9A27E]"
                    >
                      <option value="Showroom Visit">Showroom In-Person Visit</option>
                      <option value="Video Call Viewing">WhatsApp Video Viewing</option>
                      <option value="Phone Consultation">Phone Consultation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1C1B1F] mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#EEE8E1] rounded-lg text-xs text-[#1C1B1F] focus:outline-none focus:border-[#C9A27E]"
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-[#E8D3B9] via-[#D9A89A] to-[#C9A27E] text-[#1C1B1F] text-xs font-bold uppercase tracking-wider rounded-lg hover:brightness-105 transition-all shadow-sm active:scale-95"
                  >
                    Reserve Slot
                  </button>
                  <Link
                    to="/book"
                    className="text-xs font-semibold text-[#9F7453] hover:underline flex items-center gap-1"
                  >
                    <span>Or use full multi-step calendar</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </form>
            ) : (
              <div className="text-center py-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                <h4 className="font-serif text-2xl text-[#1C1B1F]">Viewing Reserved</h4>
                <p className="text-xs text-[#6B6670] mt-1 mb-4">
                  We'll contact you on {phone} to confirm your showroom slot.
                </p>
                <Link
                  to="/book"
                  className="text-xs font-semibold text-[#9F7453] underline"
                >
                  Manage or view full appointment details
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  CheckCircle2,
  MapPin,
  Video,
  Phone,
  Ruler,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Download,
  ExternalLink,
} from 'lucide-react';
import { products } from '@/data/products';
import { siteConfig } from '@/config/site';
import { saveFormSubmission } from '@/lib/utils';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export const BookVisitPage: React.FC = () => {
  useDocumentTitle('Book a Showroom Visit or Consultation');

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Form State
  const [appointmentType, setAppointmentType] = useState('Showroom Visit');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [bookingRef, setBookingRef] = useState('');

  // Generate valid next 14 days (excluding Sundays)
  const availableDates = React.useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 21; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      if (d.getDay() !== 0) { // Exclude Sundays
        dates.push({
          iso: d.toISOString().split('T')[0],
          dayName: d.toLocaleDateString('en-GB', { weekday: 'short' }),
          dayNum: d.getDate(),
          monthName: d.toLocaleDateString('en-GB', { month: 'short' }),
        });
      }
    }
    return dates;
  }, []);

  const timeSlots = [
    { time: '10:00', booked: false },
    { time: '10:30', booked: true },
    { time: '11:00', booked: false },
    { time: '11:30', booked: false },
    { time: '12:00', booked: false },
    { time: '12:30', booked: true },
    { time: '13:00', booked: false },
    { time: '13:30', booked: false },
    { time: '14:00', booked: false },
    { time: '14:30', booked: false },
    { time: '15:00', booked: true },
    { time: '15:30', booked: false },
    { time: '16:00', booked: false },
    { time: '16:30', booked: false },
    { time: '17:00', booked: false },
  ];

  const appointmentTypes = [
    {
      id: 'Showroom Visit',
      icon: MapPin,
      title: 'In-Person Showroom Visit',
      desc: 'Browse our Greater Manchester gallery, test velvet chairs, and inspect crystal finishes in person.',
      badge: 'Most Popular',
    },
    {
      id: 'Video Call Viewing',
      icon: Video,
      title: 'Live WhatsApp Video Viewing',
      desc: 'Connect directly with our showroom host on WhatsApp video for a personalized walk-around tour.',
      badge: 'UK Nationwide',
    },
    {
      id: 'Phone Consultation',
      icon: Phone,
      title: 'Phone Consultation',
      desc: 'Discuss custom dimensions, access stairs check, and delivery schedules with our specialist.',
      badge: 'Fast & Easy',
    },
    {
      id: 'Home Measurement Advice',
      icon: Ruler,
      title: 'Room Measurement & Styling Advice',
      desc: 'Send us your room dimensions and photos for recommended table sizes and mirror heights.',
      badge: 'Bespoke',
    },
  ];

  const handleProductToggle = (prodName: string) => {
    setSelectedProducts((prev) =>
      prev.includes(prodName) ? prev.filter((p) => p !== prodName) : [...prev, prodName]
    );
  };

  const handleConfirmBooking = () => {
    const ref = `TFG-${Math.floor(10000 + Math.random() * 90000)}`;
    setBookingRef(ref);

    saveFormSubmission('showroom_booking', {
      ref,
      appointmentType,
      date: selectedDate,
      time: selectedTime,
      name,
      email,
      phone,
      selectedProducts,
      notes,
    });

    setStep(5);
  };

  // Google Calendar URL generator
  const getGoogleCalendarUrl = () => {
    if (!selectedDate || !selectedTime) return '#';
    const startIso = `${selectedDate}T${selectedTime.replace(':', '')}00Z`;
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      `Showroom Appointment with The Furniture Guy (${appointmentType})`
    )}&details=${encodeURIComponent(
      `Booking Reference: ${bookingRef}\nType: ${appointmentType}\nContact: ${name} (${phone})\nLocation: ${siteConfig.address}`
    )}&location=${encodeURIComponent(siteConfig.address)}`;
  };

  // Download .ics calendar file
  const handleDownloadIcs = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//The Furniture Guy//King of Bling//EN',
      'BEGIN:VEVENT',
      `SUMMARY:Showroom Appointment with The Furniture Guy`,
      `DESCRIPTION:Appointment Reference: ${bookingRef} - ${appointmentType}`,
      `LOCATION:${siteConfig.address}`,
      `DTSTART:${selectedDate.replace(/-/g, '')}T${selectedTime.replace(':', '')}00Z`,
      `DTEND:${selectedDate.replace(/-/g, '')}T${selectedTime.replace(':', '')}00Z`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `Showroom-Booking-${bookingRef}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-[#FBF9F6] min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#9F7453] block mb-2">
            King of Bling VIP Showroom
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#1C1B1F]">
            Book Your Showroom Viewing
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6670] mt-2 max-w-xl mx-auto">
            Experience our crushed diamond fireplaces and heavy marble suites in person, or schedule a live video consultation.
          </p>
        </div>

        {/* Progress Bar (Steps 1 to 4) */}
        {step < 5 && (
          <div className="mb-10">
            <div className="flex items-center justify-between text-xs font-semibold text-[#6B6670] mb-2 px-1">
              <span className={step >= 1 ? 'text-[#9F7453]' : ''}>1. Type</span>
              <span className={step >= 2 ? 'text-[#9F7453]' : ''}>2. Date &amp; Time</span>
              <span className={step >= 3 ? 'text-[#9F7453]' : ''}>3. Your Details</span>
              <span className={step >= 4 ? 'text-[#9F7453]' : ''}>4. Confirmation</span>
            </div>
            <div className="w-full bg-[#EEE8E1] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#E8D3B9] to-[#9F7453] h-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Multi-Step Container Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 shadow-xl border border-[#EEE8E1]">
          {/* STEP 1: APPOINTMENT TYPE */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="font-serif text-2xl font-medium text-[#1C1B1F]">
                Step 1: Choose Your Consultation Style
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {appointmentTypes.map((item) => {
                  const Icon = item.icon;
                  const isSelected = appointmentType === item.id;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setAppointmentType(item.id)}
                      className={`p-5 rounded-2xl border text-left transition-all relative ${
                        isSelected
                          ? 'border-[#9F7453] bg-[#E8D3B9]/15 shadow-sm'
                          : 'border-[#EEE8E1] hover:border-[#9F7453]/60 bg-[#FBF9F6]/50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            isSelected ? 'bg-[#9F7453] text-white' : 'bg-white text-[#9F7453] border border-[#EEE8E1]'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#9F7453] bg-white px-2 py-0.5 rounded-full border border-[#EEE8E1]">
                          {item.badge}
                        </span>
                      </div>

                      <h4 className="font-serif text-lg font-bold text-[#1C1B1F] mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#6B6670] leading-relaxed">
                        {item.desc}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="pt-6 border-t border-[#EEE8E1] flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#E8D3B9] via-[#D9A89A] to-[#C9A27E] text-[#1C1B1F] font-bold text-xs uppercase tracking-wider hover:brightness-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>Continue to Date &amp; Time</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: DATE & TIME */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-2xl font-medium text-[#1C1B1F]">
                  Step 2: Select Date &amp; Time Slot
                </h3>
                <span className="text-xs text-[#6B6670]">Sundays closed for showroom restock</span>
              </div>

              {/* Date horizontal scroller */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1B1F] mb-2">
                  Select Date (Next 3 Weeks)
                </label>
                <div className="flex gap-2.5 overflow-x-auto pb-2 no-scrollbar">
                  {availableDates.map((d) => {
                    const isSelected = selectedDate === d.iso;
                    return (
                      <button
                        type="button"
                        key={d.iso}
                        onClick={() => setSelectedDate(d.iso)}
                        className={`p-3 rounded-xl border text-center shrink-0 w-20 transition-all ${
                          isSelected
                            ? 'border-[#9F7453] bg-[#9F7453] text-white shadow-md'
                            : 'border-[#EEE8E1] bg-[#FBF9F6] text-[#1C1B1F] hover:bg-white'
                        }`}
                      >
                        <span className="block text-[11px] uppercase tracking-wider font-semibold opacity-80">
                          {d.dayName}
                        </span>
                        <span className="block text-xl font-bold font-mono my-0.5">
                          {d.dayNum}
                        </span>
                        <span className="block text-[10px] uppercase opacity-75">
                          {d.monthName}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <div className="pt-4 border-t border-[#EEE8E1]">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1B1F] mb-3">
                    Available Time Slots (30 Min Appointments)
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                    {timeSlots.map((slot) => {
                      const isSelected = selectedTime === slot.time;
                      return (
                        <button
                          type="button"
                          key={slot.time}
                          disabled={slot.booked}
                          onClick={() => setSelectedTime(slot.time)}
                          className={`py-2.5 px-3 rounded-lg border text-xs font-mono font-semibold transition-all ${
                            slot.booked
                              ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through'
                              : isSelected
                              ? 'bg-[#1C1B1F] text-[#E8D3B9] border-black shadow-sm'
                              : 'bg-white text-[#1C1B1F] border-[#EEE8E1] hover:border-[#9F7453]'
                          }`}
                        >
                          {slot.time}
                          {slot.booked && <span className="block text-[9px] font-sans no-underline text-gray-400">Booked</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-[#EEE8E1] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-2.5 border border-[#EEE8E1] rounded-xl text-xs font-semibold text-[#1C1B1F] hover:bg-[#FBF9F6]"
                >
                  Back
                </button>
                <button
                  type="button"
                  disabled={!selectedDate || !selectedTime}
                  onClick={() => setStep(3)}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#E8D3B9] via-[#D9A89A] to-[#C9A27E] text-[#1C1B1F] font-bold text-xs uppercase tracking-wider hover:brightness-105 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  <span>Continue to Details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: DETAILS & PRODUCTS OF INTEREST */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="font-serif text-2xl font-medium text-[#1C1B1F]">
                Step 3: Your Contact Details &amp; Interests
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1B1F] mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Lauren Bradshaw"
                    className="w-full px-4 py-2.5 bg-[#FBF9F6] border border-[#EEE8E1] rounded-xl text-xs sm:text-sm text-[#1C1B1F] focus:outline-none focus:border-[#C9A27E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1B1F] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. lauren@example.co.uk"
                    className="w-full px-4 py-2.5 bg-[#FBF9F6] border border-[#EEE8E1] rounded-xl text-xs sm:text-sm text-[#1C1B1F] focus:outline-none focus:border-[#C9A27E]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1B1F] mb-1.5">
                    UK Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 07700 900456"
                    className="w-full px-4 py-2.5 bg-[#FBF9F6] border border-[#EEE8E1] rounded-xl text-xs sm:text-sm text-[#1C1B1F] focus:outline-none focus:border-[#C9A27E]"
                  />
                </div>
              </div>

              {/* Multi-select products of interest */}
              <div className="pt-4 border-t border-[#EEE8E1]">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1B1F] mb-2">
                  Which showpieces would you like to view? (Multi-select)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 bg-[#FBF9F6] rounded-xl border border-[#EEE8E1]">
                  {products.slice(0, 12).map((p) => {
                    const isChecked = selectedProducts.includes(p.name);
                    return (
                      <label
                        key={p.id}
                        className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer text-xs transition-colors ${
                          isChecked ? 'bg-white font-semibold text-[#1C1B1F] shadow-xs' : 'text-[#6B6670] hover:bg-white/50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleProductToggle(p.name)}
                          className="rounded text-[#9F7453] focus:ring-0"
                        />
                        <span className="truncate">{p.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1B1F] mb-1.5">
                  Special Notes or Room Dimensions (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Inquiring about access up stairs for the 180cm marble table."
                  className="w-full px-4 py-2 bg-[#FBF9F6] border border-[#EEE8E1] rounded-xl text-xs text-[#1C1B1F] focus:outline-none focus:border-[#C9A27E] resize-none"
                />
              </div>

              <div className="pt-6 border-t border-[#EEE8E1] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 border border-[#EEE8E1] rounded-xl text-xs font-semibold text-[#1C1B1F] hover:bg-[#FBF9F6]"
                >
                  Back
                </button>
                <button
                  type="button"
                  disabled={!name.trim() || !email.trim() || !phone.trim()}
                  onClick={() => setStep(4)}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#E8D3B9] via-[#D9A89A] to-[#C9A27E] text-[#1C1B1F] font-bold text-xs uppercase tracking-wider hover:brightness-105 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  <span>Review Booking</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: REVIEW & CONFIRM */}
          {step === 4 && (
            <div className="space-y-6">
              <h3 className="font-serif text-2xl font-medium text-[#1C1B1F]">
                Step 4: Review Your Showroom Booking
              </h3>

              <div className="bg-[#FBF9F6] p-6 rounded-2xl border border-[#EEE8E1] space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[#6B6670] uppercase font-bold text-[10px] block">
                      Consultation Type
                    </span>
                    <span className="text-sm font-semibold text-[#1C1B1F]">{appointmentType}</span>
                  </div>

                  <div>
                    <span className="text-[#6B6670] uppercase font-bold text-[10px] block">
                      Date &amp; Time
                    </span>
                    <span className="text-sm font-semibold text-[#1C1B1F]">
                      {selectedDate} at {selectedTime}
                    </span>
                  </div>

                  <div>
                    <span className="text-[#6B6670] uppercase font-bold text-[10px] block">
                      Client Contact
                    </span>
                    <span className="text-sm font-semibold text-[#1C1B1F] block">{name}</span>
                    <span className="text-[#6B6670]">{phone} · {email}</span>
                  </div>

                  <div>
                    <span className="text-[#6B6670] uppercase font-bold text-[10px] block">
                      Location
                    </span>
                    <span className="text-xs text-[#1C1B1F]">{siteConfig.address}</span>
                  </div>
                </div>

                {selectedProducts.length > 0 && (
                  <div className="pt-3 border-t border-[#EEE8E1] text-xs">
                    <span className="text-[#6B6670] uppercase font-bold text-[10px] block mb-1">
                      Pieces of Interest:
                    </span>
                    <ul className="list-disc list-inside text-[#1C1B1F]">
                      {selectedProducts.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-[#EEE8E1] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 border border-[#EEE8E1] rounded-xl text-xs font-semibold text-[#1C1B1F] hover:bg-[#FBF9F6]"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleConfirmBooking}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#E8D3B9] via-[#D9A89A] to-[#C9A27E] text-[#1C1B1F] font-bold text-xs uppercase tracking-wider hover:brightness-105 active:scale-95 transition-all shadow-md flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#1C1B1F]" />
                  <span>Confirm Appointment</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: SUCCESS CONFIRMATION */}
          {step === 5 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4 border border-emerald-300">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>

              <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#9F7453] block mb-1">
                Showroom Viewing Confirmed
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1C1B1F] mb-3">
                We Look Forward to Welcoming You
              </h2>

              <p className="text-xs sm:text-sm text-[#6B6670] max-w-md mx-auto mb-6">
                Your appointment is reserved for <strong className="text-[#1C1B1F]">{selectedDate}</strong> at{' '}
                <strong className="text-[#1C1B1F]">{selectedTime}</strong>. We've sent details to {email}.
              </p>

              {/* Booking reference card */}
              <div className="max-w-xs mx-auto p-4 bg-[#FBF9F6] rounded-2xl border border-[#EEE8E1] mb-8">
                <span className="text-[10px] uppercase font-bold text-[#6B6670] block">
                  Booking Reference
                </span>
                <span className="text-2xl font-mono font-bold text-[#9F7453] tracking-wider block mt-0.5">
                  {bookingRef}
                </span>
              </div>

              {/* Add to Calendar / Download .ics */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={getGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white border border-[#EEE8E1] hover:border-[#9F7453] text-xs font-semibold text-[#1C1B1F] flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#9F7453]" />
                  <span>Add to Google Calendar</span>
                </a>

                <button
                  onClick={handleDownloadIcs}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white border border-[#EEE8E1] hover:border-[#9F7453] text-xs font-semibold text-[#1C1B1F] flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#9F7453]" />
                  <span>Download .ics Calendar File</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

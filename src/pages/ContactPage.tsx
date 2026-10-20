import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { siteConfig } from '@/config/site';
import { saveFormSubmission } from '@/lib/utils';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export const ContactPage: React.FC = () => {
  useDocumentTitle('Contact Us & Showroom Location');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Stock & Delivery Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      saveFormSubmission('contact_inquiry', {
        name,
        email,
        phone,
        subject,
        message,
      });
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="bg-[#FBF9F6] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#9F7453] block mb-2">
            Get in Touch
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#1C1B1F]">
            Contact Our Showroom Team
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6670] mt-2">
            Have questions about dimensions, delivery dates, or securing a piece with a £20 deposit? Call or message us directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Contact Details & Showroom Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Cards */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EEE8E1] shadow-xs space-y-5">
              <h3 className="font-serif text-2xl font-medium text-[#1C1B1F]">
                Direct Contacts
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                {/* Telephone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#E8D3B9]/30 text-[#9F7453] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#6B6670] block">
                      Direct Showroom Line
                    </span>
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className="font-bold text-base text-[#1C1B1F] hover:text-[#9F7453] transition-colors"
                    >
                      {siteConfig.phoneDisplay}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#25D366]/20 text-[#25D366] flex items-center justify-center shrink-0 mt-0.5">
                    <MessageCircle className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#6B6670] block">
                      WhatsApp Live Chat
                    </span>
                    <a
                      href={`https://wa.me/${siteConfig.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-emerald-800 hover:underline"
                    >
                      Chat with showroom team on WhatsApp
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#E8D3B9]/30 text-[#9F7453] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#6B6670] block">
                      Email Inquiries
                    </span>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="font-medium text-[#1C1B1F] hover:underline"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                {/* Showroom Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#E8D3B9]/30 text-[#9F7453] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#6B6670] block">
                      Showroom Address
                    </span>
                    <p className="font-medium text-[#1C1B1F] leading-snug">
                      {siteConfig.address}
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#E8D3B9]/30 text-[#9F7453] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#6B6670] block">
                      Opening Hours
                    </span>
                    <p className="font-medium text-[#1C1B1F]">
                      {siteConfig.openingHours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Map / Showroom Guide */}
            <div className="bg-white p-6 rounded-2xl border border-[#EEE8E1] shadow-xs">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#9F7453] block mb-1">
                Showroom Location
              </span>
              <h4 className="font-serif text-lg font-bold text-[#1C1B1F] mb-3">
                Greater Manchester Showroom &amp; Warehouse
              </h4>
              <div className="aspect-[16/9] rounded-xl bg-[#F5F5F7] border border-[#EEE8E1] overflow-hidden relative flex items-center justify-center text-center p-4">
                <div>
                  <MapPin className="w-8 h-8 text-[#C9A27E] mx-auto mb-2 animate-bounce" />
                  <p className="font-serif text-sm font-semibold text-[#1C1B1F]">
                    The Furniture Guy Emporium
                  </p>
                  <p className="text-[11px] text-[#6B6670] mt-0.5">
                    Greater Manchester, North West UK
                  </p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#9F7453] hover:underline mt-2"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-2xl border border-[#EEE8E1] shadow-xs">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1C1B1F]">
                  Send a Message
                </h3>
                <p className="text-xs text-[#6B6670]">
                  Our showroom staff usually respond within 1 to 2 business hours.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1B1F] mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rachel Adams"
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
                      placeholder="e.g. rachel@example.com"
                      className="w-full px-4 py-2.5 bg-[#FBF9F6] border border-[#EEE8E1] rounded-xl text-xs sm:text-sm text-[#1C1B1F] focus:outline-none focus:border-[#C9A27E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1B1F] mb-1.5">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 07700 900123"
                      className="w-full px-4 py-2.5 bg-[#FBF9F6] border border-[#EEE8E1] rounded-xl text-xs sm:text-sm text-[#1C1B1F] focus:outline-none focus:border-[#C9A27E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1B1F] mb-1.5">
                      Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#FBF9F6] border border-[#EEE8E1] rounded-xl text-xs text-[#1C1B1F] focus:outline-none focus:border-[#C9A27E]"
                    >
                      <option value="Stock & Delivery Inquiry">Stock &amp; Delivery Inquiry</option>
                      <option value="Reserve with £20 Deposit">Reserve with £20 Deposit</option>
                      <option value="Showroom Appointment Question">Showroom Appointment Question</option>
                      <option value="Bespoke Order / Measurements">Bespoke Order / Measurements</option>
                      <option value="General Question">General Question</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1C1B1F] mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what piece you are looking for, your postcode for delivery quotes, or questions on room access..."
                    className="w-full px-4 py-3 bg-[#FBF9F6] border border-[#EEE8E1] rounded-xl text-xs sm:text-sm text-[#1C1B1F] focus:outline-none focus:border-[#C9A27E] resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#E8D3B9] via-[#D9A89A] to-[#C9A27E] text-[#1C1B1F] font-bold text-xs uppercase tracking-wider hover:brightness-105 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-12">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h3 className="font-serif text-3xl font-medium text-[#1C1B1F]">
                  Message Sent Successfully
                </h3>
                <p className="text-xs sm:text-sm text-[#6B6670] max-w-md mx-auto mt-2 mb-6">
                  Thank you, <strong className="text-[#1C1B1F]">{name}</strong>. One of our specialists will reply to{' '}
                  <span className="font-semibold text-[#1C1B1F]">{email}</span> shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-[#1C1B1F] text-white text-xs font-semibold rounded-lg"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

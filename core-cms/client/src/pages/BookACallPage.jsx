import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Calendar, Clock, Phone, CheckCircle, ArrowRight, User, Mail, MessageSquare } from 'lucide-react';
import Layout from '../components/Layout';
import { fetchPage, submitBookACall } from '../lib/api';

const BookACallPage = () => {
  const { data: pageData, isLoading } = useQuery({
    queryKey: ['page', 'book-a-call'],
    queryFn: () => fetchPage('book-a-call'),
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitBookACall(formData);
      setIsSubmitted(true);
      setFormData({ 
        name: '', 
        email: '', 
        phone: '', 
        company: '',
        preferredDate: '',
        preferredTime: '',
        message: '' 
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to book call. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4353FF]"></div>
        </div>
      </Layout>
    );
  }

  const content = pageData?.content || {};

  const timeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM'
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-[#0A0A0A] text-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#4353FF]/20 text-[#4353FF] px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Calendar className="w-4 h-4" />
              Schedule a Call
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {content.hero?.title || "Book a Free Consultation"}
            </h1>
            <p className="text-xl text-gray-400">
              {content.hero?.subtitle || "Schedule a 30-minute call with our team to discuss how CORE can help maximize your property's potential."}
            </p>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Info */}
            <div>
              <h2 className="text-3xl font-bold text-[#0A0A0A] mb-6">
                What to Expect
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                During our 30-minute consultation, we'll discuss your property portfolio, 
                current challenges, and how CORE can help you maximize revenue and streamline operations.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#4353FF]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#4353FF]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0A0A0A] mb-1">30 Minutes</h3>
                    <p className="text-gray-600">A focused conversation about your business needs</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#4353FF]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#4353FF]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0A0A0A] mb-1">Video or Phone Call</h3>
                    <p className="text-gray-600">Choose your preferred communication method</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#4353FF]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-[#4353FF]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0A0A0A] mb-1">No Obligation</h3>
                    <p className="text-gray-600">Free consultation with no commitment required</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-gray-50 rounded-2xl">
                <h3 className="font-semibold text-[#0A0A0A] mb-2">Need immediate assistance?</h3>
                <p className="text-gray-600 mb-4">Call us directly at +971 4 123 4567</p>
                <a 
                  href="tel:+971412345678" 
                  className="text-[#4353FF] font-medium hover:underline inline-flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
              </div>
            </div>

            {/* Booking Form */}
            <div className="bg-gray-50 rounded-2xl p-8">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0A0A0A] mb-4">Booking Confirmed!</h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for scheduling a call. We've sent a confirmation email with 
                    the meeting details. Our team will reach out to you at the scheduled time.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-[#4353FF] font-medium hover:underline"
                  >
                    Book another call
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-[#0A0A0A] mb-6">
                    Schedule Your Call
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-[#0A0A0A] mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#4353FF] focus:ring-2 focus:ring-[#4353FF]/20 outline-none transition-all"
                          placeholder="Your name"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-[#0A0A0A] mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#4353FF] focus:ring-2 focus:ring-[#4353FF]/20 outline-none transition-all"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-[#0A0A0A] mb-2">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#4353FF] focus:ring-2 focus:ring-[#4353FF]/20 outline-none transition-all"
                            placeholder="+971 XX XXX XXXX"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-[#0A0A0A] mb-2">
                        Company/Property Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4353FF] focus:ring-2 focus:ring-[#4353FF]/20 outline-none transition-all"
                        placeholder="Your company or property name"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="preferredDate" className="block text-sm font-medium text-[#0A0A0A] mb-2">
                          Preferred Date *
                        </label>
                        <input
                          type="date"
                          id="preferredDate"
                          name="preferredDate"
                          value={formData.preferredDate}
                          onChange={handleChange}
                          required
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4353FF] focus:ring-2 focus:ring-[#4353FF]/20 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="preferredTime" className="block text-sm font-medium text-[#0A0A0A] mb-2">
                          Preferred Time *
                        </label>
                        <select
                          id="preferredTime"
                          name="preferredTime"
                          value={formData.preferredTime}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4353FF] focus:ring-2 focus:ring-[#4353FF]/20 outline-none transition-all"
                        >
                          <option value="">Select time</option>
                          {timeSlots.map((time) => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-[#0A0A0A] mb-2">
                        Additional Notes
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#4353FF] focus:ring-2 focus:ring-[#4353FF]/20 outline-none transition-all resize-none"
                          placeholder="Tell us briefly about your properties or any specific questions..."
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#4353FF] text-white px-8 py-4 rounded-full font-medium hover:bg-[#4353FF]/90 transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Booking...
                        </>
                      ) : (
                        <>
                          Book Your Call
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>

                    <p className="text-sm text-gray-500 text-center">
                      By booking a call, you agree to our privacy policy and terms of service.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BookACallPage;

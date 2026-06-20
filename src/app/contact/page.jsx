"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, Phone as PhoneIcon, MapPin, Building, Globe, Send, CheckCircle, Clock } from "lucide-react";

function ContactContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("contact"); // "contact" or "demo"

  // Pre-select Schedule Demo tab if redirected from Schedule Demo CTA
  useEffect(() => {
    if (searchParams?.get("demo") === "true" && activeTab !== "demo") {
      const t = setTimeout(() => {
        setActiveTab("demo");
      }, 0);
      return () => clearTimeout(t);
    }
  }, [searchParams, activeTab]);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    country: "",
    jobTitle: "",
    jobDetails: ""
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          // Annotate demo requests inside jobDetails to keep db schema simple and clean as requested
          jobDetails: activeTab === "demo" 
            ? `[DEMO REQUESTED] ${formData.jobDetails}`
            : formData.jobDetails
        })
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          companyName: "",
          country: "",
          jobTitle: "",
          jobDetails: ""
        });
      } else {
        const data = await res.json();
        setErrorMessage(data.message || "Something went wrong. Please check your inputs.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Could not connect to the server. Verify your internet connection.");
    } finally {
      setSubmitting(false);
    }
  };

  const countries = [
    "United States", "United Kingdom", "Canada", "Germany", "France",
    "Japan", "Australia", "Singapore", "India", "Brazil", "Other"
  ];

  return (
    <div className="relative isolate overflow-hidden min-h-screen py-16">
      
      {/* Background glow backdrops */}
      <div className="absolute top-20 right-10 w-96 h-96 glow-blur-cyan rounded-full opacity-25 -z-10 animate-glow-pulse"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 glow-blur-indigo rounded-full opacity-20 -z-10"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl font-display">
            Connect With Our Engineering Team
          </h1>
          <p className="text-slate-400 text-lg">
            Submit an integration inquiry or schedule a live screen-share sandbox demonstration.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Info Panels */}
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-2xl space-y-4">
              <h3 className="text-lg font-bold text-white font-display">Direct Contacts</h3>
              
              <div className="space-y-3.5 text-xs text-slate-300">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4.5 w-4.5 text-indigo-400" />
                  <span>integrations@auranext.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <PhoneIcon className="h-4.5 w-4.5 text-indigo-400" />
                  <span>+1 (800) 555-0199</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4.5 w-4.5 text-indigo-400" />
                  <span>100 Pine St, Suite 1200, San Francisco, CA</span>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl space-y-3.5">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Clock className="h-4.5 w-4.5 text-emerald-400" />
                <span>Response Time Metrics</span>
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                General inquiries are parsed by automated indexers and routed to engineering reps in under 2 hours.
              </p>
            </div>
          </div>

          {/* Inquiry Forms Panel */}
          <div className="lg:col-span-2 glass-panel p-8 rounded-2xl border border-white/10">
            
            {/* Tabs switcher */}
            <div className="flex border-b border-white/10 mb-8 pb-1 gap-4">
              <button
                onClick={() => { setActiveTab("contact"); setSubmitted(false); }}
                className={`pb-3 text-sm font-bold cursor-pointer transition-all border-b-2 ${
                  activeTab === "contact"
                    ? "border-indigo-500 text-white"
                    : "border-transparent text-slate-400 hover:text-white"
                }`}
              >
                General Inquiry
              </button>
              <button
                onClick={() => { setActiveTab("demo"); setSubmitted(false); }}
                className={`pb-3 text-sm font-bold cursor-pointer transition-all border-b-2 ${
                  activeTab === "demo"
                    ? "border-indigo-500 text-white"
                    : "border-transparent text-slate-400 hover:text-white"
                }`}
              >
                Schedule Demo Session
              </button>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="h-12 w-12 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Inquiry Submitted Successfully!</h3>
                <p className="text-slate-400 text-xs max-w-sm mx-auto leading-relaxed">
                  Thank you. Our telemetry pipeline has recorded your credentials. An agent will contact you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={submitForm} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-400 uppercase font-semibold">Full Name</label>
                    <input
                      type="text"
                      required
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="w-full bg-white/5 border border-white/10 text-white rounded-lg p-2.5 text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-400 uppercase font-semibold">Email</label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      className="w-full bg-white/5 border border-white/10 text-white rounded-lg p-2.5 text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-400 uppercase font-semibold">Phone Number</label>
                    <input
                      type="tel"
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 012-3456"
                      className="w-full bg-white/5 border border-white/10 text-white rounded-lg p-2.5 text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  {/* Company Name */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-400 uppercase font-semibold">Company Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Acme Corp"
                        className="w-full bg-white/5 border border-white/10 text-white rounded-lg pl-3 pr-8 py-2.5 text-xs focus:outline-none focus:border-indigo-500"
                      />
                      <Building className="absolute right-3 top-3 h-3.5 w-3.5 text-slate-600" />
                    </div>
                  </div>

                  {/* Country */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-400 uppercase font-semibold">Country</label>
                    <div className="relative">
                      <select
                        required
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full bg-slate-950 border border-white/10 text-white rounded-lg p-2.5 text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
                      >
                        <option value="">Select Country</option>
                        {countries.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      <Globe className="absolute right-3 top-3 h-3.5 w-3.5 text-slate-600 pointer-events-none" />
                    </div>
                  </div>

                  {/* Job Title */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-slate-400 uppercase font-semibold">Job Title</label>
                    <input
                      type="text"
                      required
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      placeholder="Principal Architect"
                      className="w-full bg-white/5 border border-white/10 text-white rounded-lg p-2.5 text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                </div>

                {/* Job Details */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-400 uppercase font-semibold">
                    {activeTab === "demo" ? "Sandbox Requirements & Systems Scope" : "Inquiry & Project Details"}
                  </label>
                  <textarea
                    required
                    name="jobDetails"
                    rows={4}
                    value={formData.jobDetails}
                    onChange={handleChange}
                    placeholder={activeTab === "demo" ? "Briefly explain what systems you wish to connect and demonstrate (e.g., local database sync, agent webhooks, segmenting thermal imaging)..." : "Explain your integration timelines, expected daily API volume, or custom machine learning needs..."}
                    className="w-full bg-white/5 border border-white/10 text-white rounded-lg p-2.5 text-xs focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>

                {errorMessage && (
                  <p className="text-xs text-red-400 font-semibold">{errorMessage}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center space-x-1.5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold disabled:opacity-40 transition-colors cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                  <span>{submitting ? "Submitting inquiry..." : activeTab === "demo" ? "Book Demonstration Session" : "Submit Inquiry"}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-brand-bg text-slate-400">
        <div className="flex space-x-2 items-center">
          <span className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce"></span>
          <span className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.15s]"></span>
          <span className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.3s]"></span>
        </div>
      </div>
    }>
      <ContactContent />
    </Suspense>
  );
}

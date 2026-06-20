"use client";

import { useState, useEffect } from "react";
import { Star, CheckCircle2, MessageSquare, Send, Check } from "lucide-react";

const defaultFeedbacks = [
  {
    name: "Sarah Jenkins",
    companyName: "FinTech Global",
    rating: 5,
    message: "The predictive analytics models deployed by Ai Solutions reduced our loan underwriting risk by 38% in the first quarter."
  },
  {
    name: "Marcus Aurelius",
    companyName: "LogiTech Solutions",
    rating: 5,
    message: "Their autonomic AI agents restructured our logistics dispatch pipeline. The 99.9% uptime and auto-resolution are outstanding."
  },
  {
    name: "Elena Rostova",
    companyName: "Visiotech Labs",
    rating: 5,
    message: "Incredible computer vision integration. Ai Solutions delivered real-time analytics with zero lag. Highly recommended!"
  }
];

export default function CustomerFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function fetchFeedback() {
      try {
        const res = await fetch("/api/feedback?approved=true");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setFeedbacks(data);
          } else {
            setFeedbacks(defaultFeedbacks);
          }
        } else {
          setFeedbacks(defaultFeedbacks);
        }
      } catch (err) {
        setFeedbacks(defaultFeedbacks);
      } finally {
        setLoading(false);
      }
    }
    fetchFeedback();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !companyName.trim() || !message.trim()) return;

    setSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, companyName, rating, message })
      });

      if (res.ok) {
        setSubmitted(true);
        setName("");
        setCompanyName("");
        setRating(5);
        setMessage("");
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Submission failed. Please check inputs.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("An unexpected connection issue occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative isolate overflow-hidden min-h-screen py-16">
      
      {/* Background glows */}
      <div className="absolute top-20 right-1/4 w-96 h-96 glow-blur-indigo rounded-full opacity-35 -z-10 animate-glow-pulse"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 glow-blur-cyan rounded-full opacity-20 -z-10"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl font-display">
            Customer Feedback & Ratings
          </h1>
          <p className="text-slate-400 text-lg">
            Read verified reviews from enterprise partners or submit your own rating to our verification logs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Testimonials Grid Column */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-white font-display flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-indigo-400" />
              <span>Verified Testimonials</span>
            </h2>

            {loading ? (
              <div className="flex justify-center items-center h-48 space-x-2">
                <span className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce"></span>
                <span className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.15s]"></span>
                <span className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.3s]"></span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {feedbacks.map((fb, idx) => (
                  <div key={idx} className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex text-amber-400 space-x-0.5">
                        {[...Array(fb.rating || 5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                      <p className="text-slate-300 text-xs italic leading-relaxed">
                        &quot;{fb.message}&quot;
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                      <div>
                        <h4 className="text-white text-xs font-bold">{fb.name}</h4>
                        <span className="text-[10px] text-slate-500 uppercase font-medium">{fb.companyName}</span>
                      </div>
                      <CheckCircle2 className="h-4 w-4 text-green-500/80" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Review Submission Form Column */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <h3 className="text-lg font-bold text-white mb-2 font-display">Submit Feedback</h3>
            <p className="text-slate-400 text-xs mb-6">Your submission will queue for developer moderation before appearing on the public feed.</p>

            {submitted ? (
              <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-300 rounded-xl space-y-3 text-center">
                <Check className="h-8 w-8 text-green-400 mx-auto" />
                <h4 className="font-bold text-sm">Review Submitted!</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Thank you. Your feedback has been queued. Our admin panel will moderate it shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-indigo-400 underline cursor-pointer"
                >
                  Write another review
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-400 uppercase font-semibold">Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Sarah Jenkins"
                    className="w-full bg-white/5 border border-white/10 text-white rounded-lg p-2.5 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Company Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-400 uppercase font-semibold">Company Name</label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="FinTech Global"
                    className="w-full bg-white/5 border border-white/10 text-white rounded-lg p-2.5 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Rating */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-400 uppercase font-semibold block">Rating</label>
                  <div className="flex space-x-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="focus:outline-none transition-colors cursor-pointer"
                      >
                        <Star
                          className={`h-5 w-5 ${
                            star <= rating ? "text-amber-400 fill-amber-400" : "text-slate-600"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-400 uppercase font-semibold">Review Message</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your review message here..."
                    className="w-full bg-white/5 border border-white/10 text-white rounded-lg p-2.5 text-xs focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>

                {errorMsg && (
                  <p className="text-[10px] text-red-400 font-semibold">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center space-x-1.5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold disabled:opacity-40 transition-colors cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>{submitting ? "Submitting review..." : "Submit Review"}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

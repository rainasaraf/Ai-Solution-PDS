"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Bot, Cpu, LineChart, Star, Calendar, ArrowUpRight, CheckCircle2, X } from "lucide-react";

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

export default function Home() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loadingFeedback, setLoadingFeedback] = useState(true);

  // Feedback Form State
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [newFeedback, setNewFeedback] = useState({ name: "", companyName: "", rating: 5, message: "" });
  const [feedbackSubmitting, setFeedbackSubmitting] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackError, setFeedbackError] = useState("");

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setFeedbackSubmitting(true);
    setFeedbackError("");

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFeedback)
      });

      if (res.ok) {
        setFeedbackSubmitted(true);
        setNewFeedback({ name: "", companyName: "", rating: 5, message: "" });
      } else {
        const data = await res.json();
        setFeedbackError(data.error || "Review submission failed.");
      }
    } catch (err) {
      console.error(err);
      setFeedbackError("Could not connect to database pipeline.");
    } finally {
      setFeedbackSubmitting(false);
    }
  };

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
        setLoadingFeedback(false);
      }
    }
    fetchFeedback();
  }, []);

  return (
    <div className="relative isolate overflow-hidden min-h-screen">
      
      {/* Background glow layers */}
      <div className="absolute top-20 left-1/4 w-96 h-96 glow-blur-indigo rounded-full opacity-40 -z-10 animate-glow-pulse"></div>
      <div className="absolute top-1/2 right-10 w-96 h-96 glow-blur-cyan rounded-full opacity-30 -z-10"></div>
      
      {/* Grid background overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-15"></div>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse"></span>
            <span>Next-Gen Enterprise Automation</span>
          </div>
          
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl font-display leading-tight">
            Production-Grade <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent glow-text">
              Autonomic AI Solutions
            </span>
          </h1>
          
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Deploy scalable AI workflows, computer vision systems, and automated agents. Connect directly to your enterprise database with native MongoDB integration.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20"
            >
              Explore Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/contact?demo=true"
              className="inline-flex items-center justify-center px-6 py-3 border border-white/10 text-sm font-medium rounded-lg text-slate-300 hover:text-white hover:bg-white/5 bg-slate-900/50 backdrop-blur-sm transition-all"
            >
              Book Technical Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="border-y border-white/5 bg-slate-950/20 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <span className="block text-3xl font-extrabold text-white font-display">10M+</span>
              <span className="text-xs text-slate-500 uppercase tracking-wider">Daily Agent Operations</span>
            </div>
            <div>
              <span className="block text-3xl font-extrabold text-white font-display">99.9%</span>
              <span className="text-xs text-slate-500 uppercase tracking-wider">Autonomy Metric</span>
            </div>
            <div>
              <span className="block text-3xl font-extrabold text-white font-display">250ms</span>
              <span className="text-xs text-slate-500 uppercase tracking-wider">Average NLP Latency</span>
            </div>
            <div>
              <span className="block text-3xl font-extrabold text-white font-display">15+</span>
              <span className="text-xs text-slate-500 uppercase tracking-wider">Global Enterprises</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Solutions Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl font-bold tracking-tight text-white font-display">Architectural Capabilities</h2>
          <p className="text-slate-400">Our suite of core algorithms built to drive operational performance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="glass-panel-interactive p-6 rounded-2xl relative overflow-hidden group">
            <div className="h-10 w-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6">
              <Bot className="h-5 w-5 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Autonomic AI Agents</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Multi-agent frameworks executing complex recursive operations, CRM syncs, and real-time backend updates.
            </p>
            <Link href="/services#agents" className="inline-flex items-center text-xs text-indigo-400 hover:text-indigo-300 font-semibold group-hover:underline">
              Technical details <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="glass-panel-interactive p-6 rounded-2xl relative overflow-hidden group">
            <div className="h-10 w-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6">
              <Cpu className="h-5 w-5 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Computer Vision Systems</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Edge deployment models optimized for low-latency object detection, segmentation, and anomaly detection.
            </p>
            <Link href="/services#cv" className="inline-flex items-center text-xs text-purple-400 hover:text-purple-300 font-semibold group-hover:underline">
              Technical details <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="glass-panel-interactive p-6 rounded-2xl relative overflow-hidden group">
            <div className="h-10 w-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6">
              <LineChart className="h-5 w-5 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Predictive Analytics</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Real-time inference pipelines analyzing logs, user retention patterns, and market anomalies.
            </p>
            <Link href="/services#predictive" className="inline-flex items-center text-xs text-cyan-400 hover:text-cyan-300 font-semibold group-hover:underline">
              Technical details <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* Dynamic Customer Feedback Carousel */}
      <section className="border-t border-white/5 bg-slate-950/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-bold tracking-tight text-white font-display">Client Testimonials</h2>
            <p className="text-slate-400">Verified feedback and ratings from deployment engineering leads.</p>
          </div>

          {loadingFeedback ? (
            <div className="flex justify-center space-x-2 items-center h-20">
              <span className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce"></span>
              <span className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.15s]"></span>
              <span className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.3s]"></span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {feedbacks.slice(0, 3).map((fb, idx) => (
                <div key={idx} className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex text-amber-400 space-x-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-slate-300 text-sm italic leading-relaxed">
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

          {/* Write a Review Button and Form */}
          <div className="mt-12 flex flex-col items-center">
            {!showFeedbackForm ? (
              <button
                onClick={() => setShowFeedbackForm(true)}
                className="px-5 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                Provide Feedback & Rating
              </button>
            ) : (
              <div className="w-full max-w-lg glass-panel p-6 rounded-2xl border border-white/10 space-y-4 text-left animate-in slide-in-from-top-4 duration-200">
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <h3 className="text-sm font-bold text-white font-display">Leave Client Feedback</h3>
                  <button
                    onClick={() => { setShowFeedbackForm(false); setFeedbackSubmitted(false); }}
                    className="p-1 hover:bg-white/5 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {feedbackSubmitted ? (
                  <div className="py-4 text-center space-y-2">
                    <CheckCircle2 className="h-10 w-10 text-green-500 mx-auto" />
                    <h4 className="font-bold text-xs text-white">Review Received!</h4>
                    <p className="text-[10px] text-slate-400 leading-relaxed max-w-xs mx-auto">
                      Thank you. Your feedback has been queued for developer moderation and will display once approved.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[9px] text-slate-400 uppercase font-semibold">Name</label>
                        <input
                          type="text"
                          required
                          value={newFeedback.name}
                          onChange={(e) => setNewFeedback(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Sarah Jenkins"
                          className="w-full bg-white/5 border border-white/10 text-white rounded-lg p-2 text-xs focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] text-slate-400 uppercase font-semibold">Company Name</label>
                        <input
                          type="text"
                          required
                          value={newFeedback.companyName}
                          onChange={(e) => setNewFeedback(prev => ({ ...prev, companyName: e.target.value }))}
                          placeholder="FinTech Global"
                          className="w-full bg-white/5 border border-white/10 text-white rounded-lg p-2 text-xs focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] text-slate-400 uppercase font-semibold block">Rating</label>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewFeedback(prev => ({ ...prev, rating: star }))}
                            className="focus:outline-none transition-colors cursor-pointer"
                          >
                            <Star
                              className={`h-5 w-5 ${
                                star <= newFeedback.rating ? "text-amber-400 fill-amber-400" : "text-slate-600"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] text-slate-400 uppercase font-semibold">Message</label>
                      <textarea
                        required
                        rows={3}
                        value={newFeedback.message}
                        onChange={(e) => setNewFeedback(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Write your review message..."
                        className="w-full bg-white/5 border border-white/10 text-white rounded-lg p-2 text-xs focus:outline-none focus:border-indigo-500 resize-none"
                      />
                    </div>

                    {feedbackError && (
                      <p className="text-[10px] text-red-400 font-semibold">{feedbackError}</p>
                    )}

                    <button
                      type="submit"
                      disabled={feedbackSubmitting}
                      className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold disabled:opacity-40 transition-colors cursor-pointer"
                    >
                      {feedbackSubmitting ? "Submitting review..." : "Submit Review"}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Upcoming Events and Blog teasers */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Upcoming Event Teaser */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white font-display">Upcoming Live Launch</h3>
              <Link href="/events" className="text-xs text-indigo-400 hover:underline flex items-center">
                All events <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
            
            <div className="glass-panel p-6 rounded-2xl relative overflow-hidden flex flex-col md:flex-row gap-6 items-start">
              <div className="h-12 w-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex flex-col items-center justify-center text-indigo-400 shrink-0">
                <Calendar className="h-5 w-5" />
              </div>
              <div className="space-y-2">
                <span className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">Demo webinar</span>
                <h4 className="text-lg font-bold text-white">Scaling Autonomic Agents in FinTech Sandbox</h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Learn how to wire up event driven agent loops to process high-throughput trading logs in isolated sandboxes.
                </p>
                <div className="pt-2">
                  <Link href="/events" className="inline-flex items-center text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-md transition-colors">
                    Join Live Stream
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Teaser */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white font-display">Recent Research</h3>
              <Link href="/blog" className="text-xs text-indigo-400 hover:underline flex items-center">
                View blog <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>

            <div className="glass-panel p-6 rounded-2xl space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">June 10, 2026 • Deep Learning</span>
                <h4 className="text-base font-bold text-white hover:text-indigo-400 transition-colors">
                  <Link href="/blog">Benchmarking Inference Speeds on Mongoose-Aggregated Data Structures</Link>
                </h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Analyzing database latency bottlenecks when passing high dimensional arrays from MongoDB Atlas to agent networks.
                </p>
              </div>
              <div className="border-t border-white/5 pt-3 flex items-center justify-between text-xs text-slate-500">
                <span>By Dr. Raymond Vance</span>
                <span className="text-indigo-400">8 min read</span>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

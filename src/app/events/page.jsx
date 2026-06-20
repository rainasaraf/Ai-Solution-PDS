"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Ticket } from "lucide-react";

const defaultEvents = [
  {
    _id: "evt_1",
    title: "Scaling Autonomic Agents in FinTech Sandbox",
    description: "Learn how to wire up event driven agent loops to process high-throughput trading logs in isolated sandboxes.",
    date: "June 25, 2026",
    time: "14:00 GMT",
    location: "Virtual Webinar",
    registrationCount: 142
  },
  {
    _id: "evt_2",
    title: "Mongoose Latency Tuning & Aggregation Pipelines",
    description: "Technical deep-dive on indexing strategies, memory cache locks, and connection pools inside hot-reloading Next.js setups.",
    date: "July 08, 2026",
    time: "16:30 GMT",
    location: "Twitch Live Stream",
    registrationCount: 96
  },
  {
    _id: "evt_3",
    title: "Annual AI Agent Hackathon 2026",
    description: "Collaborate with developers globally to design recursive problem solvers that crawl APIs and coordinate state changes.",
    date: "August 12, 2026",
    time: "09:00 GMT",
    location: "San Francisco HQ / Hybrid",
    registrationCount: 310
  }
];

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/admin/events");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setEvents(data);
          } else {
            setEvents(defaultEvents);
          }
        } else {
          setEvents(defaultEvents);
        }
      } catch (err) {
        setEvents(defaultEvents);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  return (
    <div className="relative isolate overflow-hidden min-h-screen py-16">
      
      {/* Background glow backdrops */}
      <div className="absolute top-20 right-1/4 w-96 h-96 glow-blur-indigo rounded-full opacity-35 -z-10 animate-glow-pulse"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 glow-blur-cyan rounded-full opacity-20 -z-10"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl font-display">
            Promotional Events & Meetups
          </h1>
          <p className="text-slate-400 text-lg">
            Join our expert panel live streams, code hackathons, and technical design webinars.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-xl font-bold text-white font-display flex items-center gap-2">
            <Ticket className="h-5 w-5 text-indigo-400" />
            <span>Upcoming Schedule</span>
          </h2>

          {loading ? (
            <div className="flex justify-center items-center h-48 space-x-2">
              <span className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce"></span>
              <span className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.15s]"></span>
              <span className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.3s]"></span>
            </div>
          ) : (
            <div className="space-y-6">
              {events.map((evt) => (
                <div key={evt._id} className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row gap-6 justify-between items-start">
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-3 text-[10px] text-slate-400 font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-indigo-400" />
                        {evt.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-indigo-400" />
                        {evt.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-indigo-400" />
                        {evt.location}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-white">{evt.title}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed max-w-2xl">
                      {evt.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

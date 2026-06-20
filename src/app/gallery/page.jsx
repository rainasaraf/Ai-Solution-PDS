"use client";

import { useState, useEffect } from "react";
import { Image as ImageIcon, Video, Layers, Calendar, Star } from "lucide-react";

const defaultItems = [
  {
    title: "Autonomic Multi-Agent Workflow Diagram",
    category: "Solutions",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    type: "diagram",
    rating: 5
  },
  {
    title: "Global AI Summit Presentation 2026",
    category: "Events",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop",
    type: "event",
    rating: 5
  },
  {
    title: "Research Lab Anomaly Detection Stream",
    category: "Solutions",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop",
    type: "screenshot",
    rating: 4
  },
  {
    title: "Team Hackathon - Custom Agent Design",
    category: "Office",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop",
    type: "event",
    rating: 5
  },
  {
    title: "Neuromorphic CPU Cluster Deployment",
    category: "Solutions",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop",
    type: "diagram",
    rating: 5
  },
  {
    title: "Annual Developers Workshop Dinner",
    category: "Events",
    imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600&auto=format&fit=crop",
    type: "photo",
    rating: 4
  }
];

export default function Gallery() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch("/api/admin/gallery");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setGalleryItems(data);
          } else {
            setGalleryItems(defaultItems);
          }
        } else {
          setGalleryItems(defaultItems);
        }
      } catch (err) {
        setGalleryItems(defaultItems);
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, []);

  const categories = ["all", "Solutions", "Events", "Office"];

  const filteredItems = filter === "all"
    ? galleryItems
    : galleryItems.filter(item => item.category === filter);

  return (
    <div className="relative isolate overflow-hidden min-h-screen py-16">

      {/* Glow */}
      <div className="absolute top-20 right-10 w-96 h-96 glow-blur-cyan rounded-full opacity-25 -z-10 animate-glow-pulse"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 glow-blur-indigo rounded-full opacity-20 -z-10"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl font-display">
            Ai Solutions Media Gallery
          </h1>
          <p className="text-slate-400 text-lg">
            A visual overview of our technology architecture, global developer summits, and interactive workshops.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex justify-center space-x-2 mb-12">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold border cursor-pointer transition-all ${filter === c
                  ? "bg-indigo-600 border-transparent text-white"
                  : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                }`}
            >
              {c === "all" ? "All Categories" : c}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-48 space-x-2">
            <span className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce"></span>
            <span className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.15s]"></span>
            <span className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.3s]"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, i) => (
              <div key={i} className="glass-panel rounded-2xl overflow-hidden group border border-white/10 flex flex-col justify-between">

                {/* Visual frame with hover zoom */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-950/40">
                  {/* Since we cannot generate images easily without api errors in run command and we want fallback URLs to load immediately, unsplash endpoints are ideal. */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-slate-950/80 border border-white/10 text-[9px] font-mono text-indigo-400 uppercase tracking-wider">
                    {item.category}
                  </div>
                </div>

                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <h3 className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors leading-relaxed">
                    {item.title}
                  </h3>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span className="flex items-center gap-1">
                      <ImageIcon className="h-3.5 w-3.5 text-indigo-500" />
                      <span>IMAGE</span>
                    </span>
                    <span className="flex items-center gap-0.5 text-amber-400 font-bold">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <span>{item.rating || 5}</span>
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

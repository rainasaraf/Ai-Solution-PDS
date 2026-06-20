"use client";

import { useState } from "react";
import { Folder, ArrowUpRight, Shield, CheckCircle } from "lucide-react";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");

  const projects = [
    {
      title: "FinTech Transaction Pipeline",
      category: "automation",
      desc: "Autonomic agent routing logs, verifying account states, and flags fraudulent activities instantly.",
      metrics: "300% Processing Gain",
      client: "Capital Trust",
      tags: ["MongoDB", "Next.js", "AI Agents"]
    },
    {
      title: "Warehouse Sorting Inspection",
      category: "vision",
      desc: "Low latency edge camera tracking of high-speed package sorting using convolutional vision nets.",
      metrics: "99.8% Sorting Accuracy",
      client: "Apex Logistic",
      tags: ["Edge Inference", "PyTorch", "OpenCV"]
    },
    {
      title: "Macro Stress Analytics Engine",
      category: "predictive",
      desc: "Aggregating macro-economic data tables dynamically to predict portfolio stress levels.",
      metrics: "38% Risk Mitigation",
      client: "Euro Hedge Corp",
      tags: ["Regression Models", "Atlas Search"]
    },
    {
      title: "E-Commerce Customer Concierge",
      category: "automation",
      desc: "Contextual assistant responding to order changes, invoice generation, and refunds autonomously.",
      metrics: "84% Automated Resolution",
      client: "ShopSphere Inc",
      tags: ["Agentic Frameworks", "Next.js"]
    },
    {
      title: "Automated Crop Quality Segmenter",
      category: "vision",
      desc: "Drone imagery processing system detecting dry regions and segmenting leaf diseases via satellite feeds.",
      metrics: "4.5x Faster Inspection",
      client: "AgriGrow Labs",
      tags: ["Segment Anything", "Satellite API"]
    }
  ];

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "automation", label: "Agent Automation" },
    { id: "vision", label: "Computer Vision" },
    { id: "predictive", label: "Predictive Analytics" }
  ];

  return (
    <div className="relative isolate overflow-hidden min-h-screen py-16">
      
      {/* Background glow backdrops */}
      <div className="absolute top-20 left-10 w-96 h-96 glow-blur-indigo rounded-full opacity-20 -z-10"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 glow-blur-cyan rounded-full opacity-35 -z-10"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl font-display">
            Past Case Studies & Experiences
          </h1>
          <p className="text-slate-400 text-lg">
            Explore our deployments demonstrating high enterprise-scale performance and automated decision pipelines.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold border cursor-pointer transition-all ${
                activeFilter === f.id
                  ? "bg-indigo-600 border-transparent text-white shadow-lg shadow-indigo-500/20"
                  : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((p, i) => (
            <div key={i} className="glass-panel-interactive p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="h-9 w-9 rounded-lg bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center">
                    <Folder className="h-4.5 w-4.5 text-indigo-400" />
                  </div>
                  <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-slate-400 uppercase font-mono font-medium tracking-wider">
                    {p.category}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Client: {p.client}</span>
                <p className="text-slate-400 text-xs leading-relaxed mt-3 mb-6">
                  {p.desc}
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-3 bg-slate-950/60 rounded-lg border border-white/5 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-semibold uppercase">Impact Metric</span>
                  <span className="text-xs text-indigo-400 font-bold flex items-center">
                    <CheckCircle className="h-3.5 w-3.5 mr-1 text-green-500" />
                    {p.metrics}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {p.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[9px] px-2 py-0.5 rounded bg-white/5 text-slate-400 font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

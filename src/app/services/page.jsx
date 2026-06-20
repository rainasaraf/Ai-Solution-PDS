"use client";

import { useState } from "react";
import { Bot, Cpu, LineChart, MessageSquare, Shield, Sliders, Play, RotateCcw, HelpCircle } from "lucide-react";

export default function Services() {
  // Simulator State: NLP
  const [nlpText, setNlpText] = useState("");
  const [nlpResult, setNlpResult] = useState(null);
  const [nlpSimulating, setNlpSimulating] = useState(false);

  // Simulator State: CV
  const [selectedCvImage, setSelectedCvImage] = useState("industrial");
  const [cvScanning, setCvScanning] = useState(false);
  const [cvObjectsFound, setCvObjectsFound] = useState([]);

  // Simulator State: Predictive Analytics
  const [anomalyThreshold, setAnomalyThreshold] = useState(70);
  const [learningRate, setLearningRate] = useState(0.05);

  // NLP Simulation Handler
  const handleNlpSimulate = () => {
    if (!nlpText.trim()) return;
    setNlpSimulating(true);
    setNlpResult(null);

    setTimeout(() => {
      setNlpSimulating(false);
      const wordsCount = nlpText.trim().split(/\s+/).length;
      const polarity = Math.random() > 0.4 ? "Positive" : "Neutral/Negative";
      const confidence = (Math.random() * 20 + 78).toFixed(1);
      
      setNlpResult({
        summary: `Parsed message stream of ${wordsCount} tokens successfully. Model identified operational intent.`,
        sentiment: polarity,
        confidence: `${confidence}%`,
        latency: `${Math.floor(Math.random() * 80 + 35)}ms`
      });
    }, 1200);
  };

  // CV Simulation Handler
  const handleCvScan = () => {
    setCvScanning(true);
    setCvObjectsFound([]);

    setTimeout(() => {
      setCvScanning(false);
      if (selectedCvImage === "industrial") {
        setCvObjectsFound([
          { label: "Robotic arm actuator", confidence: "98.4%", bbox: "x:142, y:88, w:110, h:240" },
          { label: "Overheating joint pivot", confidence: "87.1%", status: "warning", bbox: "x:185, y:205, w:30, h:30" }
        ]);
      } else if (selectedCvImage === "retail") {
        setCvObjectsFound([
          { label: "Client queue grouping", confidence: "91.8%", bbox: "x:32, y:120, w:180, h:150" },
          { label: "Idle cashier counter", confidence: "94.5%", bbox: "x:250, y:80, w:90, h:110" }
        ]);
      } else {
        setCvObjectsFound([
          { label: "Optical circuit anomaly", confidence: "95.6%", status: "danger", bbox: "x:88, y:144, w:45, h:45" }
        ]);
      }
    }, 1500);
  };

  return (
    <div className="relative isolate overflow-hidden min-h-screen py-16">
      
      {/* Glow effects */}
      <div className="absolute top-10 right-1/4 w-96 h-96 glow-blur-cyan rounded-full opacity-35 -z-10"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 glow-blur-indigo rounded-full opacity-20 -z-10"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl font-display">
            Our Software & AI Solutions
          </h1>
          <p className="text-slate-400 text-lg">
            High-performance mathematical modeling, machine learning engines, and automated pipelines designed to execute inside isolated production namespaces.
          </p>
        </div>

        {/* Services Grid Description */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-28">
          <div className="space-y-8">
            <div className="flex gap-4 items-start">
              <div className="h-10 w-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                <MessageSquare className="h-5 w-5 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2" id="nlp">Natural Language Processing</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Real-time sentiment classifiers, contextual search routers, and custom entity extractors. Fine-tuned on specialized industry data to operate at millisecond latencies.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="h-10 w-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                <Cpu className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2" id="cv">Computer Vision Systems</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Deep convolutional networks optimized for image classification, asset inspections, drone mapping segmentation, and thermal anomaly reports.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="h-10 w-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                <LineChart className="h-5 w-5 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2" id="predictive">Predictive Analytics Pipelines</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Autonomic regression engines compiling thousands of live metrics to predict infrastructure stress spikes, network breaches, and consumer behaviors.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="h-10 w-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <Bot className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2" id="agents">Autonomic AI Agents</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Independent script-based decision systems capable of listening to webhook feeds, making complex routing decisions, and updating database values recursively.
                </p>
              </div>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-white/10 flex flex-col justify-center space-y-6">
            <h3 className="text-2xl font-bold text-white font-display">Why Ai Solutions?</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-slate-300 text-sm">
                <Shield className="h-5 w-5 text-emerald-500" />
                <span>Enterprise grade security protocols</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-300 text-sm">
                <Cpu className="h-5 w-5 text-indigo-500" />
                <span>On-premise or cloud sandbox hosting</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-300 text-sm">
                <LineChart className="h-5 w-5 text-cyan-500" />
                <span>Scalable MongoDB connections with indexed telemetry</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI IN ACTION - Interactive Playground section */}
        <div className="border-t border-white/10 pt-20">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">Playground Area</span>
            <h2 className="text-3xl font-bold tracking-tight text-white font-display">Experience AI in Action</h2>
            <p className="text-slate-400">Interact with our client-side modules simulating real neural outputs.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Interactive NLP Simulator */}
            <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">1. NLP Intent Analysis</h3>
                  <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded font-mono">MODEL: AURA-NLP-V3</span>
                </div>
                <p className="text-slate-400 text-xs">Enter a customer email or support log to simulate entity processing and confidence matching.</p>
              </div>

              <div className="space-y-3">
                <textarea
                  value={nlpText}
                  onChange={(e) => setNlpText(e.target.value)}
                  placeholder="Example: Need to schedule a dashboard training session next Tuesday. The current customer metrics panel is slow to load."
                  className="w-full h-24 p-3 bg-white/5 border border-white/10 text-xs text-white rounded-lg focus:outline-none focus:border-indigo-500 transition-colors placeholder-slate-600 resize-none"
                />
                <button
                  onClick={handleNlpSimulate}
                  disabled={nlpSimulating || !nlpText.trim()}
                  className="w-full flex items-center justify-center space-x-1.5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 text-xs font-semibold disabled:opacity-40 transition-all cursor-pointer"
                >
                  <Play className="h-3.5 w-3.5" />
                  <span>{nlpSimulating ? "Simulating Inference..." : "Run Stream Parser"}</span>
                </button>
              </div>

              {/* Result display */}
              <div className="h-28 bg-slate-950/80 rounded-lg p-3 border border-white/5 font-mono text-[10px] space-y-1.5 overflow-y-auto">
                <span className="text-slate-500 block">{"// PARSER METRICS OUTPUT"}</span>
                {nlpSimulating && (
                  <span className="text-indigo-400 animate-pulse block">Processing pipeline tokens...</span>
                )}
                {!nlpSimulating && !nlpResult && (
                  <span className="text-slate-600 italic block">Awaiting model payload input...</span>
                )}
                {!nlpSimulating && nlpResult && (
                  <div className="space-y-1">
                    <div className="text-emerald-400">✔ {nlpResult.summary}</div>
                    <div><span className="text-slate-500">Sentiment:</span> <span className="text-white">{nlpResult.sentiment}</span></div>
                    <div><span className="text-slate-500">Confidence:</span> <span className="text-white">{nlpResult.confidence}</span></div>
                    <div><span className="text-slate-500">Total Latency:</span> <span className="text-white">{nlpResult.latency}</span></div>
                  </div>
                )}
              </div>
            </div>

            {/* Interactive CV Object Scanner */}
            <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">2. CV Segmentation Scan</h3>
                  <span className="text-[10px] bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded font-mono">MODEL: CV-SEG-V9</span>
                </div>
                <p className="text-slate-400 text-xs">Simulate neural boundary scans over various camera streams to identify structural anomalies.</p>
              </div>

              <div className="flex gap-4">
                {/* Selectors */}
                <div className="flex flex-col gap-2 shrink-0">
                  <button
                    onClick={() => { setSelectedCvImage("industrial"); setCvObjectsFound([]); }}
                    className={`px-3 py-1.5 rounded text-left text-xs font-semibold cursor-pointer border ${selectedCvImage === "industrial" ? "bg-purple-600 border-transparent text-white" : "bg-white/5 border-white/10 text-slate-400"}`}
                  >
                    Industrial Cam
                  </button>
                  <button
                    onClick={() => { setSelectedCvImage("retail"); setCvObjectsFound([]); }}
                    className={`px-3 py-1.5 rounded text-left text-xs font-semibold cursor-pointer border ${selectedCvImage === "retail" ? "bg-purple-600 border-transparent text-white" : "bg-white/5 border-white/10 text-slate-400"}`}
                  >
                    Retail Queue
                  </button>
                  <button
                    onClick={() => { setSelectedCvImage("circuit"); setCvObjectsFound([]); }}
                    className={`px-3 py-1.5 rounded text-left text-xs font-semibold cursor-pointer border ${selectedCvImage === "circuit" ? "bg-purple-600 border-transparent text-white" : "bg-white/5 border-white/10 text-slate-400"}`}
                  >
                    Hardware PCB
                  </button>
                </div>

                {/* Scan Screen */}
                <div className="flex-1 h-32 rounded-lg bg-slate-950 border border-white/10 relative overflow-hidden flex items-center justify-center">
                  {cvScanning && (
                    <div className="absolute inset-x-0 top-0 h-0.5 bg-purple-500 animate-bounce"></div>
                  )}
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-600">
                    {cvScanning ? "Scanning Matrix..." : `STREAM: ${selectedCvImage.toUpperCase()}`}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleCvScan}
                  disabled={cvScanning}
                  className="flex-1 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold disabled:opacity-40 transition-colors cursor-pointer"
                >
                  Start Scan
                </button>
                <button
                  onClick={() => setCvObjectsFound([])}
                  className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 rounded-lg cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Bbox results */}
              <div className="h-24 bg-slate-950/80 rounded-lg p-3 border border-white/5 font-mono text-[10px] space-y-1.5 overflow-y-auto">
                <span className="text-slate-500 block">{"// BOUNDING BOX COORDINATES"}</span>
                {cvObjectsFound.length === 0 && !cvScanning && (
                  <span className="text-slate-600 italic block">No detections active. Trigger scanner above.</span>
                )}
                {cvScanning && (
                  <span className="text-purple-400 animate-pulse block">Computing pixels matrices...</span>
                )}
                {cvObjectsFound.map((obj, i) => (
                  <div key={i} className="flex justify-between items-center text-slate-300">
                    <span>
                      <span className={obj.status === "warning" ? "text-amber-400" : obj.status === "danger" ? "text-red-400" : "text-emerald-400"}>■</span> {obj.label}
                    </span>
                    <span className="text-[9px] text-slate-500">{obj.bbox} ({obj.confidence})</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Interactive Predictive Adjuster */}
          <div className="mt-12 glass-panel p-6 rounded-2xl space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-white">3. Telemetry Stress Thresholds</h3>
                <p className="text-slate-400 text-xs">Simulate network telemetry stresstest calculations by dialing system thresholds.</p>
              </div>
              <span className="text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded font-mono">SYSTEM: ANOMALY-REG-V2</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-400">Anomaly Deviation Threshold</span>
                    <span className="text-cyan-400">{anomalyThreshold}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={anomalyThreshold}
                    onChange={(e) => setAnomalyThreshold(Number(e.target.value))}
                    className="w-full accent-cyan-500 h-1 bg-slate-900 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-400">Gradient Learning Rate</span>
                    <span className="text-cyan-400">{learningRate}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={learningRate * 100}
                    onChange={(e) => setLearningRate(Number(e.target.value) / 100)}
                    className="w-full accent-cyan-500 h-1 bg-slate-900 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Graphic Simulator */}
              <div className="h-28 rounded-lg bg-slate-950 border border-white/10 p-3 flex flex-col justify-between font-mono text-[10px]">
                <div className="flex justify-between items-center text-slate-500">
                  <span>{"// LIVE TELEMETRY SIMULATION MODEL"}</span>
                  <span className="text-[9px] text-slate-500">LEARNING_RATE: {learningRate}</span>
                </div>
                
                {/* Custom animated representation of stress bar charts */}
                <div className="flex items-end justify-between h-12 gap-1.5 px-2">
                  {[45, 62, 35, 78, 90, 55, 68, anomalyThreshold, anomalyThreshold - 15, 30].map((val, i) => {
                    const isAnomaly = val >= anomalyThreshold;
                    return (
                      <div
                        key={i}
                        className={`w-full rounded-t transition-all duration-300`}
                        style={{
                          height: `${val}%`,
                          backgroundColor: isAnomaly ? "rgba(239, 68, 68, 0.8)" : "rgba(6, 182, 212, 0.6)"
                        }}
                      ></div>
                    );
                  })}
                </div>

                <div className="flex justify-between text-[8px] text-slate-500">
                  <span>DEV_T_01</span>
                  <span>DEV_T_05</span>
                  <span>DEV_T_10</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

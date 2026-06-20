"use client";

import { useState, useEffect } from "react";
import { BookOpen, Search, User, Tag, Clock } from "lucide-react";

const defaultPosts = [
  {
    _id: "post_1",
    title: "Benchmarking Inference Speeds on Mongoose-Aggregated Data Structures",
    summary: "Analyzing database latency bottlenecks when passing high dimensional arrays from MongoDB Atlas to agent networks.",
    content: "This research paper evaluates the performance characteristics of passing aggregated document structures directly to PyTorch models in Next.js Server Actions...",
    author: "Dr. Raymond Vance",
    tags: ["Deep Learning", "Database"],
    createdAt: "2026-06-10T12:00:00.000Z"
  },
  {
    _id: "post_2",
    title: "Autonomic Refactoring: Restructuring Next.js API Routes for Agent Access",
    summary: "Explore structural layout models that enable automated script crawlers to securely interact with endpoint routes.",
    content: "As autonomic agents take over backend operations, building API endpoints with self-documenting JSON parameters and explicit schema schemas becomes critical...",
    author: "Elena Rostova",
    tags: ["Next.js", "Agents"],
    createdAt: "2026-06-05T09:00:00.000Z"
  },
  {
    _id: "post_3",
    title: "Mitigating Data Leakage in Multi-Agent Memory Sandboxes",
    summary: "Best practices for building context locks using Mongoose schemas when multiple agent threads share databases.",
    content: "Multi-agent setups often share access to common data stores, introducing race conditions and context leakage. This article presents a strict isolation schema...",
    author: "Marcus Aurelius",
    tags: ["Security", "Database"],
    createdAt: "2026-05-28T14:30:00.000Z"
  }
];

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/admin/blogs");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setPosts(data);
          } else {
            setPosts(defaultPosts);
          }
        } else {
          setPosts(defaultPosts);
        }
      } catch (err) {
        setPosts(defaultPosts);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const allTags = ["all", ...new Set(posts.flatMap(p => p.tags || []))];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === "all" || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="relative isolate overflow-hidden min-h-screen py-16">

      {/* Background glow backdrops */}
      <div className="absolute top-20 left-10 w-96 h-96 glow-blur-indigo rounded-full opacity-20 -z-10"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 glow-blur-cyan rounded-full opacity-35 -z-10"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl font-display">
            Ai Solutions Tech Articles & Research
          </h1>
          <p className="text-slate-400 text-lg">
            Engineering benchmarks, architectural design patterns, and deployment case studies compiled by our core team.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-12 w-full">
          {/* Search Box */}
          <div className="relative w-full md:max-w-xs">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full bg-white/5 border border-white/10 text-white rounded-lg pl-9 pr-3 py-2 text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 justify-center">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-full text-[10px] font-semibold border cursor-pointer transition-all ${selectedTag === tag
                    ? "bg-indigo-600 border-transparent text-white"
                    : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                  }`}
              >
                {tag === "all" ? "All Tags" : tag}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-48 space-x-2">
            <span className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce"></span>
            <span className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.15s]"></span>
            <span className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.3s]"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPosts.map((post) => (
              <article key={post._id} className="glass-panel p-6 rounded-2xl flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {new Date(post.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5" />
                      {post.author}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white leading-snug hover:text-indigo-400 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-slate-400 text-xs leading-relaxed">
                    {post.summary}
                  </p>
                </div>

                <div className="border-t border-white/5 pt-4 flex flex-wrap gap-1.5">
                  {post.tags.map((t, i) => (
                    <span key={i} className="text-[9px] px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 font-mono flex items-center gap-0.5">
                      <Tag className="h-2.5 w-2.5" />
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && filteredPosts.length === 0 && (
          <div className="text-center py-20 text-slate-500 text-sm italic">
            No articles found matching the search criteria.
          </div>
        )}

      </div>
    </div>
  );
}

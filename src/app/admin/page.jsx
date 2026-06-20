"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { 
  Users, Calendar, FileText, Image as ImageIcon, MessageSquare, 
  Trash2, Search, Plus, Check, X, ShieldAlert, LogOut, CheckCircle, Globe, LayoutDashboard 
} from "lucide-react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Navigation / Tabs
  const [activeTab, setActiveTab] = useState("inquiries"); // inquiries, feedback, events, blogs, gallery

  // Inquiries State
  const [inquiries, setInquiries] = useState([]);
  const [inquiryStats, setInquiryStats] = useState({ total: 0, thisMonth: 0, countries: 0, pending: 0 });
  const [inquirySearch, setInquirySearch] = useState("");
  const [loadingInquiries, setLoadingInquiries] = useState(true);

  // Feedback State
  const [feedbacks, setFeedbacks] = useState([]);
  const [loadingFeedback, setLoadingFeedback] = useState(true);
  const [pendingFeedbackCount, setPendingFeedbackCount] = useState(0);

  // Events State
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", description: "", date: "", time: "", location: "" });
  const [editingEventId, setEditingEventId] = useState("");

  // Blogs State
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [newBlog, setNewBlog] = useState({ title: "", summary: "", content: "", author: "", tags: "" });
  const [editingBlogId, setEditingBlogId] = useState("");

  // Gallery State
  const [gallery, setGallery] = useState([]);
  const [loadingGallery, setLoadingGallery] = useState(true);
  const [showGalleryForm, setShowGalleryForm] = useState(false);
  const [newGallery, setNewGallery] = useState({ title: "", imageUrl: "", category: "Solutions", rating: 5 });
  const [editingGalleryId, setEditingGalleryId] = useState("");

  // Redirect to login if unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  // Fetch Inquiries (depends on search query)
  useEffect(() => {
    if (status !== "authenticated") return;
    
    async function fetchInquiries() {
      setLoadingInquiries(true);
      try {
        const res = await fetch(`/api/admin/inquiries?search=${inquirySearch}`);
        if (res.ok) {
          const data = await res.json();
          setInquiries(data.inquiries || []);
          setInquiryStats(data.stats || { total: 0, thisMonth: 0, countries: 0, pending: 0 });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingInquiries(false);
      }
    }

    const delayDebounce = setTimeout(() => {
      fetchInquiries();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [inquirySearch, status]);

  // Fetch pending feedback count on initial load (just for the badge count)
  useEffect(() => {
    if (status !== "authenticated") return;
    async function fetchPendingCount() {
      try {
        const res = await fetch("/api/admin/feedback");
        if (res.ok) {
          const data = await res.json();
          const pending = data.filter(f => !f.approved).length;
          setPendingFeedbackCount(pending);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchPendingCount();
  }, [status]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setEditingEventId("");
    setShowEventForm(false);
    setNewEvent({ title: "", description: "", date: "", time: "", location: "" });

    setEditingBlogId("");
    setShowBlogForm(false);
    setNewBlog({ title: "", summary: "", content: "", author: "", tags: "" });

    setEditingGalleryId("");
    setShowGalleryForm(false);
    setNewGallery({ title: "", imageUrl: "", category: "Solutions", rating: 5 });
  };

  // Fetch other lists based on active tab selection
  useEffect(() => {
    if (status !== "authenticated") return;

    if (activeTab === "feedback") {
      fetchFeedbacks();
    } else if (activeTab === "events") {
      fetchEvents();
    } else if (activeTab === "blogs") {
      fetchBlogs();
    } else if (activeTab === "gallery") {
      fetchGallery();
    }
  }, [activeTab, status]);

  // API Call: Fetch Feedbacks
  async function fetchFeedbacks() {
    setLoadingFeedback(true);
    try {
      const res = await fetch("/api/admin/feedback");
      if (res.ok) {
        const data = await res.json();
        setFeedbacks(data);
        setPendingFeedbackCount(data.filter(f => !f.approved).length);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingFeedback(false);
    }
  }

  // API Call: Fetch Events
  async function fetchEvents() {
    setLoadingEvents(true);
    try {
      const res = await fetch("/api/admin/events");
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingEvents(false);
    }
  }

  // API Call: Fetch Blogs
  async function fetchBlogs() {
    setLoadingBlogs(true);
    try {
      const res = await fetch("/api/admin/blogs");
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingBlogs(false);
    }
  }

  // API Call: Fetch Gallery
  async function fetchGallery() {
    setLoadingGallery(true);
    try {
      const res = await fetch("/api/admin/gallery");
      if (res.ok) {
        const data = await res.json();
        setGallery(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingGallery(false);
    }
  }

  // Inquiry: Delete Handler
  const handleDeleteInquiry = async (id) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, { method: "DELETE" });
      if (res.ok) {
        setInquiries(inquiries.filter(inq => inq._id !== id));
        // Refresh stats
        setInquiryStats(prev => ({ ...prev, total: prev.total - 1 }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Inquiry: Status Update Handler
  const handleUpdateInquiryStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        const updatedInquiries = inquiries.map(inq => {
          if (inq._id === id) {
            return { ...inq, status: newStatus };
          }
          return inq;
        });
        setInquiries(updatedInquiries);
        // Calculate new pending count dynamically
        const pending = updatedInquiries.filter(i => (i.status || "Pending") === "Pending").length;
        setInquiryStats(prev => ({ ...prev, pending }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Feedback: Moderate Toggle (Approve / Unapprove)
  const handleToggleFeedback = async (id, currentStatus) => {
    try {
      const res = await fetch("/api/admin/feedback", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, approved: !currentStatus })
      });
      if (res.ok) {
        fetchFeedbacks();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Feedback: Delete Handler
  const handleDeleteFeedback = async (id) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      const res = await fetch(`/api/admin/feedback?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setFeedbacks(feedbacks.filter(f => f._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Event: Submit Create / Update
  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      const method = editingEventId ? "PUT" : "POST";
      const payload = editingEventId ? { ...newEvent, id: editingEventId } : newEvent;
      const res = await fetch("/api/admin/events", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setShowEventForm(false);
        setEditingEventId("");
        setNewEvent({ title: "", description: "", date: "", time: "", location: "" });
        fetchEvents();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Event: Delete Handler
  const handleDeleteEvent = async (id) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      const res = await fetch(`/api/admin/events?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setEvents(events.filter(e => e._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Blog: Submit Create / Update
  const handleAddBlog = async (e) => {
    e.preventDefault();
    const tagsArray = typeof newBlog.tags === "string" 
      ? newBlog.tags.split(",").map(t => t.trim()).filter(Boolean)
      : newBlog.tags;
    try {
      const method = editingBlogId ? "PUT" : "POST";
      const payload = editingBlogId ? { ...newBlog, tags: tagsArray, id: editingBlogId } : { ...newBlog, tags: tagsArray };
      const res = await fetch("/api/admin/blogs", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setShowBlogForm(false);
        setEditingBlogId("");
        setNewBlog({ title: "", summary: "", content: "", author: "", tags: "" });
        fetchBlogs();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Blog: Delete Handler
  const handleDeleteBlog = async (id) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      const res = await fetch(`/api/admin/blogs?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setBlogs(blogs.filter(b => b._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Gallery: Submit Create / Update
  const handleAddGallery = async (e) => {
    e.preventDefault();
    try {
      const method = editingGalleryId ? "PUT" : "POST";
      const payload = editingGalleryId ? { ...newGallery, id: editingGalleryId } : newGallery;
      const res = await fetch("/api/admin/gallery", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setShowGalleryForm(false);
        setEditingGalleryId("");
        setNewGallery({ title: "", imageUrl: "", category: "Solutions", rating: 5 });
        fetchGallery();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Gallery: Delete Handler
  const handleDeleteGallery = async (id) => {
    if (!confirm("Are you sure you want to delete this media item?")) return;
    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setGallery(gallery.filter(g => g._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Check Session Guards
  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center bg-brand-bg text-white">
        <div className="flex space-x-2">
          <span className="h-3.5 w-3.5 rounded-full bg-indigo-500 animate-bounce"></span>
          <span className="h-3.5 w-3.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.15s]"></span>
          <span className="h-3.5 w-3.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.3s]"></span>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-brand-bg text-white space-y-4">
        <ShieldAlert className="h-12 w-12 text-red-500" />
        <h3 className="text-xl font-bold">Access Denied</h3>
        <p className="text-slate-400 text-sm">Redirecting to login portal...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-brand-bg text-slate-100">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-white/10 bg-slate-950/60 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          <div className="flex items-center space-x-2">
            <LayoutDashboard className="h-6 w-6 text-indigo-400" />
            <span className="font-display font-bold text-lg text-white">Ai Solutions Admin</span>
          </div>

          <nav className="flex flex-col gap-2">
            <button
              onClick={() => handleTabChange("inquiries")}
              className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                activeTab === "inquiries" ? "bg-indigo-600 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Inquiries & Demos</span>
            </button>

            <button
              onClick={() => handleTabChange("feedback")}
              className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                activeTab === "feedback" ? "bg-indigo-600 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="flex items-center space-x-3">
                <MessageSquare className="h-4 w-4" />
                <span>Customer Feedback</span>
              </span>
              {pendingFeedbackCount > 0 && (
                <span className={`ml-2 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold ${
                  activeTab === "feedback" ? "bg-white text-indigo-600" : "bg-amber-500 text-white"
                }`}>
                  {pendingFeedbackCount}
                </span>
              )}
            </button>

            <button
              onClick={() => handleTabChange("events")}
              className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                activeTab === "events" ? "bg-indigo-600 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Calendar className="h-4 w-4" />
              <span>Manage Events</span>
            </button>

            <button
              onClick={() => handleTabChange("blogs")}
              className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                activeTab === "blogs" ? "bg-indigo-600 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>Manage Blogs</span>
            </button>

            <button
              onClick={() => handleTabChange("gallery")}
              className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                activeTab === "gallery" ? "bg-indigo-600 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <ImageIcon className="h-4 w-4" />
              <span>Manage Gallery</span>
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-white/5 space-y-3">
          <div className="text-[10px] text-slate-500 font-mono">
            <span>SESSION ACTIVE</span>
            <span className="block text-white font-bold truncate">{session.user?.name}</span>
          </div>
          
          <button
            onClick={() => router.push("/")}
            className="flex items-center space-x-2 text-xs text-slate-400 hover:text-white cursor-pointer w-full text-left"
          >
            <Globe className="h-4 w-4" />
            <span>Go to Public Site</span>
          </button>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center space-x-2 text-xs text-red-400 hover:text-red-300 cursor-pointer w-full text-left"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        
        {/* Header toolbar */}
        <div className="flex justify-between items-center pb-4 border-b border-white/5">
          <div>
            <h1 className="text-2xl font-bold text-white font-display uppercase tracking-tight">Admin Dashboard</h1>
            <p className="text-slate-500 text-xs font-mono">STATUS: CONNECTED TO CLUSTER_DATABASE</p>
          </div>
        </div>

        {/* Stats Cards Section */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Total Inquiries</span>
              <span className="block text-2xl font-extrabold text-white mt-1 font-mono">{inquiryStats.total}</span>
            </div>
            <div className="h-10 w-10 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center rounded-xl">
              <Users className="h-5 w-5" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Inquiries This Month</span>
              <span className="block text-2xl font-extrabold text-indigo-400 mt-1 font-mono">{inquiryStats.thisMonth}</span>
            </div>
            <div className="h-10 w-10 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center rounded-xl">
              <Calendar className="h-5 w-5" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Unique Countries</span>
              <span className="block text-2xl font-extrabold text-cyan-400 mt-1 font-mono">{inquiryStats.countries}</span>
            </div>
            <div className="h-10 w-10 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center rounded-xl">
              <Globe className="h-5 w-5" />
            </div>
          </div>

          {/* Card 4 */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Pending Review</span>
              <span className="block text-2xl font-extrabold text-purple-400 mt-1 font-mono">{inquiryStats.pending}</span>
            </div>
            <div className="h-10 w-10 bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center rounded-xl">
              <ShieldAlert className="h-5 w-5" />
            </div>
          </div>
        </section>

        {/* Tab content conditional rendering */}
        <section className="space-y-6">
          
          {/* TAB 1: INQUIRIES */}
          {activeTab === "inquiries" && (
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
              
              {/* Toolbar & Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                
                {/* Search Bar */}
                <div className="lg:col-span-1 space-y-1.5">
                  <label className="text-[10px] text-slate-500 uppercase font-semibold">Filter Inquiries</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={inquirySearch}
                      onChange={(e) => setInquirySearch(e.target.value)}
                      placeholder="Search name, email, or company..."
                      className="w-full bg-white/5 border border-white/10 text-white rounded-lg pl-9 pr-3 py-2 text-xs placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                    <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
                  </div>
                </div>

                {/* SVG Graph: Monthly Inquiries statistics */}
                <div className="lg:col-span-2 bg-slate-950/45 p-4 rounded-xl border border-white/5 flex flex-col justify-between h-28 font-mono text-[9px]">
                  <div className="flex justify-between items-center text-slate-500">
                    <span>{"// INQUIRIES TRAFFIC TREND (MONTHLY)"}</span>
                    <span className="text-[8px] bg-indigo-500/10 text-indigo-400 px-1.5 py-0.5 rounded font-bold">AVG: 20/MO</span>
                  </div>
                  
                  {/* SVG line chart */}
                  <svg className="w-full h-12 stroke-indigo-500 fill-none" viewBox="0 0 100 20">
                    <path d="M 0 15 Q 15 10 30 18 T 60 5 T 90 12 L 100 8" strokeWidth="1" strokeLinecap="round" />
                    <line x1="0" y1="18" x2="100" y2="18" stroke="#1e293b" strokeDasharray="2" />
                  </svg>

                  <div className="flex justify-between text-[7px] text-slate-500 uppercase font-bold">
                    <span>Jan</span>
                    <span>Mar</span>
                    <span>May</span>
                    <span>Jul</span>
                    <span>Sep</span>
                    <span>Nov</span>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-500 font-bold uppercase tracking-wider">
                      <th className="pb-3 pr-4">Profile</th>
                      <th className="pb-3 pr-4">Details</th>
                      <th className="pb-3 pr-4">Country</th>
                      <th className="pb-3 pr-4">Status</th>
                      <th className="pb-3 pr-4">Submitted</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loadingInquiries ? (
                      <tr>
                        <td colSpan="5" className="py-8 text-center text-slate-500">
                          Querying records...
                        </td>
                      </tr>
                    ) : inquiries.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="py-8 text-center text-slate-500 italic">
                          No inquiries found. Check your database connections.
                        </td>
                      </tr>
                    ) : (
                      inquiries.map((inq) => (
                        <tr key={inq._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-4 pr-4">
                            <span className="font-bold text-white block">{inq.fullName}</span>
                            <span className="text-slate-400 text-[10px] font-mono">{inq.email}</span>
                          </td>
                          <td className="py-4 pr-4">
                            <span className="font-semibold text-slate-300 block">{inq.companyName} ({inq.jobTitle})</span>
                            <span className="text-[10px] text-slate-500 leading-normal block max-w-sm overflow-hidden text-ellipsis whitespace-nowrap">
                              {inq.jobDetails}
                            </span>
                          </td>
                          <td className="py-4 pr-4 text-slate-400 font-semibold">{inq.country}</td>
                          <td className="py-4 pr-4">
                            <select
                              value={inq.status || "Pending"}
                              onChange={(e) => handleUpdateInquiryStatus(inq._id, e.target.value)}
                              className="bg-slate-950 border border-white/10 text-slate-300 rounded px-1.5 py-1 text-[10px] focus:outline-none focus:border-indigo-500 cursor-pointer font-semibold"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Resolved">Resolved</option>
                            </select>
                          </td>
                          <td className="py-4 pr-4 text-slate-500 font-mono text-[10px]">
                            {new Date(inq.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-4 text-right">
                            <button
                              onClick={() => handleDeleteInquiry(inq._id)}
                              className="p-1.5 text-slate-500 hover:text-red-400 bg-white/5 rounded-md hover:bg-red-500/10 cursor-pointer transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: FEEDBACK */}
          {activeTab === "feedback" && (
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
              <div className="flex justify-between items-center flex-wrap gap-2">
                <div>
                  <h3 className="text-lg font-bold text-white font-display">Customer Feedback</h3>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                    {feedbacks.filter(f => !f.approved).length} pending review •{" "}
                    {feedbacks.filter(f => f.approved).length} approved •{" "}
                    {feedbacks.length} total submissions
                  </p>
                </div>
                <span className="text-xs text-slate-500 font-mono">Approved posts display on public Customer Feedback page</span>
              </div>

              {loadingFeedback ? (
                <div className="text-center py-8 text-slate-500">Retrieving feedback logs...</div>
              ) : feedbacks.length === 0 ? (
                <div className="text-center py-8 text-slate-500 italic">No feedback entries created yet.</div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {feedbacks.map((fb) => (
                    <div key={fb._id} className={`p-4 rounded-xl border flex flex-col md:flex-row justify-between gap-4 items-start md:items-center transition-colors ${
                      fb.approved 
                        ? "bg-slate-950/40 border-white/5" 
                        : "bg-amber-500/5 border-amber-500/20"
                    }`}>
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center flex-wrap gap-2">
                          <span className="font-bold text-white">{fb.name}</span>
                          <span className="text-[10px] text-slate-500 uppercase font-semibold">({fb.companyName})</span>
                          <span className="text-xs text-amber-400 font-bold font-mono">★ {fb.rating}</span>
                          {!fb.approved ? (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase">Pending</span>
                          ) : (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-green-500/10 text-green-400 border border-green-500/20 uppercase">Approved</span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 italic">&quot;{fb.message}&quot;</p>
                        {fb.createdAt && (
                          <p className="text-[9px] text-slate-600 font-mono">
                            Submitted: {new Date(fb.createdAt).toLocaleString()}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 self-end md:self-auto">
                        <button
                          onClick={() => handleToggleFeedback(fb._id, fb.approved)}
                          className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border transition-colors ${
                            fb.approved
                              ? "bg-green-600 border-transparent text-white hover:bg-green-500"
                              : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                          }`}
                        >
                          <Check className="h-3.5 w-3.5" />
                          <span>{fb.approved ? "Approved" : "Approve"}</span>
                        </button>
                        
                        <button
                          onClick={() => handleDeleteFeedback(fb._id)}
                          className="p-2 text-slate-500 hover:text-red-400 bg-white/5 border border-white/10 rounded-lg hover:bg-red-500/10 cursor-pointer transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: EVENTS */}
          {activeTab === "events" && (
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
              
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-white font-display">Manage Promotional Events</h3>
                <button
                  onClick={() => {
                    if (showEventForm) {
                      setEditingEventId("");
                      setNewEvent({ title: "", description: "", date: "", time: "", location: "" });
                    }
                    setShowEventForm(!showEventForm);
                  }}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-500 cursor-pointer transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>{showEventForm ? "Close Form" : "Create Event"}</span>
                </button>
              </div>

              {/* Add Event Form */}
              {showEventForm && (
                <form onSubmit={handleAddEvent} className="p-4 rounded-xl bg-slate-950/45 border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-top-4 duration-200">
                  <div className="md:col-span-2 border-b border-white/5 pb-2">
                    <h4 className="text-xs font-bold text-white font-display uppercase tracking-wider">
                      {editingEventId ? `Editing Event: ${newEvent.title || "Untitled"}` : "Create New Promotional Event"}
                    </h4>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">Event Title</label>
                    <input
                      type="text"
                      required
                      value={newEvent.title}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Title"
                      className="w-full bg-white/5 border border-white/10 text-white rounded-lg p-2 text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">Location / Link</label>
                    <input
                      type="text"
                      required
                      value={newEvent.location}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Virtual Webinar / HQ / Link"
                      className="w-full bg-white/5 border border-white/10 text-white rounded-lg p-2 text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">Date</label>
                    <input
                      type="text"
                      required
                      value={newEvent.date}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                      placeholder="June 25, 2026"
                      className="w-full bg-white/5 border border-white/10 text-white rounded-lg p-2 text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">Time</label>
                    <input
                      type="text"
                      required
                      value={newEvent.time}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                      placeholder="14:00 GMT"
                      className="w-full bg-white/5 border border-white/10 text-white rounded-lg p-2 text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-1">
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">Description</label>
                    <textarea
                      required
                      rows={3}
                      value={newEvent.description}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Details"
                      className="w-full bg-white/5 border border-white/10 text-white rounded-lg p-2 text-xs focus:outline-none focus:border-indigo-500 resize-none"
                    />
                  </div>

                  <div className="md:col-span-2 flex gap-3">
                    <button
                      type="submit"
                      className="flex-grow py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      {editingEventId ? "Update Event Details" : "Publish Event"}
                    </button>
                    {editingEventId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingEventId("");
                          setNewEvent({ title: "", description: "", date: "", time: "", location: "" });
                          setShowEventForm(false);
                        }}
                        className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                      >
                        Cancel Edit
                      </button>
                    )}
                  </div>
                </form>
              )}

              {loadingEvents ? (
                <div className="text-center py-8 text-slate-500">Querying events...</div>
              ) : events.length === 0 ? (
                <div className="text-center py-8 text-slate-500 italic">No events published.</div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {events.map((evt) => (
                    <div key={evt._id} className="p-4 rounded-xl bg-slate-950/40 border border-white/5 flex justify-between items-center gap-4">
                      <div>
                        <h4 className="font-bold text-white">{evt.title}</h4>
                        <span className="text-[10px] text-indigo-400 font-semibold">{evt.date} • {evt.time} • {evt.location}</span>
                        <p className="text-xs text-slate-400 mt-1 max-w-xl">{evt.description}</p>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span className="block text-slate-500 text-[9px] uppercase font-bold">Registered</span>
                          <span className="text-sm font-extrabold text-white font-mono">{evt.registrationCount || 0}</span>
                        </div>

                        <button
                          onClick={() => {
                            setNewEvent({
                              title: evt.title,
                              description: evt.description,
                              date: evt.date,
                              time: evt.time,
                              location: evt.location
                            });
                            setEditingEventId(evt._id);
                            setShowEventForm(true);
                          }}
                          className="px-2.5 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-400 hover:text-white rounded text-[10px] font-semibold transition-colors cursor-pointer"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDeleteEvent(evt._id)}
                          className="p-2 text-slate-500 hover:text-red-400 bg-white/5 border border-white/10 rounded-lg hover:bg-red-500/10 cursor-pointer transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: BLOGS */}
          {activeTab === "blogs" && (
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
              
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-white font-display">Manage Blogs & Research Articles</h3>
                <button
                  onClick={() => {
                    if (showBlogForm) {
                      setEditingBlogId("");
                      setNewBlog({ title: "", summary: "", content: "", author: "", tags: "" });
                    }
                    setShowBlogForm(!showBlogForm);
                  }}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-500 cursor-pointer transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>{showBlogForm ? "Close Form" : "Write Article"}</span>
                </button>
              </div>

              {/* Add Blog Form */}
              {showBlogForm && (
                <form onSubmit={handleAddBlog} className="p-4 rounded-xl bg-slate-950/45 border border-white/10 grid grid-cols-1 gap-4 animate-in slide-in-from-top-4 duration-200">
                  <div className="border-b border-white/5 pb-2">
                    <h4 className="text-xs font-bold text-white font-display uppercase tracking-wider">
                      {editingBlogId ? `Editing Article: ${newBlog.title || "Untitled"}` : "Write New Research Article"}
                    </h4>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-500 uppercase font-semibold">Article Title</label>
                      <input
                        type="text"
                        required
                        value={newBlog.title}
                        onChange={(e) => setNewBlog(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g. Mongoose Latency Tuning"
                        className="w-full bg-white/5 border border-white/10 text-white rounded-lg p-2 text-xs focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-500 uppercase font-semibold">Author</label>
                      <input
                        type="text"
                        required
                        value={newBlog.author}
                        onChange={(e) => setNewBlog(prev => ({ ...prev, author: e.target.value }))}
                        placeholder="Author Name"
                        className="w-full bg-white/5 border border-white/10 text-white rounded-lg p-2 text-xs focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-500 uppercase font-semibold">Tags (Comma Separated)</label>
                      <input
                        type="text"
                        value={newBlog.tags}
                        onChange={(e) => setNewBlog(prev => ({ ...prev, tags: e.target.value }))}
                        placeholder="Deep Learning, Database"
                        className="w-full bg-white/5 border border-white/10 text-white rounded-lg p-2 text-xs focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">Summary</label>
                    <input
                      type="text"
                      required
                      value={newBlog.summary}
                      onChange={(e) => setNewBlog(prev => ({ ...prev, summary: e.target.value }))}
                      placeholder="One sentence summary to show on search grids"
                      className="w-full bg-white/5 border border-white/10 text-white rounded-lg p-2 text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">Content Body</label>
                    <textarea
                      required
                      rows={6}
                      value={newBlog.content}
                      onChange={(e) => setNewBlog(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Article content markdown or text..."
                      className="w-full bg-white/5 border border-white/10 text-white rounded-lg p-2 text-xs focus:outline-none focus:border-indigo-500 resize-none font-sans"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-grow py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      {editingBlogId ? "Update Article Details" : "Publish Article"}
                    </button>
                    {editingBlogId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingBlogId("");
                          setNewBlog({ title: "", summary: "", content: "", author: "", tags: "" });
                          setShowBlogForm(false);
                        }}
                        className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                      >
                        Cancel Edit
                      </button>
                    )}
                  </div>
                </form>
              )}

              {loadingBlogs ? (
                <div className="text-center py-8 text-slate-500">Querying articles...</div>
              ) : blogs.length === 0 ? (
                <div className="text-center py-8 text-slate-500 italic">No blogs written.</div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {blogs.map((b) => (
                    <div key={b._id} className="p-4 rounded-xl bg-slate-950/40 border border-white/5 flex justify-between items-center gap-4">
                      <div>
                        <h4 className="font-bold text-white">{b.title}</h4>
                        <span className="text-[10px] text-slate-500 font-mono">By {b.author} • {new Date(b.createdAt).toLocaleDateString()}</span>
                        <p className="text-xs text-slate-400 mt-1 max-w-xl truncate">{b.summary}</p>
                      </div>

                      <button
                        onClick={() => {
                          setNewBlog({
                            title: b.title,
                            summary: b.summary,
                            content: b.content,
                            author: b.author,
                            tags: b.tags ? b.tags.join(", ") : ""
                          });
                          setEditingBlogId(b._id);
                          setShowBlogForm(true);
                        }}
                        className="px-2.5 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-400 hover:text-white rounded text-[10px] font-semibold transition-colors cursor-pointer"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDeleteBlog(b._id)}
                        className="p-2 text-slate-500 hover:text-red-400 bg-white/5 border border-white/10 rounded-lg hover:bg-red-500/10 cursor-pointer transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: GALLERY */}
          {activeTab === "gallery" && (
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
              
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-white font-display">Manage Gallery Media</h3>
                <button
                  onClick={() => {
                    if (showGalleryForm) {
                      setEditingGalleryId("");
                      setNewGallery({ title: "", imageUrl: "", category: "Solutions", rating: 5 });
                    }
                    setShowGalleryForm(!showGalleryForm);
                  }}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-500 cursor-pointer transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>{showGalleryForm ? "Close Form" : "Add Image"}</span>
                </button>
              </div>

              {/* Add Gallery Item Form */}
              {showGalleryForm && (
                <form onSubmit={handleAddGallery} className="p-4 rounded-xl bg-slate-950/45 border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-top-4 duration-200">
                  <div className="md:col-span-2 border-b border-white/5 pb-2">
                    <h4 className="text-xs font-bold text-white font-display uppercase tracking-wider">
                      {editingGalleryId ? `Editing Gallery Item: ${newGallery.title || "Untitled"}` : "Add New Gallery Media Log"}
                    </h4>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">Title</label>
                    <input
                      type="text"
                      required
                      value={newGallery.title}
                      onChange={(e) => setNewGallery(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g. Annual Summit 2026"
                      className="w-full bg-white/5 border border-white/10 text-white rounded-lg p-2 text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">Unsplash Image URL</label>
                    <input
                      type="url"
                      required
                      value={newGallery.imageUrl}
                      onChange={(e) => setNewGallery(prev => ({ ...prev, imageUrl: e.target.value }))}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full bg-white/5 border border-white/10 text-white rounded-lg p-2 text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">Category</label>
                    <select
                      value={newGallery.category}
                      onChange={(e) => setNewGallery(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full bg-slate-950 border border-white/10 text-white rounded-lg p-2 text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
                    >
                      <option value="Solutions">Solutions</option>
                      <option value="Events">Events</option>
                      <option value="Office">Office</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 uppercase font-semibold">Rating (1-5 Stars)</label>
                    <select
                      value={newGallery.rating || 5}
                      onChange={(e) => setNewGallery(prev => ({ ...prev, rating: Number(e.target.value) }))}
                      className="w-full bg-slate-950 border border-white/10 text-white rounded-lg p-2 text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
                    >
                      <option value="5">5 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="3">3 Stars</option>
                      <option value="2">2 Stars</option>
                      <option value="1">1 Star</option>
                    </select>
                  </div>

                  <div className="md:col-span-2 flex gap-3">
                    <button
                      type="submit"
                      className="flex-grow py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      {editingGalleryId ? "Update Image Details" : "Save Image Log"}
                    </button>
                    {editingGalleryId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingGalleryId("");
                          setNewGallery({ title: "", imageUrl: "", category: "Solutions", rating: 5 });
                          setShowGalleryForm(false);
                        }}
                        className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                      >
                        Cancel Edit
                      </button>
                    )}
                  </div>
                </form>
              )}

              {loadingGallery ? (
                <div className="text-center py-8 text-slate-500">Querying gallery...</div>
              ) : gallery.length === 0 ? (
                <div className="text-center py-8 text-slate-500 italic">No gallery logs recorded.</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gallery.map((g) => (
                    <div key={g._id} className="p-3 rounded-xl bg-slate-950/40 border border-white/5 flex flex-col justify-between h-48 relative overflow-hidden group">
                      <img
                        src={g.imageUrl}
                        alt={g.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:scale-105 group-hover:opacity-40 transition-all duration-300 -z-10"
                      />
                      
                      <div className="flex justify-between items-start">
                        <span className="text-[9px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded font-mono uppercase tracking-wider font-semibold">
                          {g.category}
                        </span>
                        
                        <span className="text-[10px] text-amber-400 font-bold font-mono">
                          ★ {g.rating || 5}
                        </span>
                        
                        <button
                          onClick={() => {
                            setNewGallery({
                              title: g.title,
                              imageUrl: g.imageUrl,
                              category: g.category,
                              rating: g.rating || 5
                            });
                            setEditingGalleryId(g._id);
                            setShowGalleryForm(true);
                          }}
                          className="p-1.5 bg-slate-950/80 border border-white/10 hover:bg-indigo-600 hover:border-transparent text-slate-400 hover:text-white rounded-md transition-colors cursor-pointer text-[10px] font-semibold"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDeleteGallery(g._id)}
                          className="p-1.5 text-slate-500 hover:text-red-400 bg-slate-950/80 border border-white/10 rounded-md hover:bg-red-500/15 cursor-pointer transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <h4 className="font-bold text-xs text-white bg-slate-950/80 p-2 rounded border border-white/5 backdrop-blur-sm truncate">
                        {g.title}
                      </h4>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </section>
      </main>
    </div>
  );
}

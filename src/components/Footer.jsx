"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cpu, Mail, Globe, Shield, Terminal } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  // Hide footer inside admin dashboard pages
  const isAdminPage = pathname?.startsWith("/admin") && pathname !== "/admin/login";
  if (isAdminPage) return null;

  return (
    <footer className="w-full border-t border-white/10 bg-brand-bg py-12 relative overflow-hidden">
      {/* Background glow lines */}
      <div className="absolute top-0 right-1/4 w-96 h-96 glow-blur-cyan -z-10 rounded-full opacity-30"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand & Description */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center space-x-2 text-white">
              <Cpu className="h-6 w-6 text-indigo-400" />
              <span className="font-display text-xl font-bold tracking-tight">
                AI<span className="text-indigo-400"> Solutions</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Empowering global enterprises with production-grade AI solutions, predictive modeling, and autonomic agents.
            </p>
            <div className="flex space-x-4 pt-2 text-slate-500">
              <Globe className="h-5 w-5 hover:text-indigo-400 cursor-pointer transition-colors" />
              <Terminal className="h-5 w-5 hover:text-indigo-400 cursor-pointer transition-colors" />
              <Shield className="h-5 w-5 hover:text-indigo-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Core Offerings */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Solutions</h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/services#nlp" className="hover:text-white transition-colors">Natural Language Processing</Link>
              </li>
              <li>
                <Link href="/services#cv" className="hover:text-white transition-colors">Computer Vision Systems</Link>
              </li>
              <li>
                <Link href="/services#predictive" className="hover:text-white transition-colors">Predictive Analytics</Link>
              </li>
              <li>
                <Link href="/services#agents" className="hover:text-white transition-colors">Autonomic AI Agents</Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Company</h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">Case Studies</Link>
              </li>
              <li>
                <Link href="/feedback" className="hover:text-white transition-colors">Customer Feedback</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">Media Gallery</Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-white transition-colors">Upcoming Events</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">Tech Articles</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Admin Access */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase">Stay Updated</h3>
            <p className="text-slate-400 text-sm">Subscribe to receive tech updates, benchmarks, and research studies.</p>
            <div className="relative">
              <input
                type="email"
                placeholder="developer@company.com"
                className="w-full pl-3 pr-10 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
              />
              <button className="absolute right-1 top-1 p-1.5 bg-indigo-600 rounded-md hover:bg-indigo-500 transition-colors">
                <Mail className="h-3.5 w-3.5 text-white" />
              </button>
            </div>

            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
              <span>&copy; {new Date().getFullYear()} Ai Solutions Inc.</span>
              <Link href="/admin" className="hover:text-white flex items-center space-x-1 transition-colors">
                <Shield className="h-3 w-3" />
                <span>Admin Portal</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Cpu, Menu, X, ArrowRight, LogOut, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  // Don't show public navbar on the dashboard (or let's show it, wait, standard is not showing public navbar inside admin dashboard to make the dashboard look like a standalone application. Let's hide it if path starts with /admin, except /admin/login)
  const isAdminPage = pathname?.startsWith("/admin") && pathname !== "/admin/login";

  if (isAdminPage) return null;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Solutions", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Feedback", href: "/feedback" },
    { name: "Gallery", href: "/gallery" },
    { name: "Events", href: "/events" },
    { name: "Articles", href: "/blog" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-brand-bg/60 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 text-white group">
              <div className="relative rounded-lg p-2 bg-indigo-600/10 border border-indigo-500/20 group-hover:border-indigo-500/40 transition-colors">
                <Cpu className="h-6 w-6 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                <span className="absolute -inset-0.5 rounded-lg bg-indigo-500/20 opacity-0 group-hover:opacity-100 blur transition duration-300"></span>
              </div>
              <span className="font-display text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Ai<span className="text-indigo-400"> Solutions</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                    ? "text-white bg-white/5 border border-white/10"
                    : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Call to Actions / Session Status */}
          <div className="hidden md:flex items-center space-x-3">
            {session ? (
              <>
                <Link
                  href="/admin"
                  className="flex items-center space-x-1 text-xs px-3 py-1.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 hover:bg-indigo-500/20 transition-all"
                >
                  <LayoutDashboard className="h-3.5 w-3.5" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center space-x-1 text-xs px-3 py-1.5 rounded-md bg-red-500/10 border border-red-500/20 text-red-300 hover:bg-red-500/20 transition-all cursor-pointer"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <Link
                href="/contact?demo=true"
                className="group relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-indigo-500 to-purple-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-indigo-800"
              >
                <span className="relative px-4 py-1.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  <span className="flex items-center space-x-1">
                    <span>Schedule Demo</span>
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-white/5 hover:text-white focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-white/10 bg-brand-bg/95 backdrop-blur-lg" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${isActive
                    ? "text-white bg-white/5 border-l-2 border-indigo-500"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="border-t border-white/15 pt-4 pb-2 px-3">
              {session ? (
                <div className="flex flex-col space-y-2">
                  <Link
                    href="/admin"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center space-x-2 w-full py-2 rounded-md bg-indigo-600 text-white font-medium text-sm text-center"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Admin Dashboard</span>
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                    className="flex items-center justify-center space-x-2 w-full py-2 rounded-md bg-red-600/20 border border-red-500/30 text-red-300 font-medium text-sm text-center cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <Link
                  href="/contact?demo=true"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center space-x-2 w-full py-2 rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium text-sm"
                >
                  <span>Schedule Demo</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

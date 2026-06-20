"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Cpu, Lock, Mail, AlertCircle, ArrowRight } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password
      });

      if (result?.error) {
        setErrorMsg("Invalid email or password configuration.");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("An unexpected connection error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Background glow backdrops */}
      <div className="absolute top-20 left-10 w-96 h-96 glow-blur-indigo rounded-full opacity-20 -z-10"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 glow-blur-cyan rounded-full opacity-35 -z-10"></div>

      <div className="w-full max-w-md space-y-8 glass-panel p-8 rounded-3xl border border-white/10 relative overflow-hidden">
        
        {/* Glow corner */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 blur-2xl rounded-full"></div>

        <div className="text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/25 mb-4 text-indigo-400">
            <Cpu className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-extrabold text-white font-display">Admin Portal</h2>
          <p className="mt-2 text-xs text-slate-400">Authenticate session to manage system telemetry</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          
          <div className="space-y-4 rounded-md shadow-sm">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-400 uppercase font-semibold">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@auranext.com"
                  className="w-full bg-white/5 border border-white/10 text-white rounded-lg pl-10 pr-3 py-2.5 text-xs focus:outline-none focus:border-indigo-500"
                />
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-400 uppercase font-semibold">Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 text-white rounded-lg pl-10 pr-3 py-2.5 text-xs focus:outline-none focus:border-indigo-500"
                />
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              </div>
            </div>
          </div>

          {errorMsg && (
            <div className="flex items-center space-x-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-xs font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 transition-colors cursor-pointer"
            >
              <span>{loading ? "Establishing session..." : "Authenticate"}</span>
              <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

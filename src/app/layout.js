import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VirtualAssistant from "@/components/VirtualAssistant";

export const metadata = {
  title: "Ai Solutions - Advanced AI Solutions & Enterprise Automation",
  description: "Deploy production-grade AI models, predictive analytics pipelines, and autonomous agents with Ai Solutions. Discover our software solutions, past experiences, and promotional events.",
  keywords: "AI, Machine Learning, Next.js, Mongoose, Agents, Predictive Analytics, Automation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="min-h-full flex flex-col bg-brand-bg text-slate-200">
        <Providers>
          <Navbar />
          <main className="flex-1 w-full relative">
            {children}
          </main>
          <Footer />
          <VirtualAssistant />
        </Providers>
      </body>
    </html>
  );
}

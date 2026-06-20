"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { MessageSquare, X, Send, Bot, User, CornerDownLeft } from "lucide-react";

export default function VirtualAssistant() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I am Aura, your virtual AI assistant. How can I help you learn about our AI Solutions today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Don't show chatbot in admin dashboard panels
  const isAdminPage = pathname?.startsWith("/admin") && pathname !== "/admin/login";
  if (isAdminPage) return null;

  const quickPrompts = [
    "What services do you offer?",
    "How can I schedule a demo?",
    "Tell me about past projects.",
    "Do you offer customer support?"
  ];

  const handleSend = async (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    // Add user message
    const userMessage = {
      sender: "user",
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputText("");
    
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query })
      });
      const data = await res.json();
      
      // Simulate slight thinking delay
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: data.reply || "I encountered an error processing your query. Please try again or fill out the contact form.",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 600);

    } catch (err) {
      console.error(err);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, I seem to have trouble connecting to the server. Please try again shortly.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/35 hover:scale-105 hover:shadow-indigo-500/50 transition-all duration-200 cursor-pointer animate-float"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[360px] max-w-[calc(100vw-2rem)] h-[480px] rounded-2xl glass-panel border border-white/10 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-indigo-950/80 to-purple-950/80 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center">
                <Bot className="h-4.5 w-4.5 text-indigo-400" />
              </div>
              <div>
                <h4 className="text-white text-sm font-semibold">Aura AI Assistant</h4>
                <div className="flex items-center space-x-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-[10px] text-slate-400">Online & Ready</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/45">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-start space-x-2.5 ${msg.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
              >
                {/* Avatar */}
                <div
                  className={`h-7 w-7 rounded-full flex items-center justify-center border text-xs shrink-0 ${
                    msg.sender === "user"
                      ? "bg-purple-500/10 border-purple-500/30 text-purple-400"
                      : "bg-indigo-500/10 border-indigo-500/30 text-indigo-400"
                  }`}
                >
                  {msg.sender === "user" ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                </div>

                {/* Bubble */}
                <div className="max-w-[75%] space-y-1">
                  <div
                    className={`px-3 py-2 text-xs rounded-xl leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-indigo-600 text-white rounded-tr-none"
                        : "bg-white/5 border border-white/10 text-slate-200 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className={`block text-[9px] text-slate-500 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start space-x-2.5">
                <div className="h-7 w-7 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center shrink-0">
                  <Bot className="h-3.5 w-3.5 text-indigo-400" />
                </div>
                <div className="bg-white/5 border border-white/10 px-3 py-2 rounded-xl rounded-tl-none">
                  <div className="flex space-x-1 items-center h-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-bounce duration-300"></span>
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-bounce duration-300 [animation-delay:0.15s]"></span>
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-bounce duration-300 [animation-delay:0.3s]"></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          {messages.length === 1 && !isTyping && (
            <div className="px-4 py-2 border-t border-white/5 bg-slate-950/20 flex flex-wrap gap-1.5">
              {quickPrompts.map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(p)}
                  className="text-[10px] px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 hover:bg-indigo-500/25 transition-all cursor-pointer text-left"
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* Input Box */}
          <div className="p-3 border-t border-white/10 bg-slate-950/80 flex items-center space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask Aura a question..."
              className="flex-1 bg-white/5 border border-white/10 text-white rounded-lg px-3 py-1.5 text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputText.trim()}
              className="p-1.5 rounded-lg bg-indigo-600 text-white disabled:opacity-50 disabled:bg-slate-800 hover:bg-indigo-500 transition-colors cursor-pointer shrink-0"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

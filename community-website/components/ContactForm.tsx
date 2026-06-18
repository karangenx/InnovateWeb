"use client";

import { Mail, MapPin, Send, MessageSquare, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setStatus("submitting");
    
    // Simulate an API call
    setTimeout(() => {
      setStatus("success");
      setFormData({ firstName: "", lastName: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    }, 1500);
  };

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-slate-50">
      {/* Light Background Gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-100 blur-[120px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100 blur-[100px] rounded-full pointer-events-none -translate-x-1/3 translate-y-1/3" />
      
      <div className="max-w-[1000px] mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-sm font-semibold tracking-wide mb-6">
            GET IN TOUCH
          </div>
          <h1 className="text-[40px] md:text-[56px] font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6">
            Let's Build <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
              Something Great
            </span>
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto">
            Have a question, a project idea, or just want to say hi? We'd love to hear from you. Reach out and our team will get back to you shortly.
          </p>
        </div>

        {/* Full Width Form */}
        <div className="w-full relative mb-20">
          <div className="relative bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 shadow-sm overflow-hidden">
            
            {status === "success" && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center animate-in fade-in duration-500 rounded-[2.5rem]">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-6 animate-bounce">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                <p className="text-slate-500 text-center max-w-md">
                  Thank you for reaching out. Our team will get back to you as soon as possible.
                </p>
              </div>
            )}

            <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="firstName" className="text-sm font-semibold text-slate-700 ml-1">First Name <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    id="firstName" 
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    className={`bg-slate-50 border rounded-2xl px-5 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 transition-all cursor-text ${
                      errors.firstName 
                        ? "border-red-400 focus:border-red-500 focus:ring-red-500" 
                        : "border-slate-200 focus:border-cyan-500 focus:ring-cyan-500"
                    }`}
                  />
                  {errors.firstName && <span className="text-red-500 text-xs ml-2 mt-1 font-medium animate-in slide-in-from-top-1">{errors.firstName}</span>}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="lastName" className="text-sm font-semibold text-slate-700 ml-1">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all cursor-text"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-semibold text-slate-700 ml-1">Email Address <span className="text-red-500">*</span></label>
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={`bg-slate-50 border rounded-2xl px-5 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 transition-all cursor-text ${
                      errors.email 
                        ? "border-red-400 focus:border-red-500 focus:ring-red-500" 
                        : "border-slate-200 focus:border-cyan-500 focus:ring-cyan-500"
                    }`}
                  />
                  {errors.email && <span className="text-red-500 text-xs ml-2 mt-1 font-medium animate-in slide-in-from-top-1">{errors.email}</span>}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="text-sm font-semibold text-slate-700 ml-1">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all cursor-text"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-semibold text-slate-700 ml-1">Message</label>
                <textarea 
                  id="message" 
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Tell us about your project..."
                  className="bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none cursor-text"
                ></textarea>
              </div>

              <div className="flex justify-center mt-4">
                <button 
                  type="submit"
                  disabled={status === "submitting"}
                  className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 px-12 py-4 rounded-2xl text-base font-bold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.6)] hover:scale-[1.02] cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                  <span className="relative flex items-center justify-center gap-2">
                    {status === "submitting" ? (
                      <>
                        <Loader2 size={18} className="animate-spin text-white" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={18} className="text-cyan-100 group-hover:text-white transition-colors group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </>
                    )}
                  </span>
                </button>
              </div>
              
            </form>
          </div>
        </div>

        {/* Contact Details Horizontal */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <div className="flex flex-col items-center text-center gap-4 p-8 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
            <div className="w-14 h-14 rounded-2xl bg-cyan-50 flex items-center justify-center text-cyan-600 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-300 shadow-sm">
              <Mail size={24} />
            </div>
            <div>
              <h3 className="text-slate-900 font-bold text-lg mb-1">Email Us</h3>
              <p className="text-slate-500">hello@innovateweb.com</p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center gap-4 p-8 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300 shadow-sm">
              <MessageSquare size={24} />
            </div>
            <div>
              <h3 className="text-slate-900 font-bold text-lg mb-1">Community</h3>
              <p className="text-slate-500">Join our Discord</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

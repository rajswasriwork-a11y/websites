import React, { useState } from "react";
import { Mail, CheckCircle2, ArrowRight, Building } from "lucide-react";
import { submitContactMessage } from "../lib/api";
import InteractivePlanner from "./InteractivePlanner";

interface ContactFormProps {
  darkMode: boolean;
}

export default function ContactForm({ darkMode }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setStatusMessage("");
    if (!name.trim() || !email.trim()) {
      setErrorMessage("Name and email are required.");
      return;
    }
    setLoading(true);
    try {
      await submitContactMessage({ name, email, company, message });
      setSubmitted(true);
      setStatusMessage("Your message was sent successfully.");
      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Intro Header */}
      <div className="border-b border-orange-100/40 pb-6 mb-10 dark:border-zinc-800">
        <span className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-brand-primary dark:text-orange-400">
          <Mail className="h-4 w-4" />
          <span>Strategic Collaborations</span>
        </span>
        <h2 className="mt-1.5 font-sans text-3xl font-extrabold tracking-tight text-brand-dark dark:text-zinc-100">
          Work with Rajswa Srivastava
        </h2>
        <p className="font-sans text-sm text-brand-muted dark:text-zinc-400 mt-1 max-w-3xl">
          Whether you are a founder looking to scale inbound growth, a recruiter hunting for a PM/PMM candidate, or an agency looking to deploy multi-agent workflows, let's explore how to design your next strategic growth engine.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Inquiry Form Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm dark:border-zinc-850 dark:bg-zinc-900">
            <h3 className="font-sans text-lg font-bold text-brand-dark dark:text-zinc-100 mb-2 flex items-center gap-2">
              <Building className="h-5 w-5 text-brand-primary" />
              <span>Project Inquiry Form</span>
            </h3>
            <p className="font-sans text-xs text-brand-muted dark:text-zinc-400 mb-6">
              Fill out your parameters below and receive a detailed strategic diagnostic audit within 1 business day.
            </p>

            {submitted ? (
              <div className="rounded-xl bg-[#FFF8F0] border border-brand-primary/20 p-5 text-center dark:bg-zinc-950">
                <CheckCircle2 className="h-10 w-10 text-green-500 mx-auto mb-3" />
                <h4 className="font-sans text-sm font-bold text-brand-dark dark:text-zinc-100">
                  Inquiry Sent Successfully
                </h4>
                <p className="font-sans text-xs text-brand-muted dark:text-zinc-400 mt-1 leading-relaxed">
                  Thank you! Your strategic details have been captured by our pipeline. Rajswa will contact you shortly with custom analysis parameters.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 font-sans text-xs font-semibold text-brand-primary hover:underline dark:text-orange-400 cursor-pointer"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquiry} className="space-y-4">
                <div>
                  <label className="block font-sans text-xs font-semibold text-brand-dark dark:text-zinc-300 mb-1 uppercase tracking-wide">
                    Your Name <span className="text-brand-primary">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Connor"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                    className="w-full rounded-xl border border-orange-100 bg-[#FFF8F0]/10 px-3.5 py-2.5 font-sans text-sm text-brand-dark placeholder-brand-muted focus:border-brand-primary focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block font-sans text-xs font-semibold text-brand-dark dark:text-zinc-300 mb-1 uppercase tracking-wide">
                    Email Address <span className="text-brand-primary">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@skynet.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="w-full rounded-xl border border-orange-100 bg-[#FFF8F0]/10 px-3.5 py-2.5 font-sans text-sm text-brand-dark placeholder-brand-muted focus:border-brand-primary focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block font-sans text-xs font-semibold text-brand-dark dark:text-zinc-300 mb-1 uppercase tracking-wide">
                    Company / Venture Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Cyberdyne Systems"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    disabled={loading}
                    className="w-full rounded-xl border border-orange-100 bg-[#FFF8F0]/10 px-3.5 py-2.5 font-sans text-sm text-brand-dark placeholder-brand-muted focus:border-brand-primary focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block font-sans text-xs font-semibold text-brand-dark dark:text-zinc-300 mb-1 uppercase tracking-wide">
                    Core Bottleneck / Growth Goal
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. We are looking to design a multi-agent LinkedIn engine or automate CRM contact logging..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={loading}
                    className="w-full rounded-xl border border-orange-100 bg-[#FFF8F0]/10 px-3.5 py-2.5 font-sans text-sm text-brand-dark placeholder-brand-muted focus:border-brand-primary focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:focus:border-orange-500 resize-none"
                  />
                </div>

                {errorMessage ? <p className="text-sm text-red-400">{errorMessage}</p> : null}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center space-x-2 rounded-xl bg-brand-primary py-3.5 font-sans text-sm font-semibold text-white hover:bg-opacity-92 shadow-md shadow-brand-primary/10 transition-all cursor-pointer"
                >
                  <span>{loading ? "Sending..." : "Submit Inquiry"}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                {statusMessage ? <p className="mt-3 text-sm text-green-400">{statusMessage}</p> : null}
              </form>
            )}
          </div>

          {/* Quick Channels */}
          <div className="rounded-2xl border border-orange-100 bg-[#FAF3EA] p-5 dark:border-zinc-900 dark:bg-zinc-950">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-brand-dark dark:text-zinc-200 mb-3">
              Direct Contact Lines
            </h4>
            <div className="space-y-2.5 text-xs text-brand-muted dark:text-zinc-400 font-medium">
              <p className="flex items-center gap-2">
                <span className="font-bold text-brand-primary dark:text-orange-400">Office Email:</span>
                <a href="mailto:rajswa.sriwork@gmail.com" className="hover:underline">rajswa.sriwork@gmail.com</a>
              </p>
              <p className="flex items-center gap-2">
                <span className="font-bold text-brand-primary dark:text-orange-400">LinkedIn:</span>
                <a href="https://www.linkedin.com/in/rajswa-srivastava-marketing/" target="_blank" rel="noreferrer" className="hover:underline">Rajswa Srivastava</a>
              </p>
              <p className="flex items-center gap-2">
                <span className="font-bold text-brand-primary dark:text-orange-400">Availability:</span>
                <span className="text-brand-dark dark:text-zinc-300 font-semibold">Open to Opportunities / Fractional Advisory</span>
              </p>
            </div>
          </div>
        </div>

        {/* Live strategic Planner Column */}
        <div className="lg:col-span-7">
          <InteractivePlanner darkMode={darkMode} />
        </div>

      </div>

    </section>
  );
}

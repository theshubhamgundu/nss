"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import ResolveHeroBackground from "@/components/ResolveHeroBackground";
import { supabase } from "@/lib/supabase";

const branches = [
  "CSE",
  "AIML",
  "CSE (AI&ML)",
  "CSE (DS)",
  "AIDS",
  "IT",
  "ECE",
  "EEE",
  "MECH",
  "CIV",
  "EIE",
];

const sections = ["A", "B", "C", "D", "E", "F"];
const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

export default function RegisterPage() {
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function submitRegistration(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);
      const screenshot = formData.get("paymentScreenshot");
      if (!(screenshot instanceof File) || screenshot.size === 0) {
        throw new Error("Please upload your payment screenshot.");
      }

      const filePath = `${crypto.randomUUID()}-${screenshot.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
      const upload = await supabase.storage.from("payment-screenshots").upload(filePath, screenshot, {
        contentType: screenshot.type,
        upsert: false,
      });
      if (upload.error) throw upload.error;

      const registration = await supabase.from("registrations").insert({
        name: formData.get("name"),
        contact_number: formData.get("contact"),
        email: formData.get("email"),
        branch: formData.get("branch"),
        section: formData.get("section"),
        year: formData.get("year"),
        payment_screenshot_path: filePath,
        payment_amount: 100,
        payment_status: "submitted",
      });
      if (registration.error) {
        await supabase.storage.from("payment-screenshots").remove([filePath]);
        throw registration.error;
      }

      setSubmitted(true);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="register-page">
      <ResolveHeroBackground />
      <div className="register-shell">
        <Link href="/" className="register-back">← Back to home</Link>
        <div className="register-heading">
          <p className="section-label">Parliament 2K26</p>
          <h1>Register to <em>debate.</em></h1>
          <p>Raise your voice, make your argument count, and take your place in the house.</p>
        </div>

        <div className="register-layout">
          {submitted ? (
            <div className="registration-success">
              <p className="section-label">Registration complete</p>
              <h2>You&apos;re in the <em>house.</em></h2>
              <p>Your registration has been submitted successfully. Join the WhatsApp group for further updates.</p>
              <a className="shiny-cta whatsapp-button" href="https://chat.whatsapp.com/HJ47Q80rsv570ZCQUOTZKx" target="_blank" rel="noreferrer">
                <span>Join WhatsApp group <b>↗</b></span>
              </a>
            </div>
          ) : (
          <form className="registration-form" onSubmit={submitRegistration}>
            <label>
              Full name
              <input type="text" name="name" placeholder="Enter your name" required />
            </label>
            <label>
              Contact number
              <input type="tel" name="contact" placeholder="Enter your contact number" required />
            </label>
            <label>
              Email ID
              <input type="email" name="email" placeholder="Enter your email address" required />
            </label>
            <label>
              Branch
              <select name="branch" defaultValue="" required>
                <option value="" disabled>Select your branch</option>
                {branches.map((branch) => <option key={branch}>{branch}</option>)}
              </select>
            </label>
            <label>
              Section
              <select name="section" defaultValue="" required>
                <option value="" disabled>Select your section</option>
                {sections.map((section) => <option key={section}>{section}</option>)}
              </select>
            </label>
            <label>
              Year
              <select name="year" defaultValue="" required>
                <option value="" disabled>Select your year</option>
                {years.map((year) => <option key={year}>{year}</option>)}
              </select>
            </label>
            <label className="screenshot-field">
              Payment screenshot
              <span className="file-drop">
                <input
                  type="file"
                  name="paymentScreenshot"
                  accept="image/*"
                  required
                  onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")}
                />
                <strong>{fileName || "Drop screenshot here or click to upload"}</strong>
                <small>PNG, JPG or JPEG</small>
              </span>
            </label>
            {error && <p className="registration-error" role="alert">{error}</p>}
            <button className="shiny-cta registration-submit" type="submit" disabled={isSubmitting}><span>{isSubmitting ? "Submitting..." : "Submit screenshot"} <b>→</b></span></button>
          </form>
          )}

          <aside className="payment-card">
            <p className="section-label">Complete your registration</p>
            <h2>Registration fee<br /><em>₹100</em></h2>
            <p>Scan the QR code or pay using the UPI ID below.</p>
            <img className="registration-qr" src="/qr.jpeg" alt="Registration payment QR code" />
            <p className="upi-label">UPI ID</p>
            <strong className="upi-id">cnithinreddy07@okicici</strong>
            <a className="shiny-cta upi-button" href="upi://pay?pa=cnithinreddy07%40okicici&pn=Parliament%202K26&am=100&cu=INR">
              <span>Pay ₹100 with UPI <b>↗</b></span>
            </a>
          </aside>
        </div>
      </div>
    </main>
  );
}

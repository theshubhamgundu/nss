"use client";

import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/lib/supabase";
import ResolveHeroBackground from "@/components/ResolveHeroBackground";

type Registration = {
  id: string;
  name: string;
  contact_number: string;
  email: string;
  branch: string;
  section: string;
  year: string;
  payment_screenshot_path: string;
  payment_amount: number;
  payment_status: string;
  created_at: string;
  screenshotUrl?: string;
};

export default function AdminPage() {
  const [sessionChecked, setSessionChecked] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSignedIn(Boolean(data.session));
      setSessionChecked(true);
    });
  }, []);

  useEffect(() => {
    if (signedIn) return;
    const preventContextMenu = (event: MouseEvent) => event.preventDefault();
    const preventShortcuts = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (event.key === "F12" || (event.ctrlKey && event.shiftKey && ["i", "j", "c"].includes(key)) || (event.ctrlKey && key === "u")) {
        event.preventDefault();
      }
    };
    document.addEventListener("contextmenu", preventContextMenu);
    document.addEventListener("keydown", preventShortcuts);
    return () => {
      document.removeEventListener("contextmenu", preventContextMenu);
      document.removeEventListener("keydown", preventShortcuts);
    };
  }, [signedIn]);

  useEffect(() => {
    if (!signedIn) return;
    setLoading(true);
    supabase.from("registrations").select("*").order("created_at", { ascending: false }).then(async ({ data, error: queryError }) => {
      if (queryError) {
        setError(queryError.message);
      } else {
        const rows = (data ?? []) as Registration[];
        const withScreenshots = await Promise.all(rows.map(async (registration) => {
          const signed = await supabase.storage.from("payment-screenshots").createSignedUrl(registration.payment_screenshot_path, 3600);
          return { ...registration, screenshotUrl: signed.data?.signedUrl };
        }));
        setRegistrations(withScreenshots);
      }
      setLoading(false);
    });
  }, [signedIn]);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const result = await supabase.auth.signInWithPassword({ email, password });
    if (result.error) setError(result.error.message);
    else setSignedIn(true);
    setLoading(false);
  }

  async function signOut() {
    await supabase.auth.signOut();
    setSignedIn(false);
    setRegistrations([]);
  }

  function downloadCsv() {
    const headers = ["Name", "Contact", "Email", "Branch", "Section", "Year", "Payment Amount", "Payment Status", "Screenshot Path", "Submitted"];
    const rows = registrations.map((registration) => [
      registration.name,
      registration.contact_number,
      registration.email,
      registration.branch,
      registration.section,
      registration.year,
      registration.payment_amount,
      registration.payment_status,
      registration.payment_screenshot_path,
      new Date(registration.created_at).toLocaleString(),
    ]);
    const escapeCell = (value: string | number) => `"${String(value).replace(/"/g, '""')}"`;
    const csv = [headers, ...rows].map((row) => row.map(escapeCell).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `parliament-2k26-registrations-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  if (!sessionChecked) return <main className="admin-page"><ResolveHeroBackground /><p className="admin-content">Loading dashboard...</p></main>;

  if (!signedIn) {
    return (
      <main className="admin-page">
        <ResolveHeroBackground />
        <form className="admin-login" onSubmit={signIn}>
          <p className="section-label">Parliament 2K26</p>
          <h1>Admin <em>login.</em></h1>
          <label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
          <label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
          {error && <p className="registration-error">{error}</p>}
          <button className="shiny-cta" disabled={loading}><span>{loading ? "Signing in..." : "Sign in"} <b>→</b></span></button>
        </form>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <ResolveHeroBackground />
      <div className="admin-shell">
        <div className="admin-toolbar"><div><p className="section-label">Parliament 2K26</p><h1>Registrations.</h1></div><div className="admin-actions"><button className="admin-download" onClick={downloadCsv} disabled={!registrations.length}>Download CSV</button><button className="admin-signout" onClick={signOut}>Sign out</button></div></div>
        {error && <p className="registration-error">{error}</p>}
        {loading ? <p>Loading registrations...</p> : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Name</th><th>Contact</th><th>Email</th><th>Branch</th><th>Section</th><th>Year</th><th>Payment</th><th>Screenshot</th><th>Submitted</th></tr></thead>
              <tbody>{registrations.map((registration) => <tr key={registration.id}><td>{registration.name}</td><td>{registration.contact_number}</td><td>{registration.email}</td><td>{registration.branch}</td><td>{registration.section}</td><td>{registration.year}</td><td>₹{registration.payment_amount} · {registration.payment_status}</td><td>{registration.screenshotUrl ? <a href={registration.screenshotUrl} target="_blank" rel="noreferrer">View</a> : "Unavailable"}</td><td>{new Date(registration.created_at).toLocaleString()}</td></tr>)}</tbody>
            </table>
            {!registrations.length && <p className="admin-empty">No registrations yet.</p>}
          </div>
        )}
      </div>
    </main>
  );
}

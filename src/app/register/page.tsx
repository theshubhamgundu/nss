import Link from "next/link";

const branches = [
  "Computer Science and Engineering",
  "CSE (Artificial Intelligence)",
  "CSE (Data Science)",
  "Electronics and Communication Engineering",
  "Electrical and Electronics Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
];

const sections = ["A", "B", "C", "D", "E", "F"];
const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

export default function RegisterPage() {
  return (
    <main className="register-page">
      <nav className="parliament-nav register-nav">
        <Link href="/" className="event-brand">
          <img src="/nss.svg" alt="Vignan NSS Unit" />
          <span>VIGNAN NSS</span>
        </Link>
      </nav>

      <div className="register-shell">
        <Link href="/" className="register-back">← Back to home</Link>
        <div className="register-heading">
          <p className="section-label">Parliament 2K26</p>
          <h1>Register to <em>debate.</em></h1>
          <p>Raise your voice, make your argument count, and take your place in the house.</p>
        </div>

        <div className="register-layout">
          <form className="registration-form">
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
            <button type="submit">Submit registration <span>→</span></button>
          </form>

          <aside className="payment-card">
            <p className="section-label">Complete your registration</p>
            <h2>Registration fee<br /><em>₹100</em></h2>
            <p>Scan the QR code or pay using the UPI ID below.</p>
            <img className="registration-qr" src="/qr.jpeg" alt="Registration payment QR code" />
            <p className="upi-label">UPI ID</p>
            <strong className="upi-id">cnithinreddy07@okicici</strong>
          </aside>
        </div>
      </div>
    </main>
  );
}

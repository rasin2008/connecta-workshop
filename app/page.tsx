"use client";

import { useState } from "react";

export default function Home() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const registration = {
      fullName: formData.get("fullName"),
      age: formData.get("age"),
      gender: formData.get("gender"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      college: formData.get("college"),
      workshop: formData.get("workshop"),
      consent: formData.get("consent"),
      registeredAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(
        localStorage.getItem("connectaWorkshopRegistrations") || "[]"
      );

      if (!Array.isArray(existing)) {
        throw new Error("Invalid registration data");
      }

      existing.push(registration);

      localStorage.setItem(
        "connectaWorkshopRegistrations",
        JSON.stringify(existing)
      );

      setSubmitted(true);
      form.reset();
    } catch {
      alert("Registration save cheyyan kazhinjilla. Veendum try cheyyuka.");
    }
  }

  return (
    <main className="registration-page">
      {/* HEADER - BOTH LOGOS AND NAMES */}
      <header className="topbar">
        <a href="/" className="brand">
          <img
            src="/connecta-logo.png"
            alt="CONNECTA Logo"
            className="connecta-logo"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />

          <span className="brand-name">CONNECTA</span>
        </a>

        <div className="topbar-right">
          <div className="ksum-brand">
            <img
              src="/ksum-logo.png"
              alt="Kerala Startup Mission Logo"
              className="ksum-logo"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />

            <span className="ksum-name">
              Kerala Startup Mission
            </span>
          </div>

          <span className="topbar-label">WORKSHOP 2026</span>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-badge">
          <span className="live-dot" />
          REGISTRATION OPEN
        </div>

        <h1>
          Learn. Connect.
          <br />
          <span>Grow Together.</span>
        </h1>

        <p>
          Join the CONNECTA Workshop and discover new skills,
          meet inspiring people, and build your future.
        </p>

        <div className="hero-details">
          <div className="detail-item">
            <span className="detail-icon">✦</span>
            <span>Expert Sessions</span>
          </div>

          <div className="detail-item">
            <span className="detail-icon">↗</span>
            <span>Networking</span>
          </div>

          <div className="detail-item">
            <span className="detail-icon">◎</span>
            <span>New Opportunities</span>
          </div>
        </div>
      </section>

      {/* REGISTRATION FORM */}
      <section className="form-section">
        <div className="form-heading">
          <div>
            <span className="section-label">
              YOUR NEXT CHAPTER STARTS HERE
            </span>

            <h2>Workshop Registration</h2>

            <p>Fill in your details to reserve your spot.</p>
          </div>

          <div className="form-number">01 / 01</div>
        </div>

        {submitted ? (
          <div className="success-message">
            <div className="success-icon">✓</div>

            <h3>Thank you for registering!</h3>

            <p>
              Your registration has been saved in this browser.
              This demo does not yet send your registration to a server.
            </p>

            <button
              type="button"
              className="submit-button"
              onClick={() => setSubmitted(false)}
            >
              Register Another Person →
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="age">Age *</label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  placeholder="Enter your age"
                  min="1"
                  max="120"
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="gender">Gender *</label>
                <select
                  id="gender"
                  name="gender"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    Select gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">
                    Prefer not to say
                  </option>
                </select>
              </div>

              <div className="field">
                <label htmlFor="email">Email Address *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  autoComplete="tel"
                  pattern="[0-9+() -]{7,20}"
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="college">
                  College / Institution *
                </label>
                <input
                  id="college"
                  name="college"
                  type="text"
                  placeholder="Enter college name"
                  required
                />
              </div>

              <div className="field full-width">
                <label htmlFor="workshop">Workshop Session *</label>
                <select
                  id="workshop"
                  name="workshop"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    Select a workshop
                  </option>
                  <option value="Web Development">
                    Web Development
                  </option>
                  <option value="AI and Technology">
                    AI &amp; Technology
                  </option>
                  <option value="Entrepreneurship">
                    Entrepreneurship
                  </option>
                  <option value="Career Development">
                    Career Development
                  </option>
                </select>
              </div>
            </div>

            <label className="consent">
              <input
                type="checkbox"
                name="consent"
                value="yes"
                required
              />

              <span>
                I confirm that the information provided is correct
                and agree to be contacted regarding this workshop.
              </span>
            </label>

            <button type="submit" className="submit-button">
              Complete Registration <span>→</span>
            </button>

            <p className="privacy-note">
              Your information should be handled securely and only
              used for workshop registration.
            </p>
          </form>
        )}
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-brand-section">
          <a href="/" className="footer-brand">
            CONNECTA
          </a>

          <span className="founder-name">
            Founder: Muhammed Ajmal
          </span>
        </div>

        <span>Connecting people. Creating opportunities.</span>

        <span>© 2026 CONNECTA</span>
      </footer>
    </main>
  );
}
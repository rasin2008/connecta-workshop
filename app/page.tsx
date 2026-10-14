
"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (saving) return;

    setSaving(true);
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const registration = {
      fullName: String(formData.get("fullName") || "").trim(),
      age: Number(formData.get("age")),
      gender: String(formData.get("gender") || ""),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      college: String(formData.get("college") || "").trim(),
      workshopSession: String(formData.get("workshopSession") || ""),
      consent: formData.get("consent") === "on",
    };

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registration),
      });

      const responseText = await response.text();

      let result: {
        success?: boolean;
        message?: string;
        registrationId?: string;
      };

      try {
        result = JSON.parse(responseText);
      } catch {
        throw new Error(
          `Server returned an invalid response (HTTP ${response.status}). Check the VS Code terminal.`
        );
      }

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Registration failed. Please try again."
        );
      }

      setSubmitted(true);
      form.reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="registration-page">
      <header className="topbar">
        <a href="/" className="brand">
          <img
            src="/connecta-logo.png"
            alt="CONNECTA logo"
            className="connecta-logo"
          />
          <span className="brand-name">CONNECTA</span>
        </a>

        <div className="topbar-right">
          <div className="ksum-brand">
            <img
              src="/ksum-logo.png"
              alt="Kerala Startup Mission logo"
              className="ksum-logo"
            />
            <div className="ksum-name">
              <strong>Kerala Startup Mission</strong>
              <span>Government of Kerala</span>
            </div>
          </div>

          <div className="location-bar">
            <MapPin size={17} aria-hidden="true" />
            <span>Near Government Cyberpark, Kozhikode</span>
          </div>
        </div>
      </header>

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
          Be part of the CONNECTA workshop. Meet new people, learn useful
          skills, and explore opportunities for your future.
        </p>

        <div className="hero-details">
          <div className="detail-item">
            <span className="detail-icon">✦</span>
            <span>Expert Sessions</span>
          </div>

          <div className="detail-item">
            <span className="detail-icon">◎</span>
            <span>Networking</span>
          </div>

          <div className="detail-item">
            <span className="detail-icon">↗</span>
            <span>New Opportunities</span>
          </div>
        </div>
      </section>

      <section className="form-section">
        {submitted ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <span className="section-label">REGISTRATION COMPLETE</span>
            <h2>Thank you for registering!</h2>
            <p>
              Your CONNECTA Workshop registration has been saved successfully.
            </p>
            <button
              type="button"
              className="submit-button"
              onClick={() => {
                setSubmitted(false);
                setErrorMessage("");
              }}
            >
              Register Another Person →
            </button>
          </div>
        ) : (
          <>
            <div className="form-heading">
              <div>
                <span className="section-label">
                  YOUR NEXT CHAPTER STARTS HERE
                </span>
                <h2>Workshop Registration</h2>
                <p>Fill in your details to reserve your spot.</p>
              </div>

              <span className="form-number">01 / 01</span>
            </div>

            <form onSubmit={handleSubmit} className="registration-form">
              <div className="form-grid">
                <div className="field full-width">
                  <label htmlFor="fullName">Full Name *</label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    autoComplete="name"
                    maxLength={100}
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
                    min={1}
                    max={120}
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="gender">Gender *</label>
                  <select id="gender" name="gender" defaultValue="" required>
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
                    maxLength={254}
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    autoComplete="tel"
                    maxLength={20}
                    required
                  />
                </div>

                <div className="field full-width">
                  <label htmlFor="college">College / Institution *</label>
                  <input
                    id="college"
                    name="college"
                    type="text"
                    placeholder="Enter your college or institution"
                    maxLength={150}
                    required
                  />
                </div>

                <div className="field full-width">
                  <label htmlFor="workshopSession">Workshop Session *</label>
                  <select
                    id="workshopSession"
                    name="workshopSession"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Select a workshop
                    </option>
                    <option value="Web Development">Web Development</option>
                    <option value="AI and Technology">
                      AI &amp; Technology
                    </option>
                    <option value="Entrepreneurship">Entrepreneurship</option>
                    <option value="Career Development">
                      Career Development
                    </option>
                  </select>
                </div>
              </div>

              <label className="consent">
                <input type="checkbox" name="consent" required />
                <span>
                  I confirm that the information provided above is accurate
                  and agree to be contacted regarding the CONNECTA workshop.
                </span>
              </label>

              {errorMessage && (
                <p className="error-message" role="alert">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                className="submit-button"
                disabled={saving}
              >
                {saving ? "Submitting..." : "Complete Registration →"}
              </button>

              <p className="privacy-note">
                Your information will be used for workshop registration and
                related communication.
              </p>
            </form>
          </>
        )}
      </section>

      <footer className="footer">
        <div className="footer-brand-section">
          <span className="footer-brand">CONNECTA</span>
          <span className="founder-name">Founder: Muhammed Ajmal</span>
        </div>

        <p>Connecting people. Creating opportunities.</p>
        <span className="copyright">© 2026 CONNECTA</span>
      </footer>
    </main>
  );
}

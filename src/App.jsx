import { useState, useEffect } from "react";

const DEALS = [
  {
    id: 1, type: "R2R", title: "Manchester City Centre HMO Portfolio",
    area: "Manchester", price: 85000, roi: 22, yield: 18, cashflow: 1240,
    status: "Available", beds: 6, bathrooms: 3,
    description: "Premium R2R opportunity in the heart of Manchester. Fully licensed HMO with professional tenants in situ. Below market rent secured with compliant 5-year management agreement in place.",
    highlights: ["5-year management agreement", "Fully licensed HMO", "Professional tenants in situ", "Below market rent secured"],
    financials: { monthlyRent: 3800, managementFees: 760, netMonthly: 1240, annualReturn: 14880, setupCosts: 85000 },
    location: "Manchester City Centre, M1",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
  },
  {
    id: 2, type: "BMV", title: "Leeds Semi-Detached — 27% Below Market",
    area: "Leeds", price: 118000, roi: 31, yield: 8.4, cashflow: 620,
    status: "Available", beds: 3, bathrooms: 2,
    description: "Motivated vendor sale. Full structural survey completed. Cosmetic refurbishment needed — excellent value-add opportunity. Comparable sold prices at £162,000.",
    highlights: ["27% below market value", "Motivated vendor", "Survey completed", "£44K instant equity"],
    financials: { monthlyRent: 1100, managementFees: 110, netMonthly: 620, annualReturn: 7440, setupCosts: 118000 },
    location: "Headingley, Leeds, LS6",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
  },
  {
    id: 3, type: "BTL", title: "Liverpool New Build Apartment — High Yield",
    area: "Liverpool", price: 145000, roi: 14, yield: 7.8, cashflow: 495,
    status: "Available", beds: 2, bathrooms: 1,
    description: "Brand new apartment in regeneration hotspot. 10-year NHBC warranty. Hands-off investment with lettings management included. Strong rental demand from professionals.",
    highlights: ["10-year NHBC warranty", "Lettings management included", "Regeneration area", "No refurbishment needed"],
    financials: { monthlyRent: 1050, managementFees: 105, netMonthly: 495, annualReturn: 5940, setupCosts: 145000 },
    location: "Baltic Triangle, Liverpool, L1",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
  },
  {
    id: 4, type: "BRRR", title: "Sheffield Terrace — Full Refurb BRRR",
    area: "Sheffield", price: 72000, roi: 38, yield: 11.2, cashflow: 780,
    status: "Under Offer", beds: 4, bathrooms: 2,
    description: "Classic BRRR play. Purchase, refurb to spec, refinance to pull out capital, rent for cashflow. TPS Group manages the full build project. Projected GDV £135,000.",
    highlights: ["Full project management included", "GDV £135,000", "Capital recycling strategy", "Planning pre-approved"],
    financials: { monthlyRent: 1400, managementFees: 140, netMonthly: 780, annualReturn: 9360, setupCosts: 72000 },
    location: "Hillsborough, Sheffield, S6",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f28f959f?w=800&q=80",
  },
  {
    id: 5, type: "R2R", title: "Birmingham 8-Bed HMO — Premium Rooms",
    area: "Birmingham", price: 110000, roi: 26, yield: 21, cashflow: 1680,
    status: "Available", beds: 8, bathrooms: 4,
    description: "High-spec R2R in sought-after Birmingham suburb. All rooms en-suite. Fully furnished to luxury standard. All bills included model with premium pricing.",
    highlights: ["All en-suite rooms", "Luxury furnishing included", "All bills included model", "Premium room rates"],
    financials: { monthlyRent: 5200, managementFees: 1040, netMonthly: 1680, annualReturn: 20160, setupCosts: 110000 },
    location: "Edgbaston, Birmingham, B15",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
  },
  {
    id: 6, type: "BMV", title: "Nottingham Victorian Terrace — 19% BMV",
    area: "Nottingham", price: 135000, roi: 19, yield: 6.9, cashflow: 410,
    status: "New", beds: 3, bathrooms: 1,
    description: "Victorian terrace in thriving University district. Strong student rental demand. Minor cosmetic work needed. Probate sale — vendor wants quick clean completion.",
    highlights: ["19% below market value", "Probate sale — quick completion", "Student rental demand", "University district"],
    financials: { monthlyRent: 950, managementFees: 95, netMonthly: 410, annualReturn: 4920, setupCosts: 135000 },
    location: "Lenton, Nottingham, NG7",
    image: "https://images.unsplash.com/photo-1599427303058-f04cbcf4756f?w=800&q=80",
  },
];

const IconR2R = ({ color }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 24V12L14 4L24 12V24" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 24V17H18V24" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="20" cy="20" r="5" fill="white" stroke={color} strokeWidth="1.4"/>
    <path d="M17.5 20H22.5M20 17.5V22.5" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const IconBMV = ({ color }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 8L10 14L15 9L24 20" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19 20H24V15" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 5H8C6.9 5 6 5.9 6 7V10" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
    <circle cx="14" cy="5" r="2.5" stroke={color} strokeWidth="1.4"/>
    <path d="M14 3.5V6.5M12.5 5H15.5" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const IconBTL = ({ color }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="10" width="18" height="14" rx="1.5" stroke={color} strokeWidth="1.6"/>
    <path d="M9 10V7C9 5.3 10.3 4 12 4H16C17.7 4 19 5.3 19 7V10" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
    <circle cx="14" cy="17" r="2.5" stroke={color} strokeWidth="1.4"/>
    <path d="M14 14.5V19.5" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M11.5 17H16.5" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const IconBRRR = ({ color }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 5C9 5 5 9 5 14" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M14 23C19 23 23 19 23 14" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M5 14C5 19 9 23 14 23" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeDasharray="2 2"/>
    <path d="M14 5C19 5 23 9 23 14" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeDasharray="2 2"/>
    <path d="M2 14L5 11L8 14" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M26 14L23 17L20 14" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="14" cy="14" r="3" stroke={color} strokeWidth="1.4"/>
  </svg>
);

const CATEGORY_ICONS = { R2R: IconR2R, BMV: IconBMV, BTL: IconBTL, BRRR: IconBRRR };

const CATEGORIES = [
  { type: "R2R", label: "Rent to Rent", description: "Control properties without buying. Cashflow from day one.", color: "#1a3c5e", light: "#e8f0f8" },
  { type: "BMV", label: "Below Market Value", description: "Acquire instant equity at discounted prices.", color: "#1e5c3a", light: "#e8f5ee" },
  { type: "BTL", label: "Buy to Let", description: "Long-term rental income with capital appreciation.", color: "#4a2c6e", light: "#f0eaf8" },
  { type: "BRRR", label: "BRRR Strategy", description: "Buy, Refurb, Refinance, Rent — recycle capital.", color: "#6e2c1a", light: "#f8ece8" },
];

const typeColors = { R2R: { bg: "#e8f0f8", text: "#1a3c5e" }, BMV: { bg: "#e8f5ee", text: "#1e5c3a" }, BTL: { bg: "#f0eaf8", text: "#4a2c6e" }, BRRR: { bg: "#f8ece8", text: "#6e2c1a" } };
const statusColors = { Available: { bg: "#e8f5ee", text: "#1e5c3a" }, "Under Offer": { bg: "#fef3cd", text: "#7d5a00" }, New: { bg: "#e8f0f8", text: "#1a3c5e" } };

function TPSLogo({ size = 38, dark = false }) {
  const s = size;
  const half = s / 2;
  const r = s * 0.22;
  return (
    <svg width={s} height={s} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Blue circle — top left */}
      <circle cx="36" cy="28" r="18" fill="#4BAEE8" />
      {/* Yellow circle — top right */}
      <circle cx="62" cy="24" r="15" fill="#F5B800" />
      {/* Green shape — bottom left (person body) */}
      <ellipse cx="36" cy="62" rx="18" ry="16" fill="#2EC98E" />
      {/* Navy teardrop — bottom right, pointing down */}
      <path d="M62 42 C72 42 80 50 80 60 C80 72 62 86 62 86 C62 86 44 72 44 60 C44 50 52 42 62 42Z" fill="#1a3c5e" />
    </svg>
  );
}

function NavBar({ page, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "white", borderBottom: "1px solid #ebebeb", padding: "0 5%" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        {/* Logo */}
        <div style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }} onClick={() => { setPage("home"); setMenuOpen(false); }}>
          <TPSLogo size={32} />
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <span style={{ fontFamily: "'Arial Rounded MT Bold','Arial',sans-serif", fontWeight: 800, fontSize: 16, color: "#1a3c5e", letterSpacing: "-0.3px", lineHeight: 1.1 }}>TPS</span>
            <span style={{ fontSize: 9, color: "#999", letterSpacing: "0.3px", fontWeight: 400 }}>The Property Source Group</span>
          </div>
        </div>

        {/* Desktop nav */}
        <div className="desktop-nav" style={{ display: "flex", gap: 0, alignItems: "center" }}>
          {[["home","Deals"], ["r2r","R2R"], ["bmv","BMV"], ["btl","BTL"], ["brrr","BRRR"]].map(([p, label]) => (
            <button key={p} onClick={() => setPage(p)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: page === p ? 600 : 400, color: page === p ? "#1a3c5e" : "#777", padding: "4px 14px", letterSpacing: "0.2px", transition: "color 0.15s" }}>{label}</button>
          ))}
          <div style={{ width: 1, height: 20, background: "#e0e0e0", margin: "0 14px" }} />
          <button onClick={() => setPage("alerts")} style={{ background: "none", color: "#1a3c5e", border: "1px solid #1a3c5e", borderRadius: 5, padding: "9px 18px", cursor: "pointer", fontSize: 13, fontWeight: 600, transition: "all 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#1a3c5e"; e.currentTarget.style.color = "white"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#1a3c5e"; }}>
            Join alerts
          </button>
        </div>

        {/* Mobile hamburger */}
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 8 }}>
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 4L18 18M18 4L4 18" stroke="#1a3c5e" strokeWidth="1.8" strokeLinecap="round"/></svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 6H19M3 11H19M3 16H19" stroke="#1a3c5e" strokeWidth="1.8" strokeLinecap="round"/></svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div style={{ borderTop: "1px solid #ebebeb", background: "white", padding: "12px 0 20px" }}>
          {[["home","All Deals"], ["r2r","Rent to Rent (R2R)"], ["bmv","Below Market Value (BMV)"], ["btl","Buy to Let (BTL)"], ["brrr","BRRR Strategy"]].map(([p, label]) => (
            <button key={p} onClick={() => { setPage(p); setMenuOpen(false); }} style={{ display: "block", width: "100%", background: page === p ? "#f0f4f8" : "none", border: "none", cursor: "pointer", fontSize: 15, fontWeight: page === p ? 600 : 400, color: page === p ? "#1a3c5e" : "#444", padding: "12px 5%", textAlign: "left", letterSpacing: "0.1px" }}>{label}</button>
          ))}
          <div style={{ padding: "12px 5% 0" }}>
            <button onClick={() => { setPage("alerts"); setMenuOpen(false); }} style={{ width: "100%", background: "#1a3c5e", color: "white", border: "none", borderRadius: 8, padding: "13px", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>
              Join Deal Alerts
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

function Hero({ setPage }) {
  return (
    <section style={{ background: "#fff", paddingTop: 72, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Top rule */}
      <div style={{ height: 1, background: "#ebebeb" }} />

      {/* Main hero grid */}
      <div className="hero-grid" style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", maxWidth: 1200, margin: "0 auto", width: "100%", padding: "0 5%" }}>

        {/* Left — copy */}
        <div className="hero-left" style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 64px 80px 0", borderRight: "1px solid #ebebeb" }}>

          {/* Live pill */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 40 }}>
            <span style={{ width: 7, height: 7, background: "#2EC98E", borderRadius: "50%", display: "inline-block" }} />
            <span style={{ fontSize: 12, fontWeight: 500, color: "#888", letterSpacing: "0.8px", textTransform: "uppercase" }}>Live deals updated daily</span>
          </div>

          {/* Headline */}
          <h1 style={{ fontFamily: "'Georgia', 'Times New Roman', serif", fontSize: "clamp(36px, 4.5vw, 68px)", fontWeight: 400, color: "#111", lineHeight: 1.05, margin: "0 0 28px", letterSpacing: "-2px" }}>
            Off-market<br />property deals<br />
            <span style={{ fontStyle: "italic", color: "#1a3c5e" }}>for serious<br />investors.</span>
          </h1>

          {/* Divider */}
          <div style={{ width: 40, height: 1, background: "#1a3c5e", margin: "0 0 28px" }} />

          {/* Subscribe banner */}
          <div style={{ border: "1px solid #e0e0e0", borderRadius: 8, padding: "20px 24px", marginBottom: 36, background: "#fafafa", maxWidth: 420 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#1a3c5e", letterSpacing: "1px", textTransform: "uppercase", margin: "0 0 6px" }}>Deal alerts</p>
            <p style={{ fontSize: 15, color: "#333", margin: "0 0 16px", lineHeight: 1.5, fontWeight: 400 }}>Subscribe to receive bespoke deals direct to your inbox — before they go public.</p>
            <div className="subscribe-row" style={{ display: "flex", gap: 8 }}>
              <input type="email" placeholder="Your email address" style={{ flex: 1, border: "1px solid #ddd", borderRadius: 5, padding: "10px 14px", fontSize: 13, outline: "none", background: "white", fontFamily: "inherit", minWidth: 0 }} />
              <button onClick={() => setPage("alerts")} style={{ background: "#1a3c5e", color: "white", border: "none", borderRadius: 5, padding: "10px 18px", cursor: "pointer", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", transition: "opacity 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                Subscribe
              </button>
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button onClick={() => setPage("deals")} style={{ background: "#1a3c5e", color: "white", border: "none", borderRadius: 6, padding: "14px 28px", cursor: "pointer", fontSize: 14, fontWeight: 600, letterSpacing: "0.2px", transition: "opacity 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
              Browse deals
            </button>
            <button onClick={() => setPage("alerts")} style={{ background: "transparent", color: "#1a3c5e", border: "1px solid #d0d0d0", borderRadius: 6, padding: "14px 28px", cursor: "pointer", fontSize: 14, fontWeight: 500, transition: "border-color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "#1a3c5e"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "#d0d0d0"}>
              Get deal alerts
            </button>
          </div>
        </div>

        {/* Right — image + floating card */}
        <div className="hero-image-col" style={{ position: "relative", display: "flex", alignItems: "stretch" }}>
          <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
            <img
              src="https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1000&q=85"
              alt="Premium property"
              style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.92)" }}
            />
            <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 40, background: "linear-gradient(to right, white, transparent)" }} />
          </div>
          {/* Floating stats card */}
          <div style={{ position: "absolute", bottom: 48, left: -24, background: "white", border: "1px solid #ebebeb", borderRadius: 12, padding: "24px 28px", boxShadow: "0 8px 40px rgba(0,0,0,0.08)", zIndex: 2 }}>
            <div style={{ display: "flex", gap: 32 }}>
              {[["240+", "Deals sourced"], ["£18M+", "Capital placed"], ["94%", "Retention rate"]].map(([num, label]) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Georgia', serif", fontSize: 26, fontWeight: 700, color: "#1a3c5e", letterSpacing: "-0.5px", lineHeight: 1 }}>{num}</div>
                  <div style={{ fontSize: 11, color: "#aaa", marginTop: 5, fontWeight: 500, letterSpacing: "0.3px" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strategy ticker */}
      <div style={{ borderTop: "1px solid #ebebeb", padding: "0 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", height: 56, gap: 0 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#aaa", letterSpacing: "1.2px", textTransform: "uppercase", marginRight: 32, whiteSpace: "nowrap" }}>Strategies</span>
          {[["R2R","Rent to Rent"], ["BMV","Below Market Value"], ["BTL","Buy to Let"], ["BRRR","Buy Refurb Refinance Rent"]].map(([type, label], i) => {
            const tc = typeColors[type];
            return (
              <div key={type} style={{ display: "flex", alignItems: "center", gap: 0 }}>
                {i > 0 && <div style={{ width: 1, height: 20, background: "#ebebeb", margin: "0 28px" }} />}
                <button onClick={() => setPage(type.toLowerCase())} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, padding: "0", transition: "opacity 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.6"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                  <span style={{ background: tc.bg, color: tc.text, fontSize: 10, fontWeight: 700, letterSpacing: "0.8px", borderRadius: 4, padding: "3px 7px" }}>{type}</span>
                  <span style={{ fontSize: 13, color: "#444", fontWeight: 400 }}>{label}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CategoryGrid({ setPage }) {
  return (
    <section style={{ padding: "88px 5%", background: "#fafafa" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#1a3c5e", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 12 }}>Investment Strategies</p>
          <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: "#1a1a1a", letterSpacing: "-0.8px", margin: 0 }}>Four paths to property profit</h2>
        </div>
        <div className="category-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
          {CATEGORIES.map(cat => (
            <div key={cat.type} onClick={() => setPage(cat.type.toLowerCase())} style={{ background: "white", borderRadius: 16, padding: "32px 28px", cursor: "pointer", border: "1px solid #e8e8e8", transition: "all 0.25s", position: "relative", overflow: "hidden" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(26,60,94,0.12)"; e.currentTarget.style.borderColor = cat.color; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#e8e8e8"; }}>
              {(() => { const Icon = CATEGORY_ICONS[cat.type]; return <div style={{ width: 52, height: 52, background: cat.light, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}><Icon color={cat.color} /></div>; })()}
              <div style={{ display: "inline-block", background: cat.light, color: cat.color, fontSize: 11, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", borderRadius: 6, padding: "4px 10px", marginBottom: 12 }}>{cat.type}</div>
              <h3 style={{ fontFamily: "'Georgia', serif", fontSize: 20, fontWeight: 700, color: "#1a1a1a", margin: "0 0 10px", letterSpacing: "-0.3px" }}>{cat.label}</h3>
              <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6, margin: 0 }}>{cat.description}</p>
              <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 6, color: cat.color, fontSize: 14, fontWeight: 600 }}>
                View deals <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DealCard({ deal, onClick }) {
  const tc = typeColors[deal.type] || { bg: "#f0f0f0", text: "#333" };
  const sc = statusColors[deal.status] || { bg: "#f0f0f0", text: "#333" };
  return (
    <div onClick={onClick} style={{ background: "white", borderRadius: 16, overflow: "hidden", border: "1px solid #e8e8e8", cursor: "pointer", transition: "all 0.25s" }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.1)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
      <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
        <img src={deal.image} alt={deal.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", top: 12, left: 12, background: tc.bg, color: tc.text, fontSize: 11, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", borderRadius: 6, padding: "4px 10px" }}>{deal.type}</div>
        <div style={{ position: "absolute", top: 12, right: 12, background: sc.bg, color: sc.text, fontSize: 11, fontWeight: 600, borderRadius: 6, padding: "4px 10px" }}>{deal.status}</div>
      </div>
      <div style={{ padding: "20px 20px 16px" }}>
        <p style={{ fontSize: 12, color: "#999", marginBottom: 6, letterSpacing: "0.3px" }}>{deal.location}</p>
        <h3 style={{ fontFamily: "'Georgia', serif", fontSize: 17, fontWeight: 700, color: "#1a1a1a", margin: "0 0 16px", lineHeight: 1.3, letterSpacing: "-0.2px" }}>{deal.title}</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 18 }}>
          {[["ROI", `${deal.roi}%`], ["Yield", `${deal.yield}%`], ["Cashflow", `£${deal.cashflow}/mo`]].map(([l, v]) => (
            <div key={l} style={{ background: "#f7f8fc", borderRadius: 8, padding: "10px 8px", textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "#888", marginBottom: 3 }}>{l}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#1a3c5e" }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #f0f0f0", paddingTop: 14 }}>
          <div>
            <span style={{ fontSize: 12, color: "#999" }}>From </span>
            <span style={{ fontFamily: "'Georgia', serif", fontSize: 20, fontWeight: 700, color: "#1a1a1a" }}>£{deal.price.toLocaleString()}</span>
          </div>
          <button style={{ background: "#1a3c5e", color: "white", border: "none", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>View Deal</button>
        </div>
      </div>
    </div>
  );
}

function FilterBar({ filters, setFilters }) {
  return (
    <div style={{ background: "white", borderRadius: 14, padding: "20px 24px", border: "1px solid #e8e8e8", marginBottom: 32, display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }} className="filter-bar">
      <input value={filters.search} onChange={e => setFilters(f => ({ ...f, search: e.target.value }))} placeholder="Search deals..." style={{ flex: "1 1 200px", border: "1px solid #e0e0e0", borderRadius: 8, padding: "10px 14px", fontSize: 14, outline: "none", minWidth: 160 }} />
      <select value={filters.area} onChange={e => setFilters(f => ({ ...f, area: e.target.value }))} style={{ border: "1px solid #e0e0e0", borderRadius: 8, padding: "10px 14px", fontSize: 14, background: "white", color: "#333", minWidth: 140 }}>
        <option value="">All Areas</option>
        {["Manchester","Leeds","Liverpool","Sheffield","Birmingham","Nottingham"].map(a => <option key={a}>{a}</option>)}
      </select>
      <select value={filters.minRoi} onChange={e => setFilters(f => ({ ...f, minRoi: e.target.value }))} style={{ border: "1px solid #e0e0e0", borderRadius: 8, padding: "10px 14px", fontSize: 14, background: "white", color: "#333", minWidth: 130 }}>
        <option value="">Min ROI</option>
        <option value="10">10%+</option>
        <option value="15">15%+</option>
        <option value="20">20%+</option>
        <option value="30">30%+</option>
      </select>
      <select value={filters.status} onChange={e => setFilters(f => ({ ...f, status: e.target.value }))} style={{ border: "1px solid #e0e0e0", borderRadius: 8, padding: "10px 14px", fontSize: 14, background: "white", color: "#333", minWidth: 140 }}>
        <option value="">All Statuses</option>
        <option>Available</option>
        <option>Under Offer</option>
        <option>New</option>
      </select>
      {(filters.search || filters.area || filters.minRoi || filters.status) && (
        <button onClick={() => setFilters({ search: "", area: "", minRoi: "", status: "" })} style={{ background: "#f0f0f0", border: "none", borderRadius: 8, padding: "10px 16px", cursor: "pointer", fontSize: 13, color: "#555" }}>Clear ✕</button>
      )}
    </div>
  );
}

function DealsPage({ typeFilter, setActiveDeal }) {
  const [filters, setFilters] = useState({ search: "", area: "", minRoi: "", status: "" });
  const filtered = DEALS.filter(d => {
    if (typeFilter && d.type !== typeFilter.toUpperCase()) return false;
    if (filters.search && !d.title.toLowerCase().includes(filters.search.toLowerCase()) && !d.area.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.area && d.area !== filters.area) return false;
    if (filters.minRoi && d.roi < parseInt(filters.minRoi)) return false;
    if (filters.status && d.status !== filters.status) return false;
    return true;
  });
  const cat = typeFilter ? CATEGORIES.find(c => c.type === typeFilter.toUpperCase()) : null;
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 5% 80px" }}>
      <div style={{ marginBottom: 40 }}>
        {cat && <div style={{ display: "inline-block", background: cat.light, color: cat.color, fontSize: 12, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", borderRadius: 6, padding: "5px 12px", marginBottom: 14 }}>{cat.type}</div>}
        <h1 style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: "#1a1a1a", margin: "0 0 12px", letterSpacing: "-0.8px" }}>{cat ? cat.label + " Deals" : "All Available Deals"}</h1>
        <p style={{ fontSize: 16, color: "#666", margin: 0 }}>{cat ? cat.description : "Browse our full portfolio of sourced, vetted investment opportunities."}</p>
      </div>
      <FilterBar filters={filters} setFilters={setFilters} />
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#999" }}>
          <div style={{ width: 64, height: 64, background: "#f0f0f0", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="12" cy="12" r="8" stroke="#aaa" strokeWidth="1.8"/><path d="M18 18L24 24" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round"/></svg>
          </div>
          <p style={{ fontSize: 18 }}>No deals match your criteria.</p>
        </div>
      ) : (
        <div className="deals-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
          {filtered.map(deal => <DealCard key={deal.id} deal={deal} onClick={() => setActiveDeal(deal)} />)}
        </div>
      )}
    </div>
  );
}

function InquiryForm({ deal }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", whatsapp: "", contactPref: "", investorType: "", budget: "", area: "", experience: "", message: "" });
  const [sent, setSent] = useState(false);
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const inputStyle = { width: "100%", border: "1px solid #e0e0e0", borderRadius: 8, padding: "11px 14px", fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" };
  const labelStyle = { fontSize: 13, fontWeight: 600, color: "#444", display: "block", marginBottom: 6 };
  if (sent) return (
    <div style={{ textAlign: "center", padding: "40px 20px" }}>
      <div style={{ width: 56, height: 56, background: "#e8f5ee", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 13L9 17L19 7" stroke="#1e5c3a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <h3 style={{ fontFamily: "'Georgia', serif", fontSize: 22, color: "#1a1a1a", margin: "0 0 8px" }}>Enquiry Sent</h3>
      <p style={{ color: "#666", fontSize: 15 }}>A TPS Group advisor will be in touch within 24 hours.</p>
    </div>
  );
  return (
    <div>
      <h3 style={{ fontFamily: "'Georgia', serif", fontSize: 20, fontWeight: 700, color: "#1a1a1a", margin: "0 0 24px" }}>Register Interest</h3>
      <div className="form-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        <div><label style={labelStyle}>Full Name *</label><input value={form.name} onChange={set("name")} placeholder="John Smith" style={inputStyle} /></div>
        <div><label style={labelStyle}>Email *</label><input value={form.email} onChange={set("email")} placeholder="john@example.com" type="email" style={inputStyle} /></div>
        <div><label style={labelStyle}>Phone</label><input value={form.phone} onChange={set("phone")} placeholder="+44 7700..." style={inputStyle} /></div>
        <div><label style={labelStyle}>WhatsApp</label><input value={form.whatsapp} onChange={set("whatsapp")} placeholder="+44 7700..." style={inputStyle} /></div>
      </div>
      <div className="form-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        <div><label style={labelStyle}>Contact Preference</label>
          <select value={form.contactPref} onChange={set("contactPref")} style={{ ...inputStyle }}>
            <option value="">Select...</option>
            <option>Phone Call</option><option>WhatsApp</option><option>Email</option>
          </select>
        </div>
        <div><label style={labelStyle}>Investor Type</label>
          <select value={form.investorType} onChange={set("investorType")} style={{ ...inputStyle }}>
            <option value="">Select...</option>
            <option>First-time Investor</option><option>Experienced Investor</option><option>Portfolio Investor</option><option>HNW / UHNW</option>
          </select>
        </div>
        <div><label style={labelStyle}>Budget Range</label>
          <select value={form.budget} onChange={set("budget")} style={{ ...inputStyle }}>
            <option value="">Select...</option>
            <option>Under £50k</option><option>£50k – £100k</option><option>£100k – £200k</option><option>£200k – £500k</option><option>£500k+</option>
          </select>
        </div>
        <div><label style={labelStyle}>Experience Level</label>
          <select value={form.experience} onChange={set("experience")} style={{ ...inputStyle }}>
            <option value="">Select...</option>
            <option>No experience</option><option>1-2 years</option><option>3-5 years</option><option>5+ years</option>
          </select>
        </div>
      </div>
      <div style={{ marginBottom: 14 }}><label style={labelStyle}>Target Area</label><input value={form.area} onChange={set("area")} placeholder="e.g. Manchester, Leeds, Sheffield" style={inputStyle} /></div>
      <div style={{ marginBottom: 20 }}><label style={labelStyle}>Message</label><textarea value={form.message} onChange={set("message")} placeholder={`Questions about ${deal ? deal.title : "this deal"}...`} rows={3} style={{ ...inputStyle, resize: "vertical" }} /></div>
      <button onClick={() => setSent(true)} style={{ width: "100%", background: "#1a3c5e", color: "white", border: "none", borderRadius: 10, padding: "14px", cursor: "pointer", fontSize: 15, fontWeight: 700, letterSpacing: "-0.2px" }}>
        Submit Enquiry →
      </button>
      <p style={{ fontSize: 12, color: "#aaa", textAlign: "center", marginTop: 12 }}>Your details are kept strictly confidential.</p>
    </div>
  );
}

function DealDetailPage({ deal, setPage }) {
  const tc = typeColors[deal.type] || { bg: "#f0f0f0", text: "#333" };
  return (
    <div style={{ background: "#f7f8fc", minHeight: "100vh", paddingTop: 72 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 5%" }}>
        <button onClick={() => setPage("deals")} style={{ background: "white", border: "1px solid #e0e0e0", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 14, color: "#555", marginBottom: 28, display: "flex", alignItems: "center", gap: 6 }}>← Back to Deals</button>
        <div className="deal-detail-grid" style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 32, alignItems: "start" }}>
          <div>
            <div style={{ background: "white", borderRadius: 16, overflow: "hidden", border: "1px solid #e8e8e8", marginBottom: 24 }}>
              <img src={deal.image} alt={deal.title} style={{ width: "100%", height: 340, objectFit: "cover" }} />
            </div>
            <div style={{ background: "white", borderRadius: 16, padding: "28px", border: "1px solid #e8e8e8", marginBottom: 24 }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                <span style={{ background: tc.bg, color: tc.text, fontSize: 11, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", borderRadius: 6, padding: "4px 10px" }}>{deal.type}</span>
                <span style={{ background: statusColors[deal.status]?.bg, color: statusColors[deal.status]?.text, fontSize: 11, fontWeight: 600, borderRadius: 6, padding: "4px 10px" }}>{deal.status}</span>
                <span style={{ background: "#f0f0f0", color: "#666", fontSize: 11, borderRadius: 6, padding: "4px 10px", display: "inline-flex", alignItems: "center", gap: 4 }}>
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="none"><path d="M5 0C2.8 0 1 1.8 1 4C1 7 5 12 5 12C5 12 9 7 9 4C9 1.8 7.2 0 5 0Z" fill="#888"/><circle cx="5" cy="4" r="1.5" fill="white"/></svg>
                  {deal.location}
                </span>
              </div>
              <h1 style={{ fontFamily: "'Georgia', serif", fontSize: 30, fontWeight: 700, color: "#1a1a1a", margin: "0 0 16px", letterSpacing: "-0.5px" }}>{deal.title}</h1>
              <div className="deal-metrics" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
                {[["ROI", `${deal.roi}%`, "#1e5c3a", "#e8f5ee"], ["Annual Yield", `${deal.yield}%`, "#4a2c6e", "#f0eaf8"], ["Monthly Cashflow", `£${deal.cashflow}`, "#1a3c5e", "#e8f0f8"]].map(([l, v, c, bg]) => (
                  <div key={l} style={{ background: bg, borderRadius: 12, padding: "16px 14px", textAlign: "center" }}>
                    <div style={{ fontSize: 12, color: c, fontWeight: 600, marginBottom: 4, opacity: 0.7 }}>{l}</div>
                    <div style={{ fontFamily: "'Georgia', serif", fontSize: 26, fontWeight: 700, color: c }}>{v}</div>
                  </div>
                ))}
              </div>
              <h2 style={{ fontFamily: "'Georgia', serif", fontSize: 18, fontWeight: 700, color: "#1a1a1a", margin: "0 0 10px" }}>Overview</h2>
              <p style={{ fontSize: 15, color: "#555", lineHeight: 1.75, margin: 0 }}>{deal.description}</p>
            </div>
            <div className="deal-bottom-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div style={{ background: "white", borderRadius: 16, padding: "24px", border: "1px solid #e8e8e8" }}>
                <h2 style={{ fontFamily: "'Georgia', serif", fontSize: 18, fontWeight: 700, color: "#1a1a1a", margin: "0 0 16px" }}>Financial Breakdown</h2>
                {[["Monthly Gross Rent", `£${deal.financials.monthlyRent.toLocaleString()}`], ["Management Fees", `£${deal.financials.managementFees.toLocaleString()}`], ["Net Monthly Income", `£${deal.financials.netMonthly.toLocaleString()}`], ["Annual Return", `£${deal.financials.annualReturn.toLocaleString()}`], ["Setup / Purchase Cost", `£${deal.financials.setupCosts.toLocaleString()}`]].map(([l, v], i) => (
                  <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i < 4 ? "1px solid #f0f0f0" : "none" }}>
                    <span style={{ fontSize: 14, color: "#666" }}>{l}</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a" }}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: "white", borderRadius: 16, padding: "24px", border: "1px solid #e8e8e8" }}>
                <h2 style={{ fontFamily: "'Georgia', serif", fontSize: 18, fontWeight: 700, color: "#1a1a1a", margin: "0 0 16px" }}>Deal Highlights</h2>
                {deal.highlights.map(h => (
                  <div key={h} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
                    <span style={{ width: 20, height: 20, background: "#e8f5ee", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1.5 4L3.8 6.5L8.5 1.5" stroke="#1e5c3a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    <span style={{ fontSize: 14, color: "#444", lineHeight: 1.5 }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="deal-sticky" style={{ position: "sticky", top: 88 }}>
            <div style={{ background: "white", borderRadius: 16, padding: "28px", border: "1px solid #e8e8e8" }}>
              <InquiryForm deal={deal} />
            </div>
            <div style={{ background: "#1a3c5e", borderRadius: 16, padding: "24px", marginTop: 16, textAlign: "center" }}>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, margin: "0 0 6px" }}>Need help fast?</p>
              <p style={{ color: "white", fontWeight: 700, fontSize: 16, margin: "0 0 4px", fontFamily: "'Georgia', serif" }}>0800 123 4567</p>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, margin: 0 }}>Mon–Fri 9am–6pm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AlertsPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", types: [], budget: "", areas: "", frequency: "daily" });
  const toggleType = t => setForm(f => ({ ...f, types: f.types.includes(t) ? f.types.filter(x => x !== t) : [...f.types, t] }));
  if (sent) return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 5%" }}>
      <div style={{ textAlign: "center", maxWidth: 480 }}>
        <div style={{ width: 72, height: 72, background: "#e8f5ee", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M7 17L13 23L25 11" stroke="#1e5c3a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <h2 style={{ fontFamily: "'Georgia', serif", fontSize: 32, color: "#1a1a1a", margin: "0 0 12px" }}>You're on the list</h2>
        <p style={{ color: "#666", fontSize: 16, lineHeight: 1.7 }}>You'll receive deal alerts straight to your inbox. First deals drop tomorrow morning.</p>
      </div>
    </div>
  );
  const inputStyle = { width: "100%", border: "1px solid #e0e0e0", borderRadius: 8, padding: "11px 14px", fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" };
  const labelStyle = { fontSize: 13, fontWeight: 600, color: "#444", display: "block", marginBottom: 6 };
  return (
    <div style={{ background: "#f7f8fc", minHeight: "100vh", paddingTop: 72 }}>
      <div style={{ background: "linear-gradient(160deg, #0d2137, #1a3c5e)", padding: "64px 5% 80px", textAlign: "center" }}>
        <h1 style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(30px, 5vw, 54px)", fontWeight: 700, color: "white", margin: "0 0 16px", letterSpacing: "-1px" }}>Get Deal Alerts</h1>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 18, margin: 0 }}>Be first to see new opportunities. Deals fill fast.</p>
      </div>
      <div style={{ maxWidth: 680, margin: "-40px auto 60px", padding: "0 5%", position: "relative", zIndex: 1 }}>
        <div style={{ background: "white", borderRadius: 20, padding: "40px", border: "1px solid #e8e8e8" }}>
          <div className="alerts-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div><label style={labelStyle}>Full Name *</label><input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={inputStyle} /></div>
            <div><label style={labelStyle}>Email *</label><input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} type="email" style={inputStyle} /></div>
            <div><label style={labelStyle}>Phone</label><input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} style={inputStyle} /></div>
            <div><label style={labelStyle}>Budget Range</label>
              <select value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))} style={{ ...inputStyle }}>
                <option value="">Select...</option>
                <option>Under £50k</option><option>£50k–£100k</option><option>£100k–£200k</option><option>£200k+</option>
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Deal Types</label>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {["R2R","BMV","BTL","BRRR"].map(t => {
                const tc2 = typeColors[t];
                const selected = form.types.includes(t);
                return <button key={t} onClick={() => toggleType(t)} style={{ border: selected ? `2px solid ${tc2.text}` : "1px solid #e0e0e0", background: selected ? tc2.bg : "white", color: selected ? tc2.text : "#666", borderRadius: 8, padding: "8px 18px", cursor: "pointer", fontSize: 14, fontWeight: selected ? 700 : 400, transition: "all 0.15s" }}>{t}</button>;
              })}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Target Areas</label>
            <input value={form.areas} onChange={e => setForm(f => ({ ...f, areas: e.target.value }))} placeholder="e.g. Manchester, Leeds, Birmingham" style={inputStyle} />
          </div>
          <div style={{ marginBottom: 28 }}>
            <label style={labelStyle}>Alert Frequency</label>
            <div style={{ display: "flex", gap: 10 }}>
              {["daily","weekly","as-listed"].map(freq => (
                <button key={freq} onClick={() => setForm(f => ({ ...f, frequency: freq }))} style={{ border: form.frequency === freq ? "2px solid #1a3c5e" : "1px solid #e0e0e0", background: form.frequency === freq ? "#e8f0f8" : "white", color: form.frequency === freq ? "#1a3c5e" : "#666", borderRadius: 8, padding: "8px 18px", cursor: "pointer", fontSize: 14, fontWeight: form.frequency === freq ? 700 : 400, transition: "all 0.15s", textTransform: "capitalize" }}>{freq}</button>
              ))}
            </div>
          </div>
          <button onClick={() => setSent(true)} style={{ width: "100%", background: "#1a3c5e", color: "white", border: "none", borderRadius: 10, padding: "15px", cursor: "pointer", fontSize: 16, fontWeight: 700 }}>
            Join Deal Alerts →
          </button>
        </div>
      </div>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", title: "We source the deal", body: "Our network of agents, solicitors and direct vendors surfaces opportunities before they hit the open market." },
    { n: "02", title: "We package and vet it", body: "Every deal is assessed for ROI, legal compliance, and risk profile. You receive only investment-ready opportunities." },
    { n: "03", title: "You review and choose", body: "Browse deals on your own time. Request a full information pack. Ask our team any questions." },
    { n: "04", title: "We support completion", body: "From legal introductions to project management, TPS Group supports you from offer to first rental income." },
  ];
  return (
    <section style={{ padding: "88px 5%", background: "#f7f8fc" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#1a3c5e", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 12 }}>The Process</p>
          <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: "#1a1a1a", letterSpacing: "-0.8px", margin: 0 }}>From sourcing to cashflow</h2>
        </div>
        <div className="hiw-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 2, position: "relative" }}>
          {steps.map((s, i) => (
            <div key={s.n} className={`hiw-step`} style={{ background: "white", padding: "32px 28px", border: "1px solid #e8e8e8", borderRadius: i === 0 ? "14px 0 0 14px" : i === 3 ? "0 14px 14px 0" : 0 }}>
              <div style={{ fontFamily: "'Georgia', serif", fontSize: 40, fontWeight: 700, color: "#e8e8e8", marginBottom: 12, lineHeight: 1 }}>{s.n}</div>
              <h3 style={{ fontFamily: "'Georgia', serif", fontSize: 18, fontWeight: 700, color: "#1a1a1a", margin: "0 0 10px" }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: "#666", lineHeight: 1.65, margin: 0 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyTPS() {
  return (
    <section style={{ padding: "88px 5%", background: "white" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="whytps-grid">
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#1a3c5e", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 16 }}>Why TPS Group</p>
          <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700, color: "#1a1a1a", letterSpacing: "-0.8px", margin: "0 0 24px", lineHeight: 1.15 }}>Institutional deal flow for the private investor</h2>
          <p style={{ fontSize: 16, color: "#555", lineHeight: 1.75, marginBottom: 32 }}>We don't just list deals — we source, structure and stand behind every opportunity on this platform. TPS Group investors get access to transactions that never reach the open market.</p>
          {[["Off-market pipeline", "Our deals never appear on Rightmove or Zoopla."], ["Full due diligence", "Structural surveys, legal title checks and financial modelling included."], ["End-to-end support", "From viewing to rent day, our team is with you."]].map(([t, b]) => (
            <div key={t} style={{ display: "flex", gap: 14, marginBottom: 20 }}>
              <div style={{ width: 32, height: 32, background: "#e8f0f8", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7H11M8 4L11 7L8 10" stroke="#1a3c5e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div><div style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", marginBottom: 2 }}>{t}</div><div style={{ fontSize: 14, color: "#666" }}>{b}</div></div>
            </div>
          ))}
        </div>
        <div className="whytps-stats" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[["£18M+", "Capital placed for investors"], ["240+", "Deals sourced to date"], ["94%", "Client retention rate"], ["8 yrs", "Track record in UK property"]].map(([num, label]) => (
            <div key={label} style={{ background: "#f7f8fc", borderRadius: 16, padding: "28px 20px", textAlign: "center", border: "1px solid #e8e8e8" }}>
              <div style={{ fontFamily: "'Georgia', serif", fontSize: 36, fontWeight: 700, color: "#1a3c5e", margin: "0 0 6px" }}>{num}</div>
              <div style={{ fontSize: 13, color: "#888", lineHeight: 1.4 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABanner({ setPage }) {
  return (
    <section style={{ padding: "80px 5%", background: "linear-gradient(160deg, #0d2137, #1a3c5e)" }}>
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 700, color: "white", margin: "0 0 18px", letterSpacing: "-0.8px" }}>Ready to invest?</h2>
        <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", marginBottom: 36, lineHeight: 1.7 }}>Join 400+ investors already receiving TPS Group deal flow. New opportunities land every week.</p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => setPage("deals")} style={{ background: "white", color: "#1a3c5e", border: "none", borderRadius: 10, padding: "14px 28px", cursor: "pointer", fontSize: 15, fontWeight: 700 }}>Browse All Deals →</button>
          <button onClick={() => setPage("alerts")} style={{ background: "transparent", color: "white", border: "1px solid rgba(255,255,255,0.35)", borderRadius: 10, padding: "14px 28px", cursor: "pointer", fontSize: 15, fontWeight: 500 }}>Join Deal Alerts</button>
        </div>
      </div>
    </section>
  );
}

function Footer({ setPage }) {
  return (
    <footer style={{ background: "#0d2137", padding: "56px 5% 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48, flexWrap: "wrap" }}>
          <div className="footer-brand">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <TPSLogo size={38} dark />
              <div>
                <div style={{ fontFamily: "'Arial Rounded MT Bold', 'Arial', sans-serif", fontWeight: 800, fontSize: 20, color: "white", letterSpacing: "-0.5px", lineHeight: 1.1 }}>TPS</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", letterSpacing: "0.3px" }}>The Property Source Group</div>
              </div>
            </div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: 280 }}>Premium property deal flow for serious UK investors. R2R, BMV, BTL and BRRR opportunities sourced daily.</p>
          </div>
          {[["Strategies", ["R2R Deals","BMV Deals","BTL Deals","BRRR Deals"]], ["Company", ["About TPS","How It Works","Contact","Join Alerts"]]].map(([h, links]) => (
            <div key={h}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.9)", marginBottom: 16, letterSpacing: "0.5px" }}>{h}</p>
              {links.map(l => <p key={l} style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", margin: "0 0 10px", cursor: "pointer" }}>{l}</p>)}
            </div>
          ))}
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.9)", marginBottom: 16 }}>Contact</p>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", marginBottom: 8 }}>0800 123 4567</p>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", marginBottom: 8 }}>contact@thepropertysourcegroup.com</p>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)" }}>Mon–Fri 9am–6pm</p>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", margin: 0 }}>© 2025 TPS Group. All rights reserved. Property investment involves risk. Capital at risk.</p>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", margin: 0 }}>Registered in England & Wales</p>
        </div>
      </div>
    </footer>
  );
}

function FeaturedDeals({ setActiveDeal }) {
  return (
    <section style={{ padding: "88px 5%", background: "white" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#1a3c5e", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 10 }}>Live Opportunities</p>
            <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: "#1a1a1a", letterSpacing: "-0.8px", margin: 0 }}>Featured deals this week</h2>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))", gap: 24 }}>
          {DEALS.slice(0, 3).map(deal => <DealCard key={deal.id} deal={deal} onClick={() => setActiveDeal(deal)} />)}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [activeDeal, setActiveDeal] = useState(null);

  const handleSetActiveDeal = deal => { setActiveDeal(deal); setPage("deal-detail"); window.scrollTo(0, 0); };
  const handleSetPage = p => { setActiveDeal(null); setPage(p); window.scrollTo(0, 0); };

  const typeFilter = ["r2r","bmv","btl","brrr","deals"].includes(page) ? (page === "deals" ? null : page.toUpperCase()) : null;

  return (
    <div style={{ fontFamily: "'Palatino Linotype', 'Book Antiqua', Georgia, serif", minHeight: "100vh", background: "white" }}>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; }
        input, select, textarea, button { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        img { display: block; }

        /* Desktop nav visible, hamburger hidden */
        .desktop-nav { display: flex !important; }
        .mobile-menu-btn { display: none !important; }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }

          /* Hero: stack columns */
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-image-col { display: none !important; }
          .hero-left { padding: 40px 0 48px !important; border-right: none !important; }
          .hero-ticker { overflow-x: auto; white-space: nowrap; }
          .hero-stats-card { left: 50% !important; transform: translateX(-50%); bottom: 24px !important; width: 90% !important; }

          /* Category grid: 2 cols on mobile */
          .category-grid { grid-template-columns: 1fr 1fr !important; gap: 12px !important; }

          /* Deal cards: single col */
          .deals-grid { grid-template-columns: 1fr !important; }

          /* Deal detail: stack */
          .deal-detail-grid { grid-template-columns: 1fr !important; }
          .deal-sticky { position: static !important; }
          .deal-metrics { grid-template-columns: 1fr 1fr 1fr !important; }
          .deal-bottom-grid { grid-template-columns: 1fr !important; }

          /* Inquiry form: single col */
          .form-grid-2 { grid-template-columns: 1fr !important; }

          /* WhyTPS: stack */
          .whytps-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .whytps-stats { grid-template-columns: 1fr 1fr !important; }

          /* How it works: stack */
          .hiw-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
          .hiw-step:first-child { border-radius: 14px 14px 0 0 !important; }
          .hiw-step:last-child { border-radius: 0 0 14px 14px !important; }
          .hiw-step { border-radius: 0 !important; }

          /* Footer: stack */
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
          .footer-brand { grid-column: 1 / -1 !important; }

          /* Alerts form */
          .alerts-form-grid { grid-template-columns: 1fr !important; }

          /* Filter bar */
          .filter-bar { flex-direction: column !important; }
          .filter-bar > * { width: 100% !important; }

          /* Subscribe banner input row */
          .subscribe-row { flex-direction: column !important; }
          .subscribe-row input { width: 100% !important; }
          .subscribe-row button { width: 100% !important; }
        }

        @media (max-width: 480px) {
          .category-grid { grid-template-columns: 1fr !important; }
          .deal-metrics { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
      <NavBar page={page} setPage={handleSetPage} />
      {page === "home" && <>
        <Hero setPage={handleSetPage} />
        <CategoryGrid setPage={handleSetPage} />
        <FeaturedDeals setActiveDeal={handleSetActiveDeal} />
        <HowItWorks />
        <WhyTPS />
        <CTABanner setPage={handleSetPage} />
        <Footer setPage={handleSetPage} />
      </>}
      {(["r2r","bmv","btl","brrr","deals"].includes(page)) && <>
        <DealsPage typeFilter={typeFilter} setActiveDeal={handleSetActiveDeal} />
        <Footer setPage={handleSetPage} />
      </>}
      {page === "deal-detail" && activeDeal && <><DealDetailPage deal={activeDeal} setPage={handleSetPage} /><Footer setPage={handleSetPage} /></>}
      {page === "alerts" && <><AlertsPage /><Footer setPage={handleSetPage} /></>}
    </div>
  );
}

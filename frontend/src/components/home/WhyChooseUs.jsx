import "../../styles/whyChooseUs.css";

export default function WhyChooseUs() {
  return (
    <>
      {/* WHY CHOOSE US */}
      <section className="why">
        <h2 className="section-title">Why Choose JJ Impex</h2>

        <div className="why-grid">
          <div className="why-card">
            <div className="why-icon">🌍</div>
            <h3>Global Sourcing</h3>
            <p>Direct imports from international manufacturers.</p>
          </div>

          <div className="why-card">
            <div className="why-icon">❄</div>
            <h3>Cold Chain Logistics</h3>
            <p>Temperature controlled logistics for freshness.</p>
          </div>

          <div className="why-card">
            <div className="why-icon">✔</div>
            <h3>Certified Quality</h3>
            <p>Compliant with international food safety standards.</p>
          </div>

          <div className="why-card">
            <div className="why-icon">🚚</div>
            <h3>Reliable Supply</h3>
            <p>Fast distribution for restaurants & retailers.</p>
          </div>
        </div>
      </section>
    </>
  );
}

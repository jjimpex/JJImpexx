import "../../styles/values.css";


export default function Values() {
  return (
    <section className="values">
      <h2>Delivering World-Class Food Imports</h2>

      <div className="values-wrapper">
        <div className="value-card">
          <h3>Direct Global Sourcing</h3>
          <p>Authentic products sourced directly from manufacturers.</p>
        </div>

        <div className="value-card">
          <h3>Food Safety First</h3>
          <p>Temperature-controlled logistics and compliance.</p>
        </div>

        <div className="value-card">
          <h3>Reliable B2B Distribution</h3>
          <p>Serving hotels, QSRs and cloud kitchens.</p>
        </div>
      </div>

      <div className="values-arrows">
        <div className="arrow">‹</div>
        <div className="arrow">›</div>
      </div>
    </section>
  );
}
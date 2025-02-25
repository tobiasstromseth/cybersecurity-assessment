import React from "react";
import "../styles/Dashboard.css";

function Dashboard({ securityScore, priorityMeasures, onViewAllMeasures }) {
  const getScoreColor = (score) => {
    if (score >= 70) return "green";
    if (score >= 40) return "orange";
    return "red";
  };

  const scoreColor = getScoreColor(securityScore);

  const getScoreLabel = (score) => {
    if (score >= 70) return "God";
    if (score >= 40) return "Middels";
    return "Svak";
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Sikkerhetsvurdering</h2>
        <p>Basert på dine svar, har vi generert følgende vurdering:</p>
      </div>

      <div className="security-score-container">
        <div className="security-score">
          <div
            className="score-circle"
            style={{
              borderColor: scoreColor,
              color: scoreColor,
            }}
          >
            <span className="score-number">{Math.round(securityScore)}</span>
            <span className="score-percent">%</span>
          </div>
          <div className="score-label" style={{ color: scoreColor }}>
            {getScoreLabel(securityScore)} sikkerhet
          </div>
        </div>

        <div className="score-explanation">
          <h3>Hva betyr denne scoren?</h3>
          <p>
            Din sikkerhetsscore er basert på dine svar på våre
            vurderingsspørsmål. En høyere score indikerer bedre
            cybersikkerhetstiltak i din organisasjon.
          </p>
          <ul>
            <li>
              <span className="score-indicator green"></span> 70-100%: God
              sikkerhet
            </li>
            <li>
              <span className="score-indicator orange"></span> 40-69%: Middels
              sikkerhet
            </li>
            <li>
              <span className="score-indicator red"></span> 0-39%: Svak
              sikkerhet
            </li>
          </ul>
        </div>
      </div>

      <div className="priority-measures">
        <h3>Prioriterte tiltak</h3>
        <p>
          Basert på din vurdering anbefaler vi følgende høyt prioriterte tiltak:
        </p>

        {priorityMeasures.length > 0 ? (
          <div className="measures-list">
            {priorityMeasures.map((measure) => (
              <div key={measure.id} className="measure-card">
                <div
                  className="measure-priority"
                  data-priority={measure.priority.toLowerCase()}
                >
                  {measure.priority} prioritet
                </div>
                <h4>{measure.title}</h4>
                <p>{measure.description}</p>
                <div className="measure-category">{measure.category}</div>
              </div>
            ))}
          </div>
        ) : (
          <p>Ingen prioriterte tiltak funnet.</p>
        )}

        <button className="view-all-button" onClick={onViewAllMeasures}>
          Se alle anbefalte tiltak
        </button>
      </div>
    </div>
  );
}

export default Dashboard;

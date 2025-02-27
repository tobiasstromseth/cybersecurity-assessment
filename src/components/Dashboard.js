// src/components/Dashboard.js
import React from "react";
import "../styles/Dashboard.css";

function Dashboard({ securityScore, priorityMeasures, onViewAllMeasures }) {
  // Score beregning og klassifisering
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

  // Få detaljert forklaring basert på scoren
  const getDetailedExplanation = (score) => {
    if (score >= 70) {
      return {
        heading: "Din organisasjon har god cybersikkerhet",
        details: [
          "Dere har implementert grunnleggende sikkerhetstiltak",
          "De fleste kritiske sikkerhetskontroller er på plass",
          "Dere har en proaktiv tilnærming til cybersikkerhet",
        ],
        icon: "✓",
        recommendation:
          "Fortsett det gode arbeidet og vurder å implementere de anbefalte tiltakene for å ytterligere styrke sikkerhetsposisjonen.",
      };
    } else if (score >= 40) {
      return {
        heading: "Din organisasjon har middels cybersikkerhet",
        details: [
          "Dere har implementert noen sikkerhetstiltak, men har fortsatt sårbarheter",
          "Flere viktige sikkerhetskontroller mangler eller er ufullstendige",
          "Dere har en reaktiv tilnærming til cybersikkerhet",
        ],
        icon: "!",
        recommendation:
          "Implementer de prioriterte tiltakene for å betydelig redusere risikoen for sikkerhetsbrudd.",
      };
    } else {
      return {
        heading: "Din organisasjon har svak cybersikkerhet",
        details: [
          "Dere mangler flere grunnleggende sikkerhetstiltak",
          "Organisasjonen er sårbar for vanlige angrepstyper",
          "Umiddelbare tiltak er nødvendig for å redusere risiko",
        ],
        icon: "×",
        recommendation:
          "Start umiddelbart med å implementere de høyt prioriterte tiltakene for å beskytte organisasjonens data og systemer.",
      };
    }
  };

  const scoreExplanation = getDetailedExplanation(securityScore);
  const roundedScore = Math.round(securityScore);

  // Dashbord gauge beregning
  const dashOffset = 440 - 440 * (roundedScore / 100);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Din Sikkerhetsvurdering</h2>
        <p>
          Basert på dine svar har vi analysert din organisasjons sikkerhetsnivå:
        </p>
      </div>

      <div className="security-score-container">
        <div className="security-score">
          {/* Modern gauge/meter for score */}
          <div className="gauge-container">
            <svg width="200" height="200" viewBox="0 0 200 200">
              <circle
                className="gauge-background"
                cx="100"
                cy="100"
                r="70"
                strokeWidth="20"
                stroke="#e6e6e6"
                fill="none"
              />
              <circle
                className="gauge-progress"
                cx="100"
                cy="100"
                r="70"
                strokeWidth="20"
                stroke={scoreColor}
                fill="none"
                strokeDasharray="440"
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
              />
              <text
                x="100"
                y="95"
                textAnchor="middle"
                fill={scoreColor}
                fontSize="32"
                fontWeight="bold"
              >
                {roundedScore}%
              </text>
              <text
                x="100"
                y="125"
                textAnchor="middle"
                fill={scoreColor}
                fontSize="18"
              >
                {getScoreLabel(securityScore)}
              </text>
            </svg>
          </div>
          <div className="score-badge" style={{ backgroundColor: scoreColor }}>
            <span className="score-icon">{scoreExplanation.icon}</span>
          </div>
        </div>

        <div className="score-explanation">
          <h3>{scoreExplanation.heading}</h3>
          <ul className="detailed-explanation">
            {scoreExplanation.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
          <div className="score-recommendation">
            <p>{scoreExplanation.recommendation}</p>
          </div>
          <div className="score-legend">
            <h4>Sikkerhetsnivåer:</h4>
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
      </div>

      <div className="priority-measures">
        <div className="priority-header">
          <h3>Dine Prioriterte Tiltak</h3>
          <div className="priority-badge">{priorityMeasures.length}</div>
        </div>
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
                <div className="measure-reason">{measure.reason}</div>
                <div className="measure-category">{measure.category}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-measures">
            <p>
              Ingen prioriterte tiltak funnet. Din organisasjon har god
              sikkerhet!
            </p>
          </div>
        )}

        <button className="view-all-button" onClick={onViewAllMeasures}>
          Se alle anbefalte tiltak
        </button>
      </div>
    </div>
  );
}

export default Dashboard;

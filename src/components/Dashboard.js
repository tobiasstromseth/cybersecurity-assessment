// src/components/Dashboard.js - Omorganisert layout
import React from "react";
import "../styles/components/Dashboard.css";

function Dashboard({
  securityScore,
  priorityMeasures,
  onViewAllMeasures,
  companyInfo,
}) {
  // Score beregning og klassifisering
  const getScoreColor = (score) => {
    if (score >= 70) return "var(--status-success)";
    if (score >= 40) return "var(--status-warning)";
    return "var(--status-danger)";
  };

  const getScoreLightColor = (score) => {
    if (score >= 70) return "var(--status-success-light)";
    if (score >= 40) return "var(--status-warning-light)";
    return "var(--status-danger-light)";
  };

  const scoreColor = getScoreColor(securityScore);
  const scoreLightColor = getScoreLightColor(securityScore);

  const getScoreLabel = (score) => {
    if (score >= 70) return "God";
    if (score >= 40) return "Middels";
    return "Svak";
  };

  const scoreExplanation = getDetailedExplanation(securityScore);
  const roundedScore = Math.round(securityScore);

  // Få detaljert forklaring basert på scoren
  function getDetailedExplanation(score) {
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
  }

  return (
    <div className="dashboard-container">
      {/* Left Section */}
      <div className="left-section">
        <div className="dashboard-header">
          <h2>Sikkerhetsstatus</h2>
        </div>
        
        {/* Score display */}
        <div className="score-display">
          <div className="score-number">
            <span className="large-score">{roundedScore}</span>
            <span className="max-score">/ 100</span>
          </div>
          
          <div>
            <div>Sikkerhetsnivå: Advanced</div>
            
            {/* Progress bar */}
            <div className="progress-container">
              <div className="progress-bar-background">
                <div 
                  className="progress-bar"
                  style={{ 
                    width: `${securityScore}%`, 
                    backgroundColor: scoreColor 
                  }}
                />
              </div>
              <div className="progress-labels">
                <span>0</span>
                <span>50</span>
                <span>100</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Security ranking section */}
        <div className="security-ranking-section">
          <h3>Din sikkerhetsrangering</h3>
          
          <div className="ranking-buttons">
            <button>B</button>
            <button>N</button>
            <button>I</button>
            <button className="active">A</button>
            <button>E</button>
            <button>M</button>
            <button>GM</button>
          </div>
          
          <div className="ranking-info">
            <div className="current-next">
              <div>
                <span>Nåværende:</span>
                <span>Advanced</span>
              </div>
              <div>
                <span>Neste:</span>
                <span>Expert (4 poeng)</span>
              </div>
            </div>
            
            <div className="stats-cards">
              <div className="stat-card">
                <div className="stat-icon">↗</div>
                <div className="stat-label">Neste mål</div>
                <div className="stat-value">4</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">📈</div>
                <div className="stat-label">Over snitt</div>
                <div className="stat-value">+7</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">🛡️</div>
                <div className="stat-label">Rangering</div>
                <div className="stat-value">#4 av 10</div>
              </div>
            </div>
            
            <div className="points-needed">
              Du trenger bare <strong>4 poeng</strong> for å nå <strong>Expert</strong> nivå!
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Section */}
      <div className="right-section">
        <div className="measures-header">
          <h2>Tiltaksliste</h2>
          <p>Ved å fullføre gjenstående tiltak kan du forbedre scoren med opptil 28 poeng og sikre bedriften din bedre!</p>
        </div>
        
        <div className="measures-list">
          {priorityMeasures.map((measure, index) => (
            <div 
              key={index}
              className="measure-item"
              style={{ 
                borderLeft: `4px solid ${
                  index === 0 ? "var(--status-danger)" : 
                  index === 4 ? "var(--status-success)" : 
                  "var(--status-warning)"
                }`
              }}
            >
              <div className="measure-content">
                <h3>{measure.title}</h3>
                <p>{measure.description}</p>
              </div>
              
              <div className="measure-meta">
                <div className="measure-details">
                  <span>Effekt: Medium</span>
                  <span>Kritikalitet: Lav</span>
                  <span>Innsats: Høy</span>
                </div>
                <div className="measure-points">+4 poeng</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
// src/components/Dashboard.js - Omorganisert layout
import React from "react";
import "../styles/components/Dashboard.css";

function Dashboard({
  securityScore,
  priorityMeasures
}) {
  // Vi trenger ikke lenger getScoreColor siden fargen nå styres av CSS-gradient
  
  const getScoreLightColor = (score) => {
    if (score >= 70) return "var(--status-success-light)";
    if (score >= 40) return "var(--status-warning-light)";
    return "var(--status-danger-light)";
  };

  const scoreLightColor = getScoreLightColor(securityScore);

  const getScoreLabel = (score) => {
    if (score >= 70) return "God";
    if (score >= 40) return "Middels";
    return "Svak";
  };

  const roundedScore = Math.round(securityScore);
  
  // Beregn posisjonen for gradienten basert på score
  // Vi må gjøre 100 - securityScore fordi vi vil ha fargen ved det punktet som vises
  const scorePosition = `${100 - securityScore}%`;

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
            <span 
              className="large-score" 
              style={{ 
                //Flytt til CSS fil. Holdt på her for å gjøre ting lettere
                backgroundImage: 'linear-gradient(to right, var(--red), var(--yellow) 50%, var(--green) 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                backgroundSize: '10000% 100%', //Dette er en gradient. Zoomer inn for å få riktig farge
                backgroundPositionX: `${securityScore * 100 / (100 - 1)}%`
              }}
            >
              {roundedScore}
            </span>
            <p className="max-score">/100</p>
            <p className="security-level">Sikkerhetsnivå: Advanced</p>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="progress-container">
          <div 
            className="progress-bar-background"
            style={{ '--score': `${securityScore}%` }}
          >
            <div className="progress-bar-cover"></div>
          </div>
          <div className="progress-labels">
            <span className="progress-labels-low">0</span>
            <span className="progress-labels-medium">50</span>
            <span className="progress-labels-high">100</span>
          </div>
        </div>
        
        {/* Security ranking section */}
        <div className="security-ranking-section">
          <div className="security-ranking-section-top">
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
            <div className="current-next">
                <div>
                  <span>Nåværende: </span>
                  <span style={{ fontWeight: 'bold' }}>Advanced</span>
                </div>
                <div>
                  <span>Neste: </span>
                  <span style={{ fontWeight: 'bold' }}>Expert (4 poeng)</span>
                </div>
              </div>
            </div>
            
            <div className="security-ranking-section-bottom">
              <div className="ranking-info">
                            
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
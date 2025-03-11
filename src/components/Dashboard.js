// src/components/Dashboard.js - Enhanced with full measures list integration
import React, { useState } from "react";
import "../styles/components/Dashboard.css";

function Dashboard({
  securityScore,
  priorityMeasures,
  companyInfo,
  updateMeasureProgress,
  allMeasures = [], // Adding all measures as a prop with default empty array
}) {
  // State for filtering and search in the measures section
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedMeasureId, setExpandedMeasureId] = useState(null);

  // Get all unique categories from measures
  const categories = ["all", ...new Set(allMeasures.map((m) => m.category))];

  // Filter measures based on search and category
  const filteredMeasures = allMeasures.filter((measure) => {
    const matchesCategory = filter === "all" || measure.category === filter;
    const matchesSearch =
      measure.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      measure.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Toggle expanded state for implementation guide
  const toggleExpand = (measureId) => {
    setExpandedMeasureId(expandedMeasureId === measureId ? null : measureId);
  };

  // Function to get light color based on score
  const getScoreLightColor = (score) => {
    if (score >= 70) return "var(--status-success-light)";
    if (score >= 40) return "var(--status-warning-light)";
    return "var(--status-danger-light)";
  };

  const scoreLightColor = getScoreLightColor(securityScore);

  // Function to get score label
  const getScoreLabel = (score) => {
    if (score >= 70) return "God";
    if (score >= 40) return "Middels";
    return "Svak";
  };

  const roundedScore = Math.round(securityScore);

  // Calculate position for gradient based on score
  const scorePosition = `${100 - securityScore}%`;

  // Helper function to get employee size context from MeasuresOverview
  const getEmployeeSizeContext = (measure, size) => {
    if (!size) return "";

    // This is the same logic from the MeasuresOverview component
    if (size === "0-5") {
      switch (measure.category) {
        case "Identitets- og tilgangsstyring":
          return "For mindre bedrifter: Vurder skybaserte løsninger med innebygd totrinnsverifisering for enkelt oppsett.";
        case "Opplæring og bevisstgjøring":
          return "For små team: Korte månedlige sikkerhetssamtaler kan være mer effektivt enn formelle kurs.";
        case "Datahåndtering":
          return "For mikrobedrifter: Automatiserte skybaserte backup-løsninger er ofte kostnadseffektive.";
        case "Sårbarhetsadministrasjon":
          return "For mindre bedrifter: Velg programvare med automatiske oppdateringer for å forenkle vedlikehold.";
        case "Nettverkssikkerhet":
          return "For hjemmekontor/små kontor: Moderne WiFi-rutere har ofte innebygd brannmurfunksjonalitet.";
        default:
          return "";
      }
    } else if (size === "5-10") {
      switch (measure.category) {
        case "Identitets- og tilgangsstyring":
          return "For små bedrifter: Implementer en sentral ID-løsning med rollebasert tilgangskontroll.";
        case "Opplæring og bevisstgjøring":
          return "For små team: Utnevn en sikkerhetsansvarlig som kan koordinere opplæring.";
        case "Datahåndtering":
          return "For små bedrifter: Vurder både lokal og skybasert backup med regulære tester.";
        case "Sårbarhetsadministrasjon":
          return "For små bedrifter: Implementer en enkel asset-database for å holde oversikt over programvare.";
        case "Nettverkssikkerhet":
          return "For små kontorer: Separer gjestenett fra bedriftsnett og vurder VPN for fjernarbeid.";
        default:
          return "";
      }
    } else {
      // 10+ ansatte
      switch (measure.category) {
        case "Identitets- og tilgangsstyring":
          return "For større bedrifter: Vurder Single Sign-On løsninger med streng tilgangskontroll.";
        case "Opplæring og bevisstgjøring":
          return "For større organisasjoner: Implementer regelmessige phishing-simuleringer og skreddersydd opplæring.";
        case "Datahåndtering":
          return "For mellomstore/store bedrifter: Utvikle en fullstendig strategi for datasikkerhet og backups med RTO/RPO målsetninger.";
        case "Sårbarhetsadministrasjon":
          return "For større bedrifter: Implementer systematisk sårbarhetsscanning og patch management.";
        case "Nettverkssikkerhet":
          return "For større nettverk: Vurder segmentering, avansert brannmur og inntrengningsdeteksjon (IDS/IPS).";
        default:
          return "";
      }
    }
  };

  // Handle step completion
  const handleStepComplete = (measureId, stepIndex, isComplete) => {
    if (updateMeasureProgress) {
      updateMeasureProgress(measureId, stepIndex, isComplete);
    }
  };

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
                backgroundImage:
                  "linear-gradient(to right, var(--red), var(--yellow) 50%, var(--green) 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                backgroundSize: "10000% 100%",
                backgroundPositionX: `${(securityScore * 100) / (100 - 1)}%`,
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
            style={{ "--score": `${securityScore}%` }}
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
                <span style={{ fontWeight: "bold" }}>Advanced</span>
              </div>
              <div>
                <span>Neste: </span>
                <span style={{ fontWeight: "bold" }}>Expert (4 poeng)</span>
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
                Du trenger bare <strong>4 poeng</strong> for å nå{" "}
                <strong>Expert</strong> nivå!
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Now with integrated full measures list */}
      <div className="right-section">
        <div className="measures-header">
          <h2>Tiltaksliste</h2>
          <p>
            Ved å fullføre gjenstående tiltak kan du forbedre scoren med opptil
            28 poeng og sikre bedriften din bedre!
          </p>
        </div>

        {/* Integrated company context panel from MeasuresOverview */}
        {companyInfo && (
          <div className="company-context-panel">
            <p>
              Tiltakene nedenfor er relevante for{" "}
              <strong>{companyInfo.companyName}</strong>, en{" "}
              <strong>{companyInfo.industry.toLowerCase()}</strong> virksomhet
              med <strong>{companyInfo.employeeCount}</strong> ansatte.
            </p>
          </div>
        )}

        {/* Integrated filter and search from MeasuresOverview */}
        <div className="measures-filters">
          <div className="search-container">
            <input
              type="text"
              placeholder="Søk i tiltak..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category}
                className={filter === category ? "active" : ""}
                onClick={() => setFilter(category)}
              >
                {category === "all" ? "Alle kategorier" : category}
              </button>
            ))}
          </div>
        </div>

        {/* Measures list with expanded content from MeasuresOverview */}
        <div className="measures-list">
          {filteredMeasures.length > 0 ? (
            filteredMeasures.map((measure) => (
              <div key={measure.id} className="measure-item">
                <div
                  className={`measure-card ${
                    expandedMeasureId === measure.id ? "expanded" : ""
                  }`}
                  onClick={() => toggleExpand(measure.id)}
                >
                  <div
                    className="measure-priority"
                    data-priority={measure.priority.toLowerCase()}
                  >
                    {measure.priority} prioritet
                  </div>
                  <h3>{measure.title}</h3>
                  <p className="measure-description">{measure.description}</p>
                  <div className="measure-reason">{measure.reason}</div>

                  {companyInfo && (
                    <div className="measure-context">
                      {getEmployeeSizeContext(
                        measure,
                        companyInfo.employeeCount
                      )}
                    </div>
                  )}

                  <div className="measure-footer">
                    <div className="measure-category">{measure.category}</div>
                    {measure.implementationSteps &&
                      measure.implementationSteps.length > 0 && (
                        <div className="measure-expand-indicator">
                          {expandedMeasureId === measure.id
                            ? "▲ Skjul implementeringsguide"
                            : "▼ Vis implementeringsguide"}
                        </div>
                      )}
                  </div>
                </div>

                {/* Implementation guide from MeasuresOverview */}
                {expandedMeasureId === measure.id &&
                  measure.implementationSteps && (
                    <div className="implementation-guide">
                      <div className="guide-header">
                        <h4>Implementeringsguide</h4>
                        {measure.eloPoints && (
                          <div className="elo-points">
                            +{measure.eloPoints} ELO
                          </div>
                        )}
                      </div>

                      <p className="guide-description">
                        Følg denne steg-for-steg-guiden for å implementere{" "}
                        {measure.title.toLowerCase()} i din virksomhet.
                        Gjennomføring av alle stegene gir din bedrift +
                        {measure.eloPoints || 0} ELO-poeng i sikkerhetsscore.
                      </p>

                      <div className="implementation-steps">
                        {measure.implementationSteps.map((step, index) => (
                          <div key={index} className="implementation-step">
                            <div className="step-header">
                              <div className="step-number">{index + 1}</div>
                              <div className="step-title">{step.title}</div>
                              <button
                                className={`step-complete-button ${
                                  step.completed ? "completed" : ""
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStepComplete(
                                    measure.id,
                                    index,
                                    !step.completed
                                  );
                                }}
                              >
                                {step.completed
                                  ? "Fullført"
                                  : "Merk som fullført"}
                              </button>
                            </div>
                            <p className="step-description">
                              {step.description}
                            </p>

                            {step.details && (
                              <div className="step-details">
                                {step.details.map((detail, detailIndex) => (
                                  <div
                                    key={detailIndex}
                                    className="step-detail-item"
                                  >
                                    <div className="detail-icon">ⓘ</div>
                                    <p>{detail}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            ))
          ) : (
            <div className="no-measures">
              <p>Ingen tiltak funnet med gjeldende filtre.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

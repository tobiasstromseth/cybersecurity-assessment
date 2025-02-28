// src/components/MeasuresOverview.js - Med nedoverrettet implementeringsguide
import React, { useState } from "react";
import "../styles/components/MeasuresOverview.css";

function MeasuresOverview({ measures, companyInfo, updateMeasureProgress }) {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedMeasureId, setExpandedMeasureId] = useState(null);
  
  // Håndterer utvidelse/sammentrekning av implementeringsguide
  const toggleExpand = (measureId) => {
    console.log("Forsøker å utvide/skjule:", measureId);
    setExpandedMeasureId(expandedMeasureId === measureId ? null : measureId);
  };
  const categories = ["all", ...new Set(measures.map((m) => m.category))];

  const filteredMeasures = measures.filter((measure) => {
    const matchesCategory = filter === "all" || measure.category === filter;
    const matchesSearch =
      measure.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      measure.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Tilpassing av tiltak basert på bedriftsstørrelse
  const getEmployeeSizeContext = (measure, size) => {
    // Dette er et eksempel og kan utvides med mer spesifikke råd
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

  // Håndter markering av implementeringssteg som fullført
  const handleStepComplete = (measureId, stepIndex, isComplete) => {
    // Kalle på callback-funksjonen som blir sendt inn til komponenten
    if (updateMeasureProgress) {
      updateMeasureProgress(measureId, stepIndex, isComplete);
    }
  };

  return (
    <div className="measures-overview-container">
      <h2>Alle anbefalte tiltak</h2>

      {companyInfo && (
        <div className="company-context-panel">
          <p>
            Tiltakene nedenfor er relevante for{" "}
            <strong>{companyInfo.companyName}</strong>, en{" "}
            <strong>{companyInfo.industry.toLowerCase()}</strong> virksomhet med{" "}
            <strong>{companyInfo.employeeCount}</strong> ansatte.
          </p>
        </div>
      )}

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

      <div className="measures-list">
        {filteredMeasures.length > 0 ? (
          filteredMeasures.map((measure) => (
            <div key={measure.id} className="measure-item">
              <div 
                className={`measure-card ${expandedMeasureId === measure.id ? 'expanded' : ''}`}
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
                    {getEmployeeSizeContext(measure, companyInfo.employeeCount)}
                  </div>
                )}

                <div className="measure-footer">
                  <div className="measure-category">{measure.category}</div>
                  {measure.implementationSteps && measure.implementationSteps.length > 0 && (
                    <div className="measure-expand-indicator">
                      {expandedMeasureId === measure.id ? "▲ Skjul implementeringsguide" : "▼ Vis implementeringsguide"}
                    </div>
                  )}
                </div>
              </div>

              {/* Implementeringsguide direkte under measure-card */}
              {expandedMeasureId === measure.id && measure.implementationSteps && (
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
                    Følg denne steg-for-steg-guiden for å implementere {measure.title.toLowerCase()} i din virksomhet.
                    Gjennomføring av alle stegene gir din bedrift +{measure.eloPoints || 0} ELO-poeng i sikkerhetsscore.
                  </p>
                  
                  <div className="implementation-steps">
                    {measure.implementationSteps.map((step, index) => (
                      <div key={index} className="implementation-step">
                        <div className="step-header">
                          <div className="step-number">{index + 1}</div>
                          <div className="step-title">{step.title}</div>
                          <button 
                            className={`step-complete-button ${step.completed ? 'completed' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation(); // Unngå at klikk på knappen også trigger toggleExpand
                              handleStepComplete(measure.id, index, !step.completed);
                            }}
                          >
                            {step.completed ? "Fullført" : "Merk som fullført"}
                          </button>
                        </div>
                        <p className="step-description">{step.description}</p>
                        
                        {step.details && (
                          <div className="step-details">
                            {step.details.map((detail, detailIndex) => (
                              <div key={detailIndex} className="step-detail-item">
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
  );
}

export default MeasuresOverview;
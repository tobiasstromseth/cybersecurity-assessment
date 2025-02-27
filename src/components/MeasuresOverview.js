// src/components/MeasuresOverview.js - Oppdatert med bedriftsinformasjon
import React, { useState } from "react";
import "../styles/components/MeasuresOverview.css";

function MeasuresOverview({ measures, companyInfo }) {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

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

      <div className="measures-grid">
        {filteredMeasures.length > 0 ? (
          filteredMeasures.map((measure) => (
            <div key={measure.id} className="measure-card">
              <div
                className="measure-priority"
                data-priority={measure.priority.toLowerCase()}
              >
                {measure.priority} prioritet
              </div>
              <h3>{measure.title}</h3>
              <p>{measure.description}</p>
              <div className="measure-reason">{measure.reason}</div>

              {companyInfo && (
                <div className="measure-context">
                  {getEmployeeSizeContext(measure, companyInfo.employeeCount)}
                </div>
              )}

              <div className="measure-category">{measure.category}</div>
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

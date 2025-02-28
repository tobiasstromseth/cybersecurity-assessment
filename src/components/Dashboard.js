// src/components/Dashboard.js - Oppdatert med bedriftsinformasjon og CSS-variabler
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

  // Bedriftsstørrelse til tekst
  const employeeSizeToText = (size) => {
    switch (size) {
      case "0-5":
        return "mikro";
      case "5-10":
        return "liten";
      case "10+":
        return "medium til stor";
      default:
        return "";
    }
  };

  // Anbefalinger basert på bransje
  const getIndustryRecommendation = (industry) => {
    switch (industry) {
      case "IT og Teknologi":
        return "Som teknologibedrift bør dere fokusere ekstra på utviklersikkerhet, kildekodebeskyttelse og API-sikkerhet.";
      case "Helse og Omsorg":
        return "Helsesektoren håndterer sensitive personopplysninger og må fokusere spesielt på personvern, GDPR-etterlevelse og sikker datalagring.";
      case "Finans og Forsikring":
        return "Finanssektoren er et attraktivt mål for cyberkriminelle. Fokuser spesielt på streng tilgangskontroll, nettverkssegmentering og kontinuerlig overvåkning.";
      case "Detaljhandel":
        return "Retailbransjen bør fokusere på betalingssikkerhet (PCI DSS), sikkerhet på salgssted, og beskyttelse av kundedata.";
      case "Produksjon":
        return "Produksjonsbedrifter bør prioritere sikkerhet for industrielle kontrollsystemer, OT-sikkerhet og integrasjon med IT-systemer.";
      case "Utdanning":
        return "Utdanningsinstitusjoner bør fokusere på balansen mellom åpen tilgang og beskyttelse av institusjonens data og sensitiv forskning.";
      case "Offentlig sektor":
        return "Offentlige virksomheter skal beskytte viktige samfunnstjenester og bør fokusere spesielt på etterlevelse av sikkerhetsrammeverk som ISO 27001 og NSMs grunnprinsipper.";
      case "Transport og Logistikk":
        return "Logistikkbransjen bør fokusere på sikkerhet i forsyningskjeden, integritet i sporing og høy tilgjengelighet for kritiske systemer.";
      case "Bygg og Anlegg":
        return "Byggebransjen bør fokusere på sikkerhet for prosjektdata, tegninger og sikkerhetskopier av verdifull dokumentasjon.";
      default:
        return "Uavhengig av bransje er det viktig å beskytte sensitiv informasjon, sikre IT-systemer og trene ansatte i sikker bruk av teknologi.";
    }
  };

  // Anbefalinger basert på størrelse
  const getSizeRecommendation = (size) => {
    switch (size) {
      case "0-5":
        return "For små bedrifter er det viktig å velge skyløsninger med innebygd sikkerhet og implementere grunnleggende sikkerhetstiltak med begrensede ressurser.";
      case "5-10":
        return "Med denne størrelsen bør dere begynne å formalisere sikkerhetspolicyer og vurdere å dedikere ressurser til cybersikkerhet, eventuelt gjennom outsourcing.";
      case "10+":
        return "Større organisasjoner bør ha tydelige ansvarsområder for cybersikkerhet, formaliserte prosesser og jevnlige sikkerhetsøvelser.";
      default:
        return "";
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Din Sikkerhetsvurdering</h2>
        <p>
          Basert på dine svar har vi analysert din organisasjons sikkerhetsnivå.
          Din poengsum er på en skala fra 0-100:
        </p>
      </div>

      {companyInfo && (
        <div className="company-summary-card">
          <h3>Bedriftsinformasjon</h3>
          <p>
            <strong>Bedrift:</strong> {companyInfo.companyName}
          </p>
          <p>
            <strong>Bransje:</strong> {companyInfo.industry}
          </p>
          <p>
            <strong>Antall ansatte:</strong> {companyInfo.employeeCount}{" "}
            (klassifisert som {employeeSizeToText(companyInfo.employeeCount)}{" "}
            virksomhet)
          </p>

          <div className="industry-recommendations">
            <h4>Bransjetilpassede anbefalinger:</h4>
            <p>{getIndustryRecommendation(companyInfo.industry)}</p>
            <p>{getSizeRecommendation(companyInfo.employeeCount)}</p>
          </div>
        </div>
      )}

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
                stroke="var(--border)"
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
                fill="var(--text-primary)"
                fontSize="32"
                fontWeight="bold"
              >
                {roundedScore}
              </text>
              <text
                x="100"
                y="125"
                textAnchor="middle"
                fill="var(--text-secondary)"
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
                <span className="score-indicator" style={{ backgroundColor: "var(--status-success)" }}></span> 
                70-100: God sikkerhet
              </li>
              <li>
                <span className="score-indicator" style={{ backgroundColor: "var(--status-warning)" }}></span> 
                40-69: Middels sikkerhet
              </li>
              <li>
                <span className="score-indicator" style={{ backgroundColor: "var(--status-danger)" }}></span> 
                0-39: Svak sikkerhet
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
              <div 
                key={measure.id} 
                className="measure-card"
                style={{ 
                  borderLeft: `4px solid ${measure.priority.toLowerCase() === "høy" 
                    ? "var(--status-danger)" 
                    : measure.priority.toLowerCase() === "medium" 
                      ? "var(--status-warning)" 
                      : "var(--status-success)"}`
                }}
              >
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
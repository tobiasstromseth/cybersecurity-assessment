// src/App.js - Oppdatert med mørkt tema-støtte
import React, { useState, useEffect } from "react";
import "./styles/index.css"; // Importer Claude-farger
import Questionnaire from "./components/Questionnaire";
import Dashboard from "./components/Dashboard";
import MeasuresOverview from "./components/MeasuresOverview";
import StartPage from "./components/StartPage";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [currentPage, setCurrentPage] = useState("start");
  const [answers, setAnswers] = useState({});
  const [securityScore, setSecurityScore] = useState(0);
  const [priorityMeasures, setPriorityMeasures] = useState([]);
  const [allMeasures, setAllMeasures] = useState([]);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [measuresProgress, setMeasuresProgress] = useState({});

  // Sjekk om brukeren har lagret et tema-valg og bruk det ved oppstart
  useEffect(() => {
    const savedTheme = localStorage.getItem("preferredTheme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark-theme");
    }
  }, []);

  // Legg til i App.js, rett etter din eksisterende useEffect for å beregne sikkerhetsscore
useEffect(() => {
  let totalEloPoints = 0;
  
  allMeasures.forEach(measure => {
    if (measure.implementationSteps) {
      // Sjekk om alle steg er fullført
      const allStepsCompleted = measure.implementationSteps.every(step => step.completed);
      
      if (allStepsCompleted) {
        totalEloPoints += measure.eloPoints || 0;
      }
    }
  });
  
  // Oppdater sikkerhetsscoren basert på ELO-poeng
  // Dette kan kombineres med din eksisterende scoreberegning
  setSecurityScore(prevScore => prevScore + totalEloPoints);
}, [allMeasures]);

  // Bytte mellom lyst og mørkt tema
  const toggleTheme = () => {
    if (isDarkMode) {
      document.body.classList.remove("dark-theme");
      localStorage.setItem("preferredTheme", "light");
    } else {
      document.body.classList.add("dark-theme");
      localStorage.setItem("preferredTheme", "dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  // Funksjon for å beregne sikkerhetsscore og tiltak basert på svar
  const calculateResults = (answers) => {
    // Mer detaljert beregning av sikkerhetsscore
    let score = 0;
    let possiblePoints = 0;
    let scoreBreakdown = {};

    // Vekting av spørsmål (noen spørsmål er viktigere enn andre)
    const questionWeights = {
      q1: 1.2, // Totrinnsverifisering er svært viktig
      q2: 1.0, // Sikkerhetsopplæring
      q3: 1.5, // Sikkerhetskopiering er kritisk
      q4: 1.3, // Programvareoppdateringer
      q5: 1.1, // Brannmur
    };

    Object.keys(answers).forEach((key) => {
      const value = answers[key];
      const weight = questionWeights[key] || 1.0;
      const maxPointsForQuestion = 10 * weight;
      possiblePoints += maxPointsForQuestion;

      let pointsEarned = 0;
      if (value === "ja") {
        pointsEarned = maxPointsForQuestion;
      } else if (value === "delvis") {
        pointsEarned = maxPointsForQuestion * 0.5;
      }

      score += pointsEarned;

      // Lagre poengfordeling for hvert spørsmål (kan brukes for detaljert visualisering)
      scoreBreakdown[key] = {
        score: pointsEarned,
        maxScore: maxPointsForQuestion,
        percent: (pointsEarned / maxPointsForQuestion) * 100,
      };
    });

    const calculatedScore = (score / possiblePoints) * 100;
    setSecurityScore(calculatedScore);

    // Generer tiltak basert på svar
    const measures = [];

    if (answers["q1"] !== "ja") {
      measures.push({
        id: 1,
        title: "Implementer totrinnsverifisering",
        description:
          "Sett opp totrinnsverifisering for alle brukere for å styrke påloggingssikkerheten.",
        priority: answers["q1"] === "nei" ? "Høy" : "Medium",
        category: "Identitets- og tilgangsstyring",
      });
    }

    if (answers["q2"] !== "ja") {
      measures.push({
        id: 2,
        title: "Etabler sikkerhetsopplæring",
        description:
          "Gjennomfør regelmessig sikkerhetsopplæring for alle ansatte.",
        priority: answers["q2"] === "nei" ? "Høy" : "Medium",
        category: "Opplæring og bevisstgjøring",
      });
    }

    if (answers["q3"] !== "ja") {
      measures.push({
        id: 3,
        title: "Implementer sikkerhetskopiering",
        description:
          "Sett opp automatisk sikkerhetskopiering av alle kritiske systemer og data.",
        priority: answers["q3"] === "nei" ? "Høy" : "Medium",
        category: "Datahåndtering",
      });
    }

    if (answers["q4"] !== "ja") {
      measures.push({
        id: 4,
        title: "Oppdater programvare",
        description:
          "Etabler rutiner for regelmessig oppdatering av all programvare.",
        priority: answers["q4"] === "nei" ? "Høy" : "Medium",
        category: "Sårbarhetsadministrasjon",
      });
    }

    if (answers["q5"] !== "ja") {
      measures.push({
        id: 5,
        title: "Implementer brannmur",
        description:
          "Sett opp og konfigurer en brannmur for å beskytte nettverket.",
        priority: answers["q5"] === "nei" ? "Høy" : "Medium",
        category: "Nettverkssikkerhet",
      });
    }

    // Sorter tiltak etter prioritet
    const sortedMeasures = [...measures].sort((a, b) => {
      if (a.priority === "Høy" && b.priority !== "Høy") return -1;
      if (a.priority !== "Høy" && b.priority === "Høy") return 1;
      return 0;
    });

    // Legger til ytterligere forklaringer for hvert tiltak
    const measuresWithReasons = sortedMeasures.map((measure) => {
      let reason = "";
      let eloPoints = 0;
      let implementationSteps = [];
      
      switch (measure.id) {
        case 1:
          reason = "Totrinnsverifisering kan forhindre 99% av automatiserte angrep og gjør det betydelig vanskeligere for hackere å få tilgang til kontoer.";
          eloPoints = 40;
          implementationSteps = [
            {
              title: "Last ned programvare for administrasjon",
              description: "Last ned og installer sentralisert programvare for å håndtere totrinnsbekreftelse for alle kontoer.",
              completed: false,
              details: [
                "Gå til leverandørens nettsted, opprett en konto hvis nødvendig og last ned administrasjonsverktøyet.",
                "Installer på en server eller PC som vil fungere som kontrollpunkt."
              ]
            },
            {
              title: "Kartlegg viktige kontoer",
              description: "Lag en liste over alle viktige brukere og kontoer som skal ha totrinnsbekreftelse.",
              completed: false,
              details: [
                "Inkluder e-postkontoer, tilganger til skytjenester, administrative kontoer og VPN-tilganger.",
                "Prioriter basert på hvilke kontoer som har mest privilegier eller tilgang til sensitiv informasjon."
              ]
            },
            {
              title: "Velg autentiseringsmetode",
              description: "Bestem hvilken form for totrinnsbekreftelse som passer best for din bedrift.",
              completed: false,
              details: [
                "Du kan velge mellom SMS-koder, e-postkoder, dedikerte app-genererte koder (som Google Authenticator, Microsoft Authenticator) eller fysiske sikkerhetsøkler (som YubiKey)."
              ]
            },
            {
              title: "Konfigurer løsningen",
              description: "Sett opp totrinnsbekreftelse i sentralisert administrasjonssystem.",
              completed: false,
              details: [
                "Følg leverandørens veiledning for konfigurasjon. Sørg for at du setter gode standardinnstillinger som balanserer sikkerhet og brukervennlighet."
              ]
            }
          ];
          break;
        case 2:
          reason = "Menneskelige feil står bak 95% av alle sikkerhetsbrudd. Regelmessig opplæring reduserer denne risikoen betydelig.";
          eloPoints = 35;
          implementationSteps = [
            {
              title: "Definer opplæringsbehov",
              description: "Identifiser hvilke sikkerhetsemner som er mest relevante for din organisasjon.",
              completed: false,
              details: [
                "Vanlige emner inkluderer phishing-gjenkjenning, passordrutiner, sikker databehandling, og rapportering av hendelser.",
                "Tilpass innholdet basert på bedriftens størrelse og risikoprofil."
              ]
            },
            {
              title: "Velg opplæringsformat",
              description: "Bestem hvordan opplæringen skal gjennomføres.",
              completed: false,
              details: [
                "For små bedrifter kan månedlige sikkerhetsmøter være effektivt.",
                "Vurder online kurs, webinarer, eller eksterne opplæringsressurser."
              ]
            },
            {
              title: "Lag en opplæringsplan",
              description: "Utvikle en årlig plan for sikkerhetsopplæring.",
              completed: false,
              details: [
                "Sett opp en tidsplan for regelmessige opplæringsøkter.",
                "Inkluder både grunnleggende og avanserte emner."
              ]
            },
            {
              title: "Gjennomfør opplæring",
              description: "Start med grunnleggende sikkerhetsopplæring for alle ansatte.",
              completed: false,
              details: [
                "Sørg for at all opplæring dokumenteres.",
                "Vurder å teste kunnskapen etter opplæringen."
              ]
            }
          ];
          break;
        case 3:
          reason = "I tilfelle et ransomware-angrep eller datakorrupsjon er sikkerhetskopier avgjørende for å kunne gjenopprette virksomheten raskt.";
          eloPoints = 45;
          implementationSteps = [
            {
              title: "Kartlegg kritiske data",
              description: "Identifiser hvilke data som er kritiske for virksomheten og må sikres.",
              completed: false,
              details: [
                "Fokuser på forretningskritiske systemer, kundedata, og økonomisk informasjon.",
                "Vurder lovkrav for oppbevaring av data (f.eks. regnskap, personopplysninger)."
              ]
            },
            {
              title: "Velg sikkerhetskopieringsløsning",
              description: "Velg en løsning som passer virksomhetens behov og budsjett.",
              completed: false,
              details: [
                "For små bedrifter kan skybaserte løsninger være kostnadseffektive.",
                "Større bedrifter bør vurdere hybride løsninger med både lokal og skybasert backup."
              ]
            },
            {
              title: "Definer backup-rutiner",
              description: "Bestem hvor ofte data skal sikkerhetskopieres og hvor lenge kopier skal oppbevares.",
              completed: false,
              details: [
                "Implementer 3-2-1-regelen: 3 kopier, 2 forskjellige lagringsmedier, 1 offsite.",
                "Definer RTO (Recovery Time Objective) og RPO (Recovery Point Objective)."
              ]
            },
            {
              title: "Test gjenoppretting",
              description: "Verifiser at sikkerhetskopiene fungerer ved å teste gjenoppretting regelmessig.",
              completed: false,
              details: [
                "Test fullstendig gjenoppretting minst én gang i året.",
                "Dokumenter gjenopprettingsprosedyren."
              ]
            }
          ];
          break;
        // ... osv for case 4 og 5
        case 4:
          reason = "Utdatert programvare inneholder ofte kjente sårbarheter som angripere kan utnytte. Oppdaterte systemer beskytter mot disse.";
          eloPoints = 30;
          implementationSteps = [
            {
              title: "Lag oversikt over programvare",
              description: "Kartlegg all programvare som brukes i virksomheten.",
              completed: false,
              details: [
                "Inkluder operativsystemer, applikasjoner, og firmware.",
                "Noter versjoner og når siste oppdatering ble gjort."
              ]
            },
            {
              title: "Etabler oppdateringsrutiner",
              description: "Definer faste rutiner for når og hvordan oppdateringer skal gjennomføres.",
              completed: false,
              details: [
                "For kritiske sikkerhetsoppdateringer: Implementer innen 48 timer.",
                "For andre oppdateringer: Implementer månedlig etter testing."
              ]
            },
            {
              title: "Konfigurer automatiske oppdateringer",
              description: "Aktiver automatiske oppdateringer der det er mulig.",
              completed: false,
              details: [
                "Prioriter sikkerhetskritiske systemer.",
                "Vurder å teste oppdateringer i et testmiljø før produksjon for kritiske systemer."
              ]
            },
            {
              title: "Følg opp utdatert programvare",
              description: "Identifiser og erstatt programvare som ikke lenger støttes av leverandøren.",
              completed: false,
              details: [
                "Programmer som ikke lenger mottar sikkerhetsoppdateringer utgjør en betydelig risiko.",
                "Planlegg for utfasing og migrasjon til støttede alternativer."
              ]
            }
          ];
          break;
        case 5:
          reason = "En brannmur er den første forsvarslinjen mot uautorisert tilgang til nettverket ditt og kan blokkere mange automatiserte angrep.";
          eloPoints = 35;
          implementationSteps = [
            {
              title: "Velg brannmurløsning",
              description: "Velg en brannmurløsning som passer virksomhetens størrelse og behov.",
              completed: false,
              details: [
                "For små bedrifter: Start med en god nettverksruter med brannmurfunksjonalitet.",
                "For større bedrifter: Vurder dedikerte brannmurenheter eller UTM-løsninger (Unified Threat Management)."
              ]
            },
            {
              title: "Implementer grunnleggende konfigurasjon",
              description: "Sett opp grunnleggende brannmurregler basert på minste privilegiums prinsipp.",
              completed: false,
              details: [
                "Blokker all innkommende trafikk som standard, og åpne kun for nødvendige tjenester.",
                "Konfigurer logging for å fange opp blokkerte forsøk."
              ]
            },
            {
              title: "Definer avanserte regler",
              description: "Implementer mer detaljerte regler basert på virksomhetens behov.",
              completed: false,
              details: [
                "Vurder å segmentere nettverket for å isolere sensitive systemer.",
                "Implementer applikasjonsfiltrering for mer presis kontroll."
              ]
            },
            {
              title: "Overvåk og vedlikehold",
              description: "Etabler rutiner for regelmessig gjennomgang og oppdatering av brannmurregler.",
              completed: false,
              details: [
                "Gjennomgå logger og blokkerte forsøk månedlig.",
                "Oppdater reglene når nye tjenester implementeres eller eksisterende fjernes."
              ]
            }
          ];
          break;
        default:
          reason = "Dette tiltaket vil betydelig forbedre din sikkerhetsstilling.";
          eloPoints = 20;
          implementationSteps = [];
      }
      
      return { ...measure, reason, eloPoints, implementationSteps };
    });

    setAllMeasures(measuresWithReasons);
    setPriorityMeasures(measuresWithReasons.slice(0, 3)); // Top 3 prioriterte tiltak
  };

  const handleCompanyInfoSubmit = (info) => {
    setCompanyInfo(info);
    setCurrentPage("questionnaire");
  };

  const handleAnswersSubmit = (answers) => {
    setAnswers(answers);
    calculateResults(answers);
    setCurrentPage("dashboard");
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleRestartAssessment = () => {
    // Beholder bedriftsinformasjonen, men nullstiller resten
    setAnswers({});
    setSecurityScore(0);
    setPriorityMeasures([]);
    setAllMeasures([]);
    setCurrentPage("questionnaire");
  };

  const handleEditCompanyInfo = () => {
    setCurrentPage("start");
  };
/*  */ 
  const updateMeasureProgress = (measureId, stepIndex, isComplete) => {
    // Oppdater allMeasures med den nye statusen
    setAllMeasures(prevMeasures => 
      prevMeasures.map(measure => {
        if (measure.id === measureId && measure.implementationSteps) {
          const updatedSteps = [...measure.implementationSteps];
          updatedSteps[stepIndex] = {
            ...updatedSteps[stepIndex],
            completed: isComplete
          };
          
          return {
            ...measure,
            implementationSteps: updatedSteps
          };
        }
        return measure;
      })
    );
    
    // Lagre fremgang (kan brukes for persistent lagring senere)
    setMeasuresProgress(prev => ({
      ...prev,
      [measureId]: {
        ...prev[measureId],
        [stepIndex]: isComplete
      }
    }));
    
    console.log(`Steg ${stepIndex + 1} for tiltak ${measureId} er nå ${isComplete ? 'fullført' : 'ikke fullført'}`);
  };

  return (
    <div className="app-container">
      <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      <header className="app-header">
        <h1>Cybersikkerhets Vurderingsverktøy</h1>
        {companyInfo && currentPage !== "start" && (
          <div className="company-info-display">
            <p>
              {companyInfo.companyName} | {companyInfo.industry} |{" "}
              {companyInfo.employeeCount} ansatte
            </p>
            <button
              className="edit-info-button"
              onClick={handleEditCompanyInfo}
              title="Rediger bedriftsinformasjon"
            >
              ✏️
            </button>
          </div>
        )}
        {currentPage !== "start" && (
          <nav>
            <button
              className={currentPage === "questionnaire" ? "active" : ""}
              onClick={() => handleNavigate("questionnaire")}
              disabled={currentPage === "start"}
            >
              Spørsmål
            </button>
            <button
              className={currentPage === "dashboard" ? "active" : ""}
              onClick={() => handleNavigate("dashboard")}
              disabled={Object.keys(answers).length === 0}
            >
              Dashboard
            </button>
            <button
              className={currentPage === "measures" ? "active" : ""}
              onClick={() => handleNavigate("measures")}
              disabled={Object.keys(answers).length === 0}
            >
              Alle tiltak
            </button>
            {Object.keys(answers).length > 0 && (
              <button
                className="restart-button"
                onClick={handleRestartAssessment}
              >
                Start ny vurdering
              </button>
            )}
          </nav>
        )}
      </header>

      <main>
        {currentPage === "start" && (
          <StartPage
            onComplete={handleCompanyInfoSubmit}
            savedCompanyInfo={companyInfo}
          />
        )}

        {currentPage === "questionnaire" && (
          <Questionnaire onSubmit={handleAnswersSubmit} />
        )}

        {currentPage === "dashboard" && (
          <Dashboard
            securityScore={securityScore}
            priorityMeasures={priorityMeasures}
            onViewAllMeasures={() => handleNavigate("measures")}
            companyInfo={companyInfo}
          />
        )}

{currentPage === "measures" && (
  <MeasuresOverview 
    measures={allMeasures} 
    companyInfo={companyInfo}
    updateMeasureProgress={updateMeasureProgress}
  />
)}
      </main>

      <footer>
        <p>© 2025 Cybersikkerhets Vurderingsverktøy</p>
      </footer>
    </div>
  );
}

export default App;

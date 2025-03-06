// src/App.js - Oppdatert med mørkt tema-støtte og ny siderekkefølge
import React, { useState, useEffect } from "react";
import "./styles/index.css"; // Importer Claude-farger
import Questionnaire from "./components/QuestionCard";
import Dashboard from "./components/Dashboard";
import MeasuresOverview from "./components/MeasuresOverview";
import StartPage from "./components/StartPage";
import StartInfo from "./components/startInfo.js";
import ThemeToggle from "./components/ThemeToggle";

// Funksjon for å lese sikkerhetstiltak fra JSON-fil
async function loadSecurityMeasures() {
  try {
    // Les JSON-filen
    const response = await fetch('../testDatabase/securityMeasures.json');
    const data = await response.json();
    return data.measures;
  } catch (error) {
    console.error('Feil ved innlasting av sikkerhetstiltak:', error);
    return [];
  }
}

function App() {
  const [currentPage, setCurrentPage] = useState("startInfo");
  const [answers, setAnswers] = useState({});
  const [securityScore, setSecurityScore] = useState(0);
  const [priorityMeasures, setPriorityMeasures] = useState([]);
  const [allMeasures, setAllMeasures] = useState([]);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [measuresProgress, setMeasuresProgress] = useState({});
  const [navOpen, setNavOpen] = useState(false);

  // Sjekk om brukeren har lagret et tema-valg og bruk det ved oppstart
  useEffect(() => {
    const savedTheme = localStorage.getItem("preferredTheme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark-theme");
    }
  }, []);

  // Lukk navigasjonsmenyen når siden endres
  useEffect(() => {
    setNavOpen(false);
  }, [currentPage]);

  // Lukk menyen når det klikkes utenfor
  useEffect(() => {
    const handleClickOutside = (event) => {
      const nav = document.querySelector('nav');
      const hamburger = document.querySelector('.hamburger-menu');
      
      if (navOpen && nav && hamburger && 
          !nav.contains(event.target) && 
          !hamburger.contains(event.target)) {
        setNavOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navOpen]);

  // Beregn sikkerhetsscore basert på fullførte tiltak
  useEffect(() => {
    let totalSecurityPoints = 0;
    
    allMeasures.forEach(measure => {
      if (measure.implementationSteps) {
        // Sjekk om alle steg er fullført
        const allStepsCompleted = measure.implementationSteps.every(step => step.completed);
        
        if (allStepsCompleted) {
          totalSecurityPoints += measure.weight || 0; // Bruk weight i stedet for eloPoints
        }
      }
    });
    
    // Oppdater sikkerhetsscoren basert på sikkerhetspoeng
    setSecurityScore(prevScore => prevScore + totalSecurityPoints);
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

  // Noe med hamburgermeny
  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  // Funksjon for å beregne sikkerhetsscore og tiltak basert på svar
  const calculateResults = async (answers) => {
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

    try {
      // Last inn alle sikkerhetstiltak
      const measuresData = await loadSecurityMeasures();

      // Generer tiltak basert på svar
      const measures = [];

      // Mapper spørsmålsnummer til tiltaks-ID
      const questionToMeasureMap = {
        q1: 1, // Totrinnsverifisering
        q2: 2, // Sikkerhetsopplæring
        q3: 3, // Sikkerhetskopier
        q4: 4, // Programvareoppdateringer
        q5: 5  // Brannmur
      };

      // Gå gjennom alle svarene
      Object.keys(answers).forEach(questionKey => {
        const value = answers[questionKey];
        
        // Legg bare til tiltak som ikke allerede er implementert
        if (value !== "ja") {
          const measureId = questionToMeasureMap[questionKey];
          const measureInfo = measuresData.find(m => m.id === measureId);
          
          if (measureInfo) {
            measures.push({
              id: measureId,
              title: measureInfo.title,
              description: measureInfo.description,
              priority: value === "nei" ? "Høy" : "Medium",
              category: measureInfo.category
            });
          }
        }
      });

      // Sorter tiltak etter prioritet
      const sortedMeasures = [...measures].sort((a, b) => {
        if (a.priority === "Høy" && b.priority !== "Høy") return -1;
        if (a.priority !== "Høy" && b.priority === "Høy") return 1;
        return 0;
      });

      // Berik tiltakene med detaljert informasjon
      const measuresWithDetails = sortedMeasures.map((measure) => {
        // Finn det tilsvarende detaljerte tiltaket fra JSON-dataen
        const detailedMeasure = measuresData.find(m => m.id === measure.id);
        
        if (detailedMeasure) {
          return {
            ...measure,
            name: detailedMeasure.name,
            reason: detailedMeasure.reason,
            weight: detailedMeasure.weight,
            implementationSteps: detailedMeasure.implementationSteps
          };
        }
        
        // Fallback hvis tiltaket ikke finnes i JSON-dataen
        return {
          ...measure,
          reason: "Dette tiltaket vil betydelig forbedre din sikkerhetsstilling.",
          weight: 20,
          implementationSteps: []
        };
      });

      setAllMeasures(measuresWithDetails);
      setPriorityMeasures(measuresWithDetails.slice(0, 3)); // Top 3 prioriterte tiltak
    } catch (error) {
      console.error("Feil ved lasting av sikkerhetstiltak:", error);
      // Fallback hvis JSON-lasting feiler - oppretter enkel liste av tiltak
      const measures = [];
      
      if (answers["q1"] !== "ja") {
        measures.push({
          id: 1,
          title: "Implementer totrinnsverifisering",
          description: "Sett opp totrinnsverifisering for alle brukere for å styrke påloggingssikkerheten.",
          priority: answers["q1"] === "nei" ? "Høy" : "Medium",
          category: "Identitets- og tilgangsstyring",
        });
      }

      if (answers["q2"] !== "ja") {
        measures.push({
          id: 2,
          title: "Etabler sikkerhetsopplæring",
          description: "Gjennomfør regelmessig sikkerhetsopplæring for alle ansatte.",
          priority: answers["q2"] === "nei" ? "Høy" : "Medium",
          category: "Opplæring og bevisstgjøring",
        });
      }

      if (answers["q3"] !== "ja") {
        measures.push({
          id: 3,
          title: "Implementer sikkerhetskopiering",
          description: "Sett opp automatisk sikkerhetskopiering av alle kritiske systemer og data.",
          priority: answers["q3"] === "nei" ? "Høy" : "Medium",
          category: "Datahåndtering",
        });
      }

      if (answers["q4"] !== "ja") {
        measures.push({
          id: 4,
          title: "Oppdater programvare",
          description: "Etabler rutiner for regelmessig oppdatering av all programvare.",
          priority: answers["q4"] === "nei" ? "Høy" : "Medium",
          category: "Sårbarhetsadministrasjon",
        });
      }

      if (answers["q5"] !== "ja") {
        measures.push({
          id: 5,
          title: "Implementer brannmur",
          description: "Sett opp og konfigurer en brannmur for å beskytte nettverket.",
          priority: answers["q5"] === "nei" ? "Høy" : "Medium",
          category: "Nettverkssikkerhet",
        });
      }

      // Sorter tiltakene etter prioritet
      const sortedMeasures = [...measures].sort((a, b) => {
        if (a.priority === "Høy" && b.priority !== "Høy") return -1;
        if (a.priority !== "Høy" && b.priority === "Høy") return 1;
        return 0;
      });

      setAllMeasures(sortedMeasures);
      setPriorityMeasures(sortedMeasures.slice(0, 3));
    }
  };

  const handleStartInfoComplete = () => {
    setCurrentPage("start");
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
      <header className="app-header">
        <div className="left-section-header">
          <h1>LIGHTWEIGHT CYBERSECURITY</h1>
          
          {currentPage !== "startInfo" && currentPage !== "start" && (
            <nav className={navOpen ? "open" : ""}>
              <button
                className={currentPage === "dashboard" ? "active" : ""}
                onClick={() => handleNavigate("dashboard")}
                disabled={Object.keys(answers).length === 0}
              >
                Hjem
              </button>
              <button
                className={currentPage === "measures" ? "active" : ""}
                onClick={() => handleNavigate("measures")}
                disabled={Object.keys(answers).length === 0}
              >
                Alle tiltak
              </button>
              <button>Data</button>
              {Object.keys(answers).length > 0 && (
                <button
                  className="restart-button"
                  onClick={handleRestartAssessment}
                >
                  Ny vurdering
                </button>
              )}
              
              {/* ThemeToggle i mobil-visning */}
              <div className="mobile-theme-toggle">
                <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
              </div>
            </nav>
          )}
        </div>
        
        <div className="right-section-header">
          {/* Hamburger-meny for mobil */}
          {currentPage !== "startInfo" && currentPage !== "start" && (
            <div className="hamburger-menu" onClick={toggleNav}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
          
          {/* ThemeToggle i desktop-visning */}
          <div className="desktop-theme-toggle">
            <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
          </div>
        </div>
      </header>

      <main>
        {currentPage === "startInfo" && (
          <StartInfo onComplete={handleStartInfoComplete} />
        )}

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
        <p>© 2025 Lorem Ipsum</p>
      </footer>
    </div>
  );
}

export default App;
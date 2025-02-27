// src/App.js
import React, { useState } from "react";
import "./styles/App.css";
import Questionnaire from "./components/Questionnaire";
import Dashboard from "./components/Dashboard";
import MeasuresOverview from "./components/MeasuresOverview";

function App() {
  const [currentPage, setCurrentPage] = useState("questionnaire");
  const [answers, setAnswers] = useState({});
  const [securityScore, setSecurityScore] = useState(0);
  const [priorityMeasures, setPriorityMeasures] = useState([]);
  const [allMeasures, setAllMeasures] = useState([]);

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
      switch (measure.id) {
        case 1:
          reason =
            "Totrinnsverifisering kan forhindre 99% av automatiserte angrep og gjør det betydelig vanskeligere for hackere å få tilgang til kontoer.";
          break;
        case 2:
          reason =
            "Menneskelige feil står bak 95% av alle sikkerhetsbrudd. Regelmessig opplæring reduserer denne risikoen betydelig.";
          break;
        case 3:
          reason =
            "I tilfelle et ransomware-angrep eller datakorrupsjon er sikkerhetskopier avgjørende for å kunne gjenopprette virksomheten raskt.";
          break;
        case 4:
          reason =
            "Utdatert programvare inneholder ofte kjente sårbarheter som angripere kan utnytte. Oppdaterte systemer beskytter mot disse.";
          break;
        case 5:
          reason =
            "En brannmur er den første forsvarslinjen mot uautorisert tilgang til nettverket ditt og kan blokkere mange automatiserte angrep.";
          break;
        default:
          reason =
            "Dette tiltaket vil betydelig forbedre din sikkerhetsstilling.";
      }
      return { ...measure, reason };
    });

    setAllMeasures(measuresWithReasons);
    setPriorityMeasures(measuresWithReasons.slice(0, 3)); // Top 3 prioriterte tiltak
  };

  const handleAnswersSubmit = (answers) => {
    setAnswers(answers);
    calculateResults(answers);
    setCurrentPage("dashboard");
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Cybersikkerhets Vurderingsverktøy</h1>
        <nav>
          <button
            className={currentPage === "questionnaire" ? "active" : ""}
            onClick={() => handleNavigate("questionnaire")}
            disabled={
              Object.keys(answers).length === 0 &&
              currentPage !== "questionnaire"
            }
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
        </nav>
      </header>

      <main>
        {currentPage === "questionnaire" && (
          <Questionnaire onSubmit={handleAnswersSubmit} />
        )}

        {currentPage === "dashboard" && (
          <Dashboard
            securityScore={securityScore}
            priorityMeasures={priorityMeasures}
            onViewAllMeasures={() => handleNavigate("measures")}
          />
        )}

        {currentPage === "measures" && (
          <MeasuresOverview measures={allMeasures} />
        )}
      </main>

      <footer>
        <p>© 2025 Cybersikkerhets Vurderingsverktøy</p>
      </footer>
    </div>
  );
}

export default App;

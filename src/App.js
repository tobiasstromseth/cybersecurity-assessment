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
    // Enkel beregning av sikkerhetsscore (kan utvides)
    let score = 0;
    let possiblePoints = 0;

    Object.keys(answers).forEach((key) => {
      const value = answers[key];
      possiblePoints += 10;

      if (value === "ja") {
        score += 10;
      } else if (value === "delvis") {
        score += 5;
      }
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

    setAllMeasures(sortedMeasures);
    setPriorityMeasures(sortedMeasures.slice(0, 3)); // Top 3 prioriterte tiltak
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

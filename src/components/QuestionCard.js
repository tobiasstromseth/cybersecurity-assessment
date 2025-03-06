// src/components/Questionnaire.js
import React, { useState } from "react";
import "../styles/components/Questionnaire.css";

const questions = [
  {
    id: "q1",
    text: "Bruker din organisasjon totrinnsverifisering for alle viktige systemer?",
    category: "Identitets- og tilgangsstyring",
    guide: [
      "Placeholder: Totrinnsverifisering gir et ekstra sikkerhetslag ved å kreve to ulike former for bekreftelse.",
      "Implementer totrinnsverifisering på alle systemer som inneholder sensitive data eller er kritiske for virksomheten.",
      "Vanlige metoder inkluderer SMS-koder, autentiseringsapper (som Google Authenticator) eller fysiske sikkerhetsnøkler.",
      "Start med prioriterte systemer som e-post, skylagring og økonomisystemer."
    ]
  },
  {
    id: "q2",
    text: "Gjennomfører dere regelmessig sikkerhetsopplæring for ansatte?",
    category: "Opplæring og bevisstgjøring",
    guide: [
      "PLACEHOLDER Sikkerhetsopplæring bør gjennomføres minst årlig, med ekstra opplæring ved endringer eller nye trusler.",
      "Opplæringen bør dekke passordpraksis, phishing-gjenkjenning, sikker internettbruk og håndtering av sensitive data.",
      "Vurder korte, regelmessige sikkerhetsoppdateringer fremfor lange, sjeldne kurs.",
      "Nye ansatte bør få grunnleggende sikkerhetsopplæring som del av introduksjonsprogrammet."
    ]
  },
  {
    id: "q3",
    text: "Har dere regelmessig sikkerhetskopiering av alle kritiske data?",
    category: "Datahåndtering",
    guide: [
      "PLAYSHOLDER Sikkerhetskopier bør tas minst ukentlig, ideelt sett daglig for kritiske data.",
      "Følg 3-2-1-regelen: Tre kopier av dataene, på to forskjellige medier, med én kopi lagret eksternt.",
      "Test regelmessig at sikkerhetskopier kan gjenopprettes korrekt.",
      "Automatiser sikkerhetskopieringsprosessen for å redusere risikoen for menneskelige feil."
    ]
  },
  {
    id: "q4",
    text: "Oppdateres all programvare og systemer regelmessig med sikkerhetsoppdateringer?",
    category: "Sårbarhetsadministrasjon",
    guide: [
      "PLaceHOLISTISK Installer sikkerhetsoppdateringer så raskt som mulig etter utgivelse, ideelt innen en uke.",
      "Opprett en liste over all programvare som brukes i organisasjonen og hvem som er ansvarlig for oppdateringer.",
      "Aktiver automatiske oppdateringer der det er mulig.",
      "Ha en plan for å håndtere oppdateringer som kan forårsake nedetid eller kompatibilitetsproblemer."
    ]
  },
  {
    id: "q5",
    text: "Har dere implementert brannmur og andre nettverkssikkerhetstiltak?",
    category: "Nettverkssikkerhet",
    guide: [
      "Placeholder: Brannmur bør være aktivert på alle enheter og konfigurert for å blokkere uautorisert trafikk.",
      "Bruk segmentering for å isolere sensitive deler av nettverket.",
      "Sikre trådløse nettverk med sterk kryptering (WPA2/WPA3) og unike, komplekse passord.",
      "Vurder å implementere VPN for sikker fjerntilgang til bedriftens nettverk."
    ]
  },
];

function Questionnaire({ onSubmit }) {
  const [answers, setAnswers] = useState({});

  const [showGuide, setShowGuide] = useState(false); // Steg for steg guide drop-down

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleAnswer = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowGuide(false); // Lukk guiden når vi går til neste spørsmål
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowGuide(false); // Lukk guiden når vi går til forrige spørsmål
    }
  };

  const toggleGuide = () => {
    setShowGuide(!showGuide);
  }; // Steg for steg guide

  const handleSubmit = () => {
    onSubmit(answers);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const hasAnsweredCurrentQuestion = answers[currentQuestion.id] !== undefined;
  const hasAnsweredAllQuestions = questions.every(
    (q) => answers[q.id] !== undefined
  );

  // Calculate progress percentage based on answered questions
  const answeredCount = Object.keys(answers).length;
  const progressPercentage = Math.round((answeredCount / questions.length) * 100);

  return (
    <div className="questionnaire-container">
      <div className="progress-bar-q">
        <div
          className="progress-q"
          style={{
            width: `${progressPercentage}%`,
          }}
        >
          {progressPercentage > 0 && (
            <span className="progress-text-q">{progressPercentage}%</span>
          )}
        </div>
      </div>

    <div className="question-card">
      <div className="question-category">{currentQuestion.category}</div>

      <div className="question-row">
        <p className="question-text">{currentQuestion.text}</p>
        <button 
          className={`guide-toggle-button ${showGuide ? 'active' : ''}`}
          onClick={toggleGuide}
          aria-expanded={showGuide}
        >
          {showGuide ? 'Skjul guide' : 'Vis guide'}
        </button>
      </div>
      
      {showGuide && (
        <div className="guide-container">
          <h4>Slik vurderer du dette spørsmålet:</h4>
          <ol className="guide-steps">
            {currentQuestion.guide.map((step, index) => (
              <li key={index} className="guide-step">{step}</li>
            ))}
          </ol>
        </div>
      )}

        <div className="answer-options">
          <button
            className={answers[currentQuestion.id] === "ja" ? "selected" : ""}
            onClick={() => handleAnswer(currentQuestion.id, "ja")}
          >
            Ja
          </button>
          <button
            className={
              answers[currentQuestion.id] === "delvis" ? "selected" : ""
            }
            onClick={() => handleAnswer(currentQuestion.id, "delvis")}
          >
            Delvis
          </button>
          <button
            className={answers[currentQuestion.id] === "nei" ? "selected" : ""}
            onClick={() => handleAnswer(currentQuestion.id, "nei")}
          >
            Nei
          </button>
        </div>

        <div className="navigation-buttons">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            Forrige
          </button>

          {!isLastQuestion ? (
            <button onClick={handleNext} disabled={!hasAnsweredCurrentQuestion}>
              Neste
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!hasAnsweredAllQuestions}
              className="submit-button"
            >
              Se resultater
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Questionnaire;
// app.js
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

// Inkluderer all CSS som en streng; denne injiseres dynamisk i <head>
const cssString = `
.cyber-assessment-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
.assessment-board {
  position: relative;
  transition: transform 1s;
  transform-style: preserve-3d;
}
.assessment-board.flipped {
  transform: rotateY(180deg);
}
.board-front, .board-back {
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.board-back {
  transform: rotateY(180deg);
}
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 20px;
}
.security-card {
  border: 1px solid #ccc;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.security-card.green { background-color: #d4edda; }
.security-card.light-green { background-color: #e8f5e9; }
.security-card.yellow { background-color: #fff3cd; }
.security-card.orange { background-color: #ffe0b2; }
.security-card.red { background-color: #f8d7da; }
.score-display {
  text-align: center;
  margin-bottom: 20px;
}
.score-circle {
  width: 100px;
  height: 100px;
  margin: 0 auto 10px;
  border-radius: 50%;
  background-color: #007bff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
}
.modal-content h3 {
  margin-top: 0;
}
`;

// Liste over de 15 baseline cybersikkerhetstiltakene med tilhørende spørsmål og egenskaper
const initialMeasures = [
  {
    id: 1,
    title: "Sterke Passord",
    description: "Bruk unike og komplekse passord for alle kontoer.",
    questions: [
      {
        question: "Bruker dere passordbehandler?",
        options: ["Ja", "Nei", "Delvis"]
      },
      {
        question: "Er passordene minst 12 tegn med blanding av tall, bokstaver og symboler?",
        options: ["Ja", "Nei", "Usikker"]
      }
    ],
    importance: 10,
    implemented: false,
    answers: []
  },
  {
    id: 2,
    title: "To-faktor Autentisering",
    description: "Aktiver to-faktor autentisering (2FA) der det er mulig.",
    questions: [
      {
        question: "Er 2FA aktivert på viktige kontoer?",
        options: ["Ja", "Nei", "Delvis"]
      }
    ],
    importance: 10,
    implemented: false,
    answers: []
  },
  {
    id: 3,
    title: "Programvareoppdateringer",
    description: "Hold all programvare og operativsystemer oppdatert.",
    questions: [
      {
        question: "Oppdateres system og programvare regelmessig?",
        options: ["Ja", "Nei", "Delvis"]
      }
    ],
    importance: 10,
    implemented: false,
    answers: []
  },
  {
    id: 4,
    title: "Sikkerhetskopiering",
    description: "Regelmessig backup av viktige data.",
    questions: [
      {
        question: "Foretas sikkerhetskopiering av kritiske data?",
        options: ["Ja", "Nei", "Delvis"]
      },
      {
        question: "Er sikkerhetskopiene testet for gjenoppretting?",
        options: ["Ja", "Nei", "Delvis"]
      }
    ],
    importance: 10,
    implemented: false,
    answers: []
  },
  {
    id: 5,
    title: "Antivirus/Antimalware",
    description: "Bruk oppdatert antivirus og antimalware.",
    questions: [
      {
        question: "Er antivirusprogramvare installert og oppdatert?",
        options: ["Ja", "Nei", "Delvis"]
      }
    ],
    importance: 10,
    implemented: false,
    answers: []
  },
  {
    id: 6,
    title: "Sikker Wi-Fi",
    description: "Sett opp og konfigurer et sikkert Wi-Fi nettverk.",
    questions: [
      {
        question: "Er Wi-Fi satt opp med sterkt passord og kryptering?",
        options: ["Ja", "Nei", "Delvis"]
      }
    ],
    importance: 10,
    implemented: false,
    answers: []
  },
  {
    id: 7,
    title: "Brannmur",
    description: "Aktiver og konfigurer brannmur på rutere og enheter.",
    questions: [
      {
        question: "Er brannmur aktivert på nettverksutstyret?",
        options: ["Ja", "Nei", "Delvis"]
      }
    ],
    importance: 10,
    implemented: false,
    answers: []
  },
  {
    id: 8,
    title: "Ansattopplæring",
    description: "Gi opplæring i cybersikkerhet til ansatte.",
    questions: [
      {
        question: "Har ansatte fått grunnleggende cybersikkerhet opplæring?",
        options: ["Ja", "Nei", "Delvis"]
      }
    ],
    importance: 10,
    implemented: false,
    answers: []
  },
  {
    id: 9,
    title: "Mobilsikkerhet",
    description: "Sørg for sikkerhet for mobile enheter.",
    questions: [
      {
        question: "Brukes enhetsspesifikke sikkerhetstiltak for mobile enheter?",
        options: ["Ja", "Nei", "Delvis"]
      }
    ],
    importance: 10,
    implemented: false,
    answers: []
  },
  {
    id: 10,
    title: "Tilgangskontroll",
    description: "Begrens tilgang til systemer basert på behov.",
    questions: [
      {
        question: "Er tilgangsrettighetene regelmessig gjennomgått og justert?",
        options: ["Ja", "Nei", "Delvis"]
      }
    ],
    importance: 10,
    implemented: false,
    answers: []
  },
  {
    id: 11,
    title: "Sikker e-post",
    description: "Implementer sikkerhetsprotokoller for e-post.",
    questions: [
      {
        question: "Er e-postfiltrering og spam-beskyttelse aktivert?",
        options: ["Ja", "Nei", "Delvis"]
      }
    ],
    importance: 10,
    implemented: false,
    answers: []
  },
  {
    id: 12,
    title: "Kryptering",
    description: "Bruk kryptering for sensitive data.",
    questions: [
      {
        question: "Er sensitive data kryptert både i ro og under overføring?",
        options: ["Ja", "Nei", "Delvis"]
      }
    ],
    importance: 10,
    implemented: false,
    answers: []
  },
  {
    id: 13,
    title: "Hendelsesrespons",
    description: "Ha en plan for sikkerhetshendelser og brudd.",
    questions: [
      {
        question: "Finnes det en dokumentert hendelsesresponsplan?",
        options: ["Ja", "Nei", "Delvis"]
      }
    ],
    importance: 10,
    implemented: false,
    answers: []
  },
  {
    id: 14,
    title: "Fysisk Sikkerhet",
    description: "Sørg for fysisk sikkerhet til enheter og systemer.",
    questions: [
      {
        question: "Er det fysiske sikkerhetstiltak for å beskytte utstyr?",
        options: ["Ja", "Nei", "Delvis"]
      }
    ],
    importance: 10,
    implemented: false,
    answers: []
  },
  {
    id: 15,
    title: "Leverandørsikkerhet",
    description: "Vurder sikkerhetstiltak hos dine leverandører.",
    questions: [
      {
        question: "Er leverandører vurdert og godkjent etter sikkerhetskriterier?",
        options: ["Ja", "Nei", "Delvis"]
      }
    ],
    importance: 10,
    implemented: false,
    answers: []
  }
];

const App = () => {
  const [measures, setMeasures] = useState(initialMeasures);
  const [selectedMeasure, setSelectedMeasure] = useState(null);
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const [score, setScore] = useState(0);

  // Injiser CSSen når komponenten mountes
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = cssString;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Starter spørsmålsfasen ved å sette valgt tiltak
  const handleCardClick = (id) => {
    if (!assessmentComplete) {
      const measure = measures.find(m => m.id === id);
      setSelectedMeasure(measure);
    }
  };

  // Oppdaterer svar for et spesifikt spørsmål i delt tiltak
  const handleAnswer = (questionIndex, answer) => {
    setSelectedMeasure(prev => {
      const newAnswers = prev.answers ? [...prev.answers] : [];
      newAnswers[questionIndex] = answer;
      return { ...prev, answers: newAnswers };
    });
  };

  // Ved innsending av svar, lagres svaret og undersøkes om alle tiltak er besvart.
  const handleSubmitMeasure = () => {
    if (
      !selectedMeasure.answers ||
      selectedMeasure.answers.length !== selectedMeasure.questions.length ||
      selectedMeasure.answers.some(a => !a)
    ) {
      alert("Vennligst svar på alle spørsmålene.");
      return;
    }
    const updatedMeasures = measures.map(m =>
      m.id === selectedMeasure.id ? selectedMeasure : m
    );
    setMeasures(updatedMeasures);
    setSelectedMeasure(null);

    const allAnswered = updatedMeasures.every(
      m => m.answers && m.answers.length === m.questions.length
    );
    if (allAnswered) {
      setAssessmentComplete(true);
      // Når alt er besvart (og før brukeren evt. markerer implementering),
      // kalkuleres score – initialt vil trolig ingen være implementert.
      calculateScore(updatedMeasures, true);
    } else {
      calculateScore(updatedMeasures, false);
    }
  };

  // Kalkulerer sikkerhetsscore basert på svar (under vurderingsfasen)
  // eller basert på implementeringsstatus (når vurderingen er fullført)
  const calculateScore = (measuresArray, isFinal) => {
    let totalPoints = 0;
    let maxPoints = 0;
    measuresArray.forEach(measure => {
      maxPoints += measure.importance;
      if (isFinal) {
        if (measure.implemented) totalPoints += measure.importance;
      } else {
        if (measure.answers) {
          let measureScore = 0;
          measure.answers.forEach(ans => {
            if (ans === "Ja") measureScore += measure.importance;
            else if (ans === "Delvis") measureScore += measure.importance * 0.5;
          });
          totalPoints += measureScore;
        }
      }
    });
    if (maxPoints > 0) {
      setScore(Math.round((totalPoints / maxPoints) * 100));
    }
  };

  // Når brukeren klikker på et tiltak i sluttfasen, toggles "implementert"
  const toggleImplementation = (id) => {
    const updatedMeasures = measures.map(m =>
      m.id === id ? { ...m, implemented: !m.implemented } : m
    );
    setMeasures(updatedMeasures);
    let totalPoints = updatedMeasures.reduce(
      (acc, m) => acc + (m.implemented ? m.importance : 0),
      0
    );
    let maxPoints = updatedMeasures.reduce((acc, m) => acc + m.importance, 0);
    setScore(Math.round((totalPoints / maxPoints) * 100));
  };

  // Fargevalg for hvert kort basert på svarskvaliteten,
  // med implementerte tiltak som alltid blir grønt.
  const getCardColor = (measure) => {
    if (measure.implemented) return "green";
    if (measure.answers && measure.answers.length > 0) {
      let scoreCount = measure.answers.reduce((acc, ans) => {
        if (ans === "Ja") return acc + 1;
        else if (ans === "Delvis") return acc + 0.5;
        return acc;
      }, 0);
      let ratio = scoreCount / measure.questions.length;
      if (ratio === 1) return "green";
      if (ratio >= 0.75) return "light-green";
      if (ratio >= 0.5) return "yellow";
      if (ratio >= 0.25) return "orange";
      return "red";
    }
    return "";
  };

  return (
    <div className="cyber-assessment-container">
      <div className={`assessment-board ${assessmentComplete ? 'flipped' : ''}`}>
        {/* Forside: Vurderingsfasen */}
        <div className="board-front">
          <h2>Cybersikkerhetsvurdering for Mikrobedrifter</h2>
          <div className="card-grid">
            {measures.map(measure => (
              <div
                key={measure.id}
                className="security-card"
                onClick={() => handleCardClick(measure.id)}
              >
                <h3>{measure.title}</h3>
                <p>{measure.description}</p>
                {measure.answers && measure.answers.length > 0 && (
                  <div className="answer-indicator">
                    {measure.answers.filter(a => a).length}/{measure.questions.length} besvart
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Bakside: Implementeringsfase og samlet score */}
        <div className="board-back">
          <h2>Din Cybersikkerhetsprofil</h2>
          <div className="score-display">
            <div className="score-circle">{score}</div>
            <p>Sikkerhetsscore</p>
          </div>
          <div className="card-grid">
            {measures.map(measure => (
              <div key={measure.id} className={`security-card ${getCardColor(measure)}`}>
                <h3>{measure.title}</h3>
                <p>{measure.description}</p>
                <div className="implementation-status">
                  <label>
                    <input
                      type="checkbox"
                      checked={measure.implemented}
                      onChange={() => toggleImplementation(measure.id)}
                    />
                    Implementert
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Modal for spørsmål og svar */}
      {selectedMeasure && (
        <div className="modal">
          <div className="modal-content">
            <h3>{selectedMeasure.title}</h3>
            {selectedMeasure.questions.map((question, index) => (
              <div key={index}>
                <p>{question.question}</p>
                <div>
                  {question.options.map((option, i) => (
                    <label key={i} style={{ marginRight: "10px" }}>
                      <input
                        type="radio"
                        name={`measure-${selectedMeasure.id}-q${index}`}
                        value={option}
                        checked={selectedMeasure.answers && selectedMeasure.answers[index] === option}
                        onChange={() => handleAnswer(index, option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={handleSubmitMeasure}>Lagre svar</button>
            <button onClick={() => setSelectedMeasure(null)}>Avbryt</button>
          </div>
        </div>
      )}
    </div>
  );
};

// Starter React‑applikasjonen
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(<App />);
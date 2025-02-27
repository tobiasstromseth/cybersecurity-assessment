// src/components/Questionnaire.js
import React, { useState } from "react";
import "../styles/components/Questionnaire.css";

const questions = [
  {
    id: "q1",
    text: "Bruker din organisasjon totrinnsverifisering for alle viktige systemer?",
    category: "Identitets- og tilgangsstyring",
  },
  {
    id: "q2",
    text: "Gjennomfører dere regelmessig sikkerhetsopplæring for ansatte?",
    category: "Opplæring og bevisstgjøring",
  },
  {
    id: "q3",
    text: "Har dere regelmessig sikkerhetskopiering av alle kritiske data?",
    category: "Datahåndtering",
  },
  {
    id: "q4",
    text: "Oppdateres all programvare og systemer regelmessig med sikkerhetsoppdateringer?",
    category: "Sårbarhetsadministrasjon",
  },
  {
    id: "q5",
    text: "Har dere implementert brannmur og andre nettverkssikkerhetstiltak?",
    category: "Nettverkssikkerhet",
  },
];

function Questionnaire({ onSubmit }) {
  const [answers, setAnswers] = useState({});
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
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(answers);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const hasAnsweredCurrentQuestion = answers[currentQuestion.id] !== undefined;
  const hasAnsweredAllQuestions = questions.every(
    (q) => answers[q.id] !== undefined
  );

  return (
    <div className="questionnaire-container">
      <div className="progress-bar">
        <div
          className="progress"
          style={{
            width: `${
              ((currentQuestionIndex + (hasAnsweredCurrentQuestion ? 1 : 0)) /
                questions.length) *
              100
            }%`,
          }}
        ></div>
      </div>

      <div className="question-card">
        <div className="question-category">{currentQuestion.category}</div>
        <h2>
          Spørsmål {currentQuestionIndex + 1} av {questions.length}
        </h2>
        <p className="question-text">{currentQuestion.text}</p>

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

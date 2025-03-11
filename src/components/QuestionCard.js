// src/components/Questionnaire.js
import React, { useState, useEffect } from "react";
import "../styles/components/Questionnaire.css";

// Styling som kan kopieres til egen CSS-fil
const inlineStyles = `
/* Container styling */
.questionnaire-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

/* Progress bar styling */
.progress-bar-container {
  margin-bottom: 25px;
}

.progress-label {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #666;
  margin-bottom: 5px;
}

.progress-bar-q {
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  margin-bottom: 15px;
  overflow: hidden;
}

.progress-q {
  height: 100%;
  background-color: #4CAF50;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: width 0.5s ease;
}

.category-progress-bar {
  height: 6px;
  background-color: #e0e0e0;
  border-radius: 3px;
  margin-bottom: 5px;
  overflow: hidden;
}

.category-progress {
  height: 100%;
  background-color: #4a90e2;
  border-radius: 3px;
  transition: width 0.5s ease;
}

.progress-text-q {
  color: white;
  font-size: 12px;
  font-weight: bold;
}

/* Question card styling */
.question-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 20px;
  margin-bottom: 20px;
}

.question-category {
  font-size: 0.9rem;
  font-weight: 600;
  color: #4a90e2;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.main-question {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 25px;
  color: #333;
  line-height: 1.4;
}

/* Subcategory styling */
.subcategory-section {
  margin-bottom: 25px;
  border-left: 3px solid #4a90e2;
  padding-left: 15px;
}

.subcategory-title {
  font-size: 1.1rem;
  font-weight: 500;
  color: #4a90e2;
  margin-bottom: 15px;
}

/* Subquestion styling */
.subquestion-item {
  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  transition: all 0.3s ease;
  border: 1px solid #e0e0e0;
  cursor: pointer;
}

.subquestion-item.answered {
  border-left: 4px solid #4CAF50;
}

.subquestion-item.answered:not(.expanded) {
  padding: 10px 15px;
  background-color: #f0f8f0;
}

.subquestion-item.expanded {
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.subquestion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.subquestion-text {
  font-weight: 500;
  color: #333;
  flex: 1;
  margin-right: 15px;
  transition: color 0.2s ease;
}

.subquestion-header .answer-badge {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  color: white;
}

.answer-badge.ja {
  background-color: #4CAF50;
}

.answer-badge.delvis {
  background-color: #FFC107;
}

.answer-badge.nei {
  background-color: #F44336;
}

.subquestion-content {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #e0e0e0;
}

/* Guide styling */
.guide-toggle-button {
  padding: 6px 12px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.guide-toggle-button.active {
  background-color: #e0e0e0;
}

.guide-toggle-button:hover {
  background-color: #e0e0e0;
}

.guide-container {
  background-color: #f9f9f9;
  border-radius: 6px;
  padding: 15px;
  margin: 15px 0;
  border-left: 3px solid #4a90e2;
}

.guide-container h4 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 0.95rem;
  color: #555;
}

.guide-steps {
  margin: 0;
  padding-left: 20px;
}

.guide-step {
  margin-bottom: 8px;
  font-size: 0.9rem;
  color: #444;
}

/* Answer options styling */
.answer-options {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.answer-options button {
  padding: 10px 15px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.95rem;
  min-width: 80px;
}

.answer-options button.selected {
  background-color: #4a90e2;
  color: white;
  border-color: #3a80d2;
}

.answer-options button:hover:not(.selected) {
  background-color: #f0f0f0;
}

/* Navigation styling */
.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.navigation-buttons button {
  padding: 10px 20px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.95rem;
}

.navigation-buttons button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.navigation-buttons button.submit-button {
  background-color: #4CAF50;
  color: white;
  border: none;
}

.navigation-buttons button.submit-button:disabled {
  background-color: #9e9e9e;
}

/* Expanded subquestion styling */
.subquestion-item:not(.expanded) .subquestion-content {
  display: none;
}

.subquestion-item.answered:not(.expanded) .subquestion-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 80%;
}

.chevron-icon {
  transition: transform 0.3s ease;
}

.subquestion-item.expanded .chevron-icon {
  transform: rotate(180deg);
}

/* Loading state styling */
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  font-size: 1.2rem;
  color: #666;
}

.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #4a90e2;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin-right: 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Error state styling */
.error-container {
  text-align: center;
  padding: 30px;
  background-color: #fff3f3;
  border-radius: 8px;
  border-left: 4px solid #f44336;
  color: #d32f2f;
}
`;

// Hjelpefunksjon for å hente alle underspørsmål for et gitt hovedspørsmål
const getSubQuestions = (question) => {
  if (question && question.subCategories) {
    return question.subCategories.flatMap((subCat) =>
      subCat.questions.map((q) => ({ ...q, subCategoryId: subCat.id }))
    );
  }
  return [];
};

// Render chevron ikon
const renderChevron = (isExpanded) => (
  <svg
    className="chevron-icon"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d={
        isExpanded
          ? "M8 12L2 6L3.4 4.6L8 9.2L12.6 4.6L14 6L8 12Z"
          : "M8 4L14 10L12.6 11.4L8 6.8L3.4 11.4L2 10L8 4Z"
      }
      fill="#666666"
    />
  </svg>
);

function Questionnaire({ onSubmit }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showGuide, setShowGuide] = useState({});
  const [expanded, setExpanded] = useState({});
  const [explVisible, setExplVisible] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [prefillComplete, setPrefillComplete] = useState(false); // New state to track if prefill has been done

  // Fetch questions from JSON file
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Enkel sti til JSON-filen i public-mappen
        const response = await fetch("/testDatabase/questions.json", {
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Kunne ikke hente spørsmål: ${response.status}`);
        }

        const data = await response.json();
        console.log("Spørsmål lastet:", data);
        setQuestions(data);
      } catch (err) {
        console.error("Feil ved henting av spørsmål:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // NEW: Pre-fill all answers with "nei" after questions are loaded
  useEffect(() => {
    if (loading || error || questions.length === 0 || prefillComplete) return;

    // Create an object to hold all the pre-filled answers
    const prefilled = {};

    // Go through all questions and subquestions
    questions.forEach((question) => {
      if (question.subCategories) {
        question.subCategories.forEach((subCategory) => {
          subCategory.questions.forEach((subQuestion) => {
            prefilled[subQuestion.id] = "nei";
          });
        });
      } else {
        // For regular questions (if any)
        prefilled[question.id] = "nei";
      }
    });

    // Set the pre-filled answers
    setAnswers(prefilled);
    setPrefillComplete(true);

    console.log("All questions pre-filled with 'nei' answers");
  }, [questions, loading, error, prefillComplete]);

  // Initialiser første underspørsmål til åpent i hver aktiv underkategori
  useEffect(() => {
    if (loading || error || questions.length === 0) return;

    const currentQ = questions[currentQuestionIndex];
    if (!currentQ.subCategories) return;

    const newExpandedState = {};

    // For each subcategory
    for (let i = 0; i < currentQ.subCategories.length; i++) {
      const subCat = currentQ.subCategories[i];

      // Check if this subcategory should be active
      let isSubCategoryActive = true;

      // Check if all questions in previous subcategories are answered
      if (i > 0) {
        for (let j = 0; j < i; j++) {
          const prevSubCat = currentQ.subCategories[j];
          const allPrevAnswered = prevSubCat.questions.every(
            (q) => answers[q.id] !== undefined
          );

          if (!allPrevAnswered) {
            isSubCategoryActive = false;
            break;
          }
        }
      }

      // If this subcategory is active, find first unanswered question
      if (isSubCategoryActive) {
        const firstUnansweredQuestion = subCat.questions.find(
          (q) => answers[q.id] === undefined
        );

        if (firstUnansweredQuestion) {
          newExpandedState[firstUnansweredQuestion.id] = true;
        }
      }
    }

    setExpanded(newExpandedState);
  }, [currentQuestionIndex, answers, loading, error, questions]);

  // Når brukeren svarer på et spørsmål, lukk det og åpne det neste
  useEffect(() => {
    if (loading || error || questions.length === 0) return;

    // Finn alle underspørsmål i rekkefølge for gjeldende hovedspørsmål
    const currentQ = questions[currentQuestionIndex];
    if (!currentQ.subCategories) return;

    const allSubQuestions = getSubQuestions(currentQ);

    // Når et svar er registrert, lukk spørsmålet og åpne neste
    Object.keys(answers).forEach((qId) => {
      // Sjekk om dette spørsmålet tilhører gjeldende hovedspørsmål
      const isCurrentQuestionId = allSubQuestions.some((q) => q.id === qId);
      if (!isCurrentQuestionId) return;

      // Finn indeksen til gjeldende besvarte spørsmål
      const currentIndex = allSubQuestions.findIndex((q) => q.id === qId);

      // Hvis vi fant indeksen og det ikke er det siste spørsmålet
      if (currentIndex !== -1 && currentIndex < allSubQuestions.length - 1) {
        // Finn neste spørsmål
        const nextQuestion = allSubQuestions[currentIndex + 1];

        // Lukk gjeldende og åpne neste (bare hvis neste ikke allerede er besvart)
        if (nextQuestion && answers[nextQuestion.id] === undefined) {
          setExpanded((prev) => ({
            ...prev,
            [qId]: false,
            [nextQuestion.id]: true,
          }));
        } else {
          setExpanded((prev) => ({
            ...prev,
            [qId]: false,
          }));
        }
      } else if (currentIndex !== -1) {
        // Hvis det er det siste spørsmålet, bare lukk det
        setExpanded((prev) => ({
          ...prev,
          [qId]: false,
        }));
      }
    });
  }, [answers, currentQuestionIndex, loading, error, questions]);

  // This function handles when a user answers a question
  const handleAnswer = (questionId, answer) => {
    // Set the answer
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));

    // Find the subcategory and question index
    let foundSubCat = null;
    let questionIndex = -1;

    const currentQ = questions[currentQuestionIndex];
    if (currentQ.subCategories) {
      for (const subCat of currentQ.subCategories) {
        const index = subCat.questions.findIndex((q) => q.id === questionId);
        if (index !== -1) {
          foundSubCat = subCat;
          questionIndex = index;
          break;
        }
      }
    }

    if (foundSubCat && questionIndex !== -1) {
      // Close the current question
      const newExpandedState = { ...expanded };
      newExpandedState[questionId] = false;

      // If there is a next question in this subcategory, open it
      if (questionIndex < foundSubCat.questions.length - 1) {
        const nextQuestion = foundSubCat.questions[questionIndex + 1];
        newExpandedState[nextQuestion.id] = true;
      }

      // Update the expanded state
      setExpanded(newExpandedState);
    }
  };

  // Toggle utvidet/kollapset tilstand for et underspørsmål
  const toggleExpanded = (questionId) => {
    setExpanded((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  // Toggle guide visning
  const toggleGuide = (questionId) => {
    setShowGuide((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  // Gå til neste hovedspørsmål
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Gå til forrige hovedspørsmål
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Send inn svarene
  const handleSubmit = () => {
    onSubmit(answers);
  };

  // Beregn total fremgang på tvers av alle spørsmål
  const calculateTotalProgress = () => {
    if (questions.length === 0) return 0;

    let totalQuestionCount = 0;
    let answeredCount = 0;

    // Tell opp alle underspørsmål i alle hovedspørsmål
    questions.forEach((q) => {
      if (q.subCategories) {
        const subQuestions = q.subCategories.flatMap(
          (subCat) => subCat.questions
        );
        totalQuestionCount += subQuestions.length;

        // Tell opp besvarte underspørsmål
        subQuestions.forEach((subQ) => {
          if (answers[subQ.id] !== undefined) {
            answeredCount++;
          }
        });
      }
    });

    return totalQuestionCount === 0
      ? 0
      : Math.round((answeredCount / totalQuestionCount) * 100);
  };

  // Beregn fremgang for gjeldende hovedspørsmål
  const calculateQuestionProgress = () => {
    if (questions.length === 0 || !questions[currentQuestionIndex]) return 0;

    const currentQ = questions[currentQuestionIndex];

    // Sjekk om spørsmålet har underkategorier
    if (currentQ && currentQ.subCategories) {
      const subQuestions = currentQ.subCategories.flatMap(
        (subCat) => subCat.questions
      );
      const total = subQuestions.length;
      if (total === 0) return 0;

      const answeredSubQuestions = subQuestions.filter(
        (q) => answers[q.id] !== undefined
      ).length;
      return Math.round((answeredSubQuestions / total) * 100);
    }

    // Hvis ikke, er det enten 0% eller 100%
    return answers[currentQ.id] !== undefined ? 100 : 0;
  };

  // Sjekk om alle spørsmål er besvart i gjeldende hovedspørsmål
  const isCurrentQuestionAnswered = () => {
    if (questions.length === 0 || !questions[currentQuestionIndex])
      return false;

    const currentQ = questions[currentQuestionIndex];

    // Hvis spørsmålet har underkategorier, sjekk alle underspørsmål
    if (currentQ && currentQ.subCategories) {
      const subQuestions = currentQ.subCategories.flatMap(
        (subCat) => subCat.questions
      );
      return subQuestions.every((q) => answers[q.id] !== undefined);
    }

    // Ellers sjekk bare hovedspørsmålet
    return answers[currentQ.id] !== undefined;
  };

  // Sjekk om alle spørsmål er besvart totalt
  const hasAnsweredAllQuestions = () => {
    if (questions.length === 0) return false;

    // Sjekk alle hovedspørsmål og deres underspørsmål
    return questions.every((q) => {
      if (q.subCategories) {
        // Sjekk alle underspørsmål
        return q.subCategories.every((subCat) =>
          subCat.questions.every((subQ) => answers[subQ.id] !== undefined)
        );
      }
      // Sjekk hovedspørsmålet
      return answers[q.id] !== undefined;
    });
  };

  // Hent svar-badge tekst
  const getAnswerBadgeText = (answer) => {
    return answer.charAt(0).toUpperCase() + answer.slice(1);
  };

  // Handle loading state
  if (loading) {
    return (
      <div className="questionnaire-container">
        <style>{inlineStyles}</style>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <span>Laster spørsmål...</span>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="questionnaire-container">
        <style>{inlineStyles}</style>
        <div className="error-container">
          <h3>Feil ved lasting av spørsmål</h3>
          <p>{error}</p>
          <p>
            Prøv å laste siden på nytt eller kontakt support hvis problemet
            vedvarer.
          </p>
        </div>
      </div>
    );
  }

  // Handle empty questions array
  if (questions.length === 0) {
    return (
      <div className="questionnaire-container">
        <style>{inlineStyles}</style>
        <div className="error-container">
          <h3>Ingen spørsmål funnet</h3>
          <p>
            Kunne ikke finne noen spørsmål å vise. Sjekk at spørsmålsfilen er
            korrekt formatert.
          </p>
        </div>
      </div>
    );
  }

  const totalProgressPercentage = calculateTotalProgress();
  const questionProgressPercentage = calculateQuestionProgress();
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="questionnaire-container">
      <style>{inlineStyles}</style>

      <div className="progress-bar-container">
        {/* Total fremgangsprosent */}
        <div className="progress-label">
          <span>Total fremgang</span>
          <span>{totalProgressPercentage}%</span>
        </div>
        <div className="progress-bar-q">
          <div
            className="progress-q"
            style={{ width: `${totalProgressPercentage}%` }}
          >
            {totalProgressPercentage > 10 && (
              <span className="progress-text-q">
                {totalProgressPercentage}%
              </span>
            )}
          </div>
        </div>

        {/* Fremgang for gjeldende spørsmål */}
        <div className="progress-label">
          <span>Fremgang: {currentQuestion.category}</span>
          <span>{questionProgressPercentage}%</span>
        </div>
        <div className="category-progress-bar">
          <div
            className="category-progress"
            style={{ width: `${questionProgressPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="question-card">
        {currentQuestion.subCategories ? (
          /* Vis spørsmål med underkategorier */
          <>
            <div className="question-category">{currentQuestion.category}</div>
            <div className="main-question">{currentQuestion.text}</div>

            {/* Vis alle underkategorier og deres underspørsmål */}
            {currentQuestion.subCategories.map((subCat, subCatIndex) => {
              // Determine if this subcategory should be active (showing its questions)
              let isSubCategoryActive = true;

              // Check if all questions in previous subcategories are answered
              if (subCatIndex > 0) {
                for (let i = 0; i < subCatIndex; i++) {
                  const prevSubCat = currentQuestion.subCategories[i];
                  const allPrevAnswered = prevSubCat.questions.every(
                    (q) => answers[q.id] !== undefined
                  );

                  if (!allPrevAnswered) {
                    isSubCategoryActive = false;
                    break;
                  }
                }
              }

              return (
                <div key={subCat.id} className="subcategory-section">
                  <h3 className="subcategory-title">{subCat.name}</h3>

                  {/* Only render questions if subcategory is active */}
                  {isSubCategoryActive &&
                    subCat.questions.map((question, qIndex) => {
                      const isAnswered = answers[question.id] !== undefined;
                      const isExpandedState = expanded[question.id] || false;

                      return (
                        <div
                          key={question.id}
                          className={`subquestion-item ${
                            isAnswered ? "answered" : ""
                          } ${isExpandedState ? "expanded" : ""}`}
                          // Remove onClick from here
                        >
                          <div
                            className="subquestion-header"
                            onClick={() => toggleExpanded(question.id)} // Add onClick here instead
                          >
                            <div className="subquestion-text">
                              {question.text}
                            </div>
                            {isAnswered ? (
                              <div
                                className={`answer-badge ${
                                  answers[question.id]
                                }`}
                              >
                                {getAnswerBadgeText(answers[question.id])}
                              </div>
                            ) : (
                              renderChevron(isExpandedState)
                            )}
                          </div>

                          <div className="subquestion-content">
                            {/* Display explanation if available with toggle button */}
                            {question.explanation && (
                              <>
                                <button
                                  className="explanation-toggle"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Toggle explanation visibility
                                    setExplVisible((prev) => ({
                                      ...prev,
                                      [question.id]: !prev[question.id],
                                    }));
                                  }}
                                >
                                  {explVisible && explVisible[question.id]
                                    ? "Skjul forklaring"
                                    : "Vis forklaring"}
                                </button>

                                {explVisible && explVisible[question.id] && (
                                  <div className="question-explanation">
                                    <p>{question.explanation}</p>
                                  </div>
                                )}
                              </>
                            )}

                            <div className="answer-options">
                              <button
                                className={
                                  answers[question.id] === "ja"
                                    ? "selected"
                                    : ""
                                }
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAnswer(question.id, "ja");
                                }}
                              >
                                Ja
                              </button>
                              <button
                                className={
                                  answers[question.id] === "delvis"
                                    ? "selected"
                                    : ""
                                }
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAnswer(question.id, "delvis");
                                }}
                              >
                                Delvis
                              </button>
                              <button
                                className={
                                  answers[question.id] === "nei"
                                    ? "selected"
                                    : ""
                                }
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAnswer(question.id, "nei");
                                }}
                              >
                                Nei
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              );
            })}
          </>
        ) : null}

        {currentQuestion.subCategories ? (
          /* Vis spørsmål med underkategorier */
          <>
            <div className="question-category">{currentQuestion.category}</div>
            <div className="main-question">{currentQuestion.text}</div>

            {/* Vis alle underkategorier og deres underspørsmål */}
            {currentQuestion.subCategories.map((subCat, subCatIndex) => {
              // Determine if this subcategory should be active (showing its questions)
              let isSubCategoryActive = true;

              // Check if all questions in previous subcategories are answered
              if (subCatIndex > 0) {
                for (let i = 0; i < subCatIndex; i++) {
                  const prevSubCat = currentQuestion.subCategories[i];
                  const allPrevAnswered = prevSubCat.questions.every(
                    (q) => answers[q.id] !== undefined
                  );

                  if (!allPrevAnswered) {
                    isSubCategoryActive = false;
                    break;
                  }
                }
              }

              return (
                <div key={subCat.id} className="subcategory-section">
                  <h3 className="subcategory-title">{subCat.name}</h3>

                  {/* Only render questions if subcategory is active */}
                  {isSubCategoryActive &&
                    subCat.questions.map((question, qIndex) => {
                      const isAnswered = answers[question.id] !== undefined;
                      const isExpandedState = expanded[question.id] || false;

                      return (
                        <div
                          key={question.id}
                          className={`subquestion-item ${
                            isAnswered ? "answered" : ""
                          } ${isExpandedState ? "expanded" : ""}`}
                          onClick={() => toggleExpanded(question.id)}
                        >
                          <div className="subquestion-header">
                            <div className="subquestion-text">
                              {question.text}
                            </div>
                            {isAnswered ? (
                              <div
                                className={`answer-badge ${
                                  answers[question.id]
                                }`}
                              >
                                {getAnswerBadgeText(answers[question.id])}
                              </div>
                            ) : (
                              renderChevron(isExpandedState)
                            )}
                          </div>

                          <div className="subquestion-content">
                            {/* Display explanation if available */}
                            {question.explanation && (
                              <div className="question-explanation">
                                <p>{question.explanation}</p>
                              </div>
                            )}

                            <div className="answer-options">
                              <button
                                className={
                                  answers[question.id] === "ja"
                                    ? "selected"
                                    : ""
                                }
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAnswer(question.id, "ja");
                                }}
                              >
                                Ja
                              </button>
                              <button
                                className={
                                  answers[question.id] === "delvis"
                                    ? "selected"
                                    : ""
                                }
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAnswer(question.id, "delvis");
                                }}
                              >
                                Delvis
                              </button>
                              <button
                                className={
                                  answers[question.id] === "nei"
                                    ? "selected"
                                    : ""
                                }
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAnswer(question.id, "nei");
                                }}
                              >
                                Nei
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              );
            })}
          </>
        ) : (
          /* Vis vanlige spørsmål med guide (for gamle q2-q5 format) */
          <>
            <div className="question-category">{currentQuestion.category}</div>
            <div className="question-row">
              <p className="question-text">{currentQuestion.text}</p>
              <button
                className={`guide-toggle-button ${
                  showGuide[currentQuestion.id] ? "active" : ""
                }`}
                onClick={() => toggleGuide(currentQuestion.id)}
                aria-expanded={showGuide[currentQuestion.id]}
              >
                {showGuide[currentQuestion.id] ? "Skjul guide" : "Vis guide"}
              </button>
            </div>

            {showGuide[currentQuestion.id] && currentQuestion.guide && (
              <div className="guide-container">
                <h4>Slik vurderer du dette spørsmålet:</h4>
                <ol className="guide-steps">
                  {currentQuestion.guide.map((step, index) => (
                    <li key={index} className="guide-step">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div className="answer-options">
              <button
                className={
                  answers[currentQuestion.id] === "ja" ? "selected" : ""
                }
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
                className={
                  answers[currentQuestion.id] === "nei" ? "selected" : ""
                }
                onClick={() => handleAnswer(currentQuestion.id, "nei")}
              >
                Nei
              </button>
            </div>
          </>
        )}

        {/* Navigasjonsknapper */}
        <div className="navigation-buttons">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            Forrige
          </button>

          {!isLastQuestion ? (
            <button
              onClick={handleNext}
              disabled={!isCurrentQuestionAnswered()}
            >
              Neste
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!hasAnsweredAllQuestions()}
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

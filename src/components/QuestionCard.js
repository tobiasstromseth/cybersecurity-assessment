// src/components/Questionnaire.js
import React, { useState, useEffect } from "react";
import "../styles/components/Questionnaire.css";

// Styling som kan kopieres til egen CSS-fil


// Hjelpefunksjon for å hente alle underspørsmål for et gitt hovedspørsmål
const getSubQuestions = (question) => {
  if (question && question.subCategories) {
    return question.subCategories.flatMap(
      subCat => subCat.questions.map(q => ({ ...q, subCategoryId: subCat.id }))
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
      d={isExpanded ? "M8 12L2 6L3.4 4.6L8 9.2L12.6 4.6L14 6L8 12Z" : "M8 4L14 10L12.6 11.4L8 6.8L3.4 11.4L2 10L8 4Z"} 
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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [explVisible, setExplVisible] = useState({});

  // Fetch questions from JSON file
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Enkel sti til JSON-filen i public-mappen
        const response = await fetch('/testDatabase/questions.json', {
          headers: {
            'Accept': 'application/json'
          }
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
          const allPrevAnswered = prevSubCat.questions.every(q => answers[q.id] !== undefined);
          
          if (!allPrevAnswered) {
            isSubCategoryActive = false;
            break;
          }
        }
      }
      
      // If this subcategory is active, find first unanswered question
      if (isSubCategoryActive) {
        const firstUnansweredQuestion = subCat.questions.find(q => answers[q.id] === undefined);
        
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
    Object.keys(answers).forEach(qId => {
      // Sjekk om dette spørsmålet tilhører gjeldende hovedspørsmål
      const isCurrentQuestionId = allSubQuestions.some(q => q.id === qId);
      if (!isCurrentQuestionId) return;
      
      // Finn indeksen til gjeldende besvarte spørsmål
      const currentIndex = allSubQuestions.findIndex(q => q.id === qId);
      
      // Hvis vi fant indeksen og det ikke er det siste spørsmålet
      if (currentIndex !== -1 && currentIndex < allSubQuestions.length - 1) {
        // Finn neste spørsmål
        const nextQuestion = allSubQuestions[currentIndex + 1];
        
        // Lukk gjeldende og åpne neste (bare hvis neste ikke allerede er besvart)
        if (nextQuestion && answers[nextQuestion.id] === undefined) {
          setExpanded(prev => ({
            ...prev,
            [qId]: false,
            [nextQuestion.id]: true
          }));
        } else {
          setExpanded(prev => ({
            ...prev,
            [qId]: false
          }));
        }
      } else if (currentIndex !== -1) {
        // Hvis det er det siste spørsmålet, bare lukk det
        setExpanded(prev => ({
          ...prev,
          [qId]: false
        }));
      }
    });
  }, [answers, currentQuestionIndex, loading, error, questions]);

  // This function handles when a user answers a question
  const handleAnswer = (questionId, answer) => {
    // Set the answer
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
    
    // Find the subcategory and question index
    let foundSubCat = null;
    let questionIndex = -1;
    
    const currentQ = questions[currentQuestionIndex];
    if (currentQ.subCategories) {
      for (const subCat of currentQ.subCategories) {
        const index = subCat.questions.findIndex(q => q.id === questionId);
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
    setExpanded(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  // Toggle guide visning
  const toggleGuide = (questionId) => {
    setShowGuide(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
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
    questions.forEach(q => {
      if (q.subCategories) {
        const subQuestions = q.subCategories.flatMap(subCat => subCat.questions);
        totalQuestionCount += subQuestions.length;
        
        // Tell opp besvarte underspørsmål
        subQuestions.forEach(subQ => {
          if (answers[subQ.id] !== undefined) {
            answeredCount++;
          }
        });
      }
    });
    
    return totalQuestionCount === 0 ? 0 : Math.round((answeredCount / totalQuestionCount) * 100);
  };

  // Beregn fremgang for gjeldende hovedspørsmål
  const calculateQuestionProgress = () => {
    if (questions.length === 0 || !questions[currentQuestionIndex]) return 0;
    
    const currentQ = questions[currentQuestionIndex];
    
    // Sjekk om spørsmålet har underkategorier
    if (currentQ && currentQ.subCategories) {
      const subQuestions = currentQ.subCategories.flatMap(subCat => subCat.questions);
      const total = subQuestions.length;
      if (total === 0) return 0;
      
      const answeredSubQuestions = subQuestions.filter(q => answers[q.id] !== undefined).length;
      return Math.round((answeredSubQuestions / total) * 100);
    }
    
    // Hvis ikke, er det enten 0% eller 100%
    return answers[currentQ.id] !== undefined ? 100 : 0;
  };

  // Sjekk om alle spørsmål er besvart i gjeldende hovedspørsmål
  const isCurrentQuestionAnswered = () => {
    if (questions.length === 0 || !questions[currentQuestionIndex]) return false;
    
    const currentQ = questions[currentQuestionIndex];
    
    // Hvis spørsmålet har underkategorier, sjekk alle underspørsmål
    if (currentQ && currentQ.subCategories) {
      const subQuestions = currentQ.subCategories.flatMap(subCat => subCat.questions);
      return subQuestions.every(q => answers[q.id] !== undefined);
    }
    
    // Ellers sjekk bare hovedspørsmålet
    return answers[currentQ.id] !== undefined;
  };

  // Sjekk om alle spørsmål er besvart totalt
  const hasAnsweredAllQuestions = () => {
    if (questions.length === 0) return false;
    
    // Sjekk alle hovedspørsmål og deres underspørsmål
    return questions.every(q => {
      if (q.subCategories) {
        // Sjekk alle underspørsmål
        return q.subCategories.every(subCat => 
          subCat.questions.every(subQ => answers[subQ.id] !== undefined)
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
        <div className="error-container">
          <h3>Feil ved lasting av spørsmål</h3>
          <p>{error}</p>
          <p>Prøv å laste siden på nytt eller kontakt support hvis problemet vedvarer.</p>
        </div>
      </div>
    );
  }

  // Handle empty questions array
  if (questions.length === 0) {
    return (
      <div className="questionnaire-container">
        <div className="error-container">
          <h3>Ingen spørsmål funnet</h3>
          <p>Kunne ikke finne noen spørsmål å vise. Sjekk at spørsmålsfilen er korrekt formatert.</p>
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
              const allPrevAnswered = prevSubCat.questions.every(q => answers[q.id] !== undefined);
              
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
              {isSubCategoryActive && subCat.questions.map((question, qIndex) => {
                const isAnswered = answers[question.id] !== undefined;
                const isExpandedState = expanded[question.id] || false;
                
                return (
                  <div 
                    key={question.id} 
                    className={`subquestion-item ${isAnswered ? 'answered' : ''} ${isExpandedState ? 'expanded' : ''}`}
                    onClick={() => toggleExpanded(question.id)}
                  >
                    <div className="subquestion-header">
                      <div className="subquestion-text">{question.text}</div>
                      {isAnswered ? (
                        <div className={`answer-badge ${answers[question.id]}`}>
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
                              setExplVisible(prev => ({
                                ...prev,
                                [question.id]: !prev[question.id]
                              }));
                            }}
                          >
                            {(explVisible && explVisible[question.id]) ? 'Skjul forklaring' : 'Vis forklaring'}
                          </button>
                          
                          {(explVisible && explVisible[question.id]) && (
                            <div className="question-explanation">
                              <p>{question.explanation}</p>
                            </div>
                          )}
                        </>
                      )}
                      
                      <div className="answer-options">
                        <button
                          className={answers[question.id] === "ja" ? "selected" : ""}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAnswer(question.id, "ja");
                          }}
                        >
                          Ja
                        </button>
                        <button
                          className={answers[question.id] === "delvis" ? "selected" : ""}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAnswer(question.id, "delvis");
                          }}
                        >
                          Delvis
                        </button>
                        <button
                          className={answers[question.id] === "nei" ? "selected" : ""}
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
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
`;

// Datastruktur for spørsmål
const questions = [
  {
    id: "q1",
    text: "Hvordan sikrer virksomheten at IT-systemer og -utstyr er oppdaterte, korrekt konfigurert og beskyttet mot uautorisert bruk?",
    category: "Oppdatering og konfigurering",
    subCategories: [
      {
        id: "1",
        name: "1. Nye datamaskiner og programmer",
        questions: [
          {
            id: "q1_1_1",
            text: "Får alle datamaskiner og programvare fortsatt sikkerhetoppdateringer?"
          }
        ]
      },
      {
        id: "2",
        name: "2. Oppdateringer",
        questions: [
          {
            id: "q1_2_1",
            text: "Installeres sikkerhetsoppdateringer automatisk på alle datamaskiner og programmer?"
          }
        ]
      },
      {
        id: "3",
        name: "3. Kontroll over programmer",
        questions: [
          {
            id: "q1_3_1",
            text: "Kan ansatte selv installere programmer på jobbdatamaskinene?"
          },
          {
            id: "q1_3_2",
            text: "Bruker dere verktøy som hindrer at ikke-godkjente programmer kan kjøres?"
          }
        ]
      },
      {
        id: "4",
        name: "4. Sikre innstillinger",
        questions: [
          {
            id: "q1_4_1",
            text: "Har bedriften en standardmåte å sette opp nye datamaskiner på?"
          },
          {
            id: "q1_4_2",
            text: "Fjerner dere programmer og funksjoner som ikke trengs før nye datamaskiner tas i bruk?"
          },
          {
            id: "q1_4_3",
            text: "Endrer dere alltid de forhåndsinnstilte passordene på nytt IT-utstyr (som rutere, skrivere, servere) før de kobles til nettverket?"
          },
          {
            id: "q1_4_4",
            text: "Sjekker dere regelmessig at IT-utstyret fortsatt har sikre innstillinger, eller at ingen har endret på dem?"
          }
        ]
      }
    ]
  },
  {
    id: "q2",
    text: "Hvordan administrerer virksomheten sine IT-ressurser?",
    category: "Ressurshåndtering",
    subCategories: [
      {
        id: "1",
        name: "1. Oversikt over ressurser",
        questions: [
          {
            id: "q2_1_1",
            text: "Har virksomheten en oppdatert oversikt over alle IT-ressurser (maskinvare, programvare, lisenser)?"
          },
          {
            id: "q2_1_2",
            text: "Er det etablert rutiner for regelmessig gjennomgang og oppdatering av ressursoversikten?"
          }
        ]
      },
      {
        id: "2",
        name: "2. Ansvarsfordeling",
        questions: [
          {
            id: "q2_2_1",
            text: "Er det tydelig definert hvem som har ansvar for ulike IT-ressurser?"
          },
          {
            id: "q2_2_2",
            text: "Har virksomheten dedikerte ressurser til cybersikkerhet?"
          }
        ]
      }
    ]
  },
  {
    id: "q3",
    text: "Hvilke rutiner har virksomheten for passord og tilgangsstyring?",
    category: "Passord Policy",
    subCategories: [
      {
        id: "1",
        name: "1. Passordkrav",
        questions: [
          {
            id: "q3_1_1",
            text: "Har virksomheten definerte krav til sikre passord (lengde, kompleksitet, utløp)?"
          },
          {
            id: "q3_1_2",
            text: "Brukes tekniske løsninger for å håndheve passordpolicyen?"
          }
        ]
      },
      {
        id: "2",
        name: "2. Passordadministrasjon",
        questions: [
          {
            id: "q3_2_1",
            text: "Bruker virksomheten et verktøy for passordadministrasjon?"
          },
          {
            id: "q3_2_2",
            text: "Er det rutiner for å endre standardpassord på alle systemer og enheter?"
          }
        ]
      }
    ]
  },
  {
    id: "q4",
    text: "Hvordan sikres virksomhetens data gjennom sikkerhetskopiering?",
    category: "Sikkerhetskopiering",
    subCategories: [
      {
        id: "1",
        name: "1. Rutiner og omfang",
        questions: [
          {
            id: "q4_1_1",
            text: "Har virksomheten definert hvilke data som skal sikkerhetskopieres og hvor ofte?"
          },
          {
            id: "q4_1_2",
            text: "Følger virksomheten 3-2-1-prinsippet for sikkerhetskopiering?"
          }
        ]
      },
      {
        id: "2",
        name: "2. Testing og verifisering",
        questions: [
          {
            id: "q4_2_1",
            text: "Testes sikkerhetskopier regelmessig for å verifisere at de kan gjenopprettes?"
          },
          {
            id: "q4_2_2",
            text: "Er det dokumenterte prosedyrer for gjenoppretting av data fra sikkerhetskopier?"
          }
        ]
      }
    ]
  },
  {
    id: "q5",
    text: "Hvordan implementerer virksomheten flerfaktorautentisering (MFA)?",
    category: "Flerfaktor (MFA)",
    subCategories: [
      {
        id: "1",
        name: "1. Omfang og dekning",
        questions: [
          {
            id: "q5_1_1",
            text: "Er MFA implementert for alle kritiske systemer og tjenester?"
          },
          {
            id: "q5_1_2",
            text: "Er MFA påkrevd for fjernaksess til virksomhetens nettverk og systemer?"
          }
        ]
      },
      {
        id: "2",
        name: "2. MFA-løsninger",
        questions: [
          {
            id: "q5_2_1",
            text: "Hvilke typer MFA-løsninger bruker virksomheten (app, SMS, fysiske nøkler)?"
          },
          {
            id: "q5_2_2",
            text: "Er det rutiner for å håndtere tap av MFA-enheter?"
          }
        ]
      }
    ]
  },
  {
    id: "q6",
    text: "Hvordan styrer virksomheten tilgang til systemer og data?",
    category: "Tilgangskontroll",
    subCategories: [
      {
        id: "1",
        name: "1. Tildelingsrutiner",
        questions: [
          {
            id: "q6_1_1",
            text: "Følger virksomheten prinsippet om laveste nødvendige tilgangsnivå?"
          },
          {
            id: "q6_1_2",
            text: "Er det formelle rutiner for tildeling og revurdering av tilgangsrettigheter?"
          }
        ]
      },
      {
        id: "2",
        name: "2. Oppfølging og revisjon",
        questions: [
          {
            id: "q6_2_1",
            text: "Gjennomføres det regelmessig gjennomgang av tilgangsrettigheter?"
          },
          {
            id: "q6_2_2",
            text: "Logges tilgang til sensitive systemer og data?"
          }
        ]
      }
    ]
  },
  {
    id: "q7",
    text: "Hvilke tiltak har virksomheten for å beskytte mot skadelig programvare?",
    category: "Brannmur og antivirus",
    subCategories: [
      {
        id: "1",
        name: "1. Brannmur",
        questions: [
          {
            id: "q7_1_1",
            text: "Er brannmur aktivert og korrekt konfigurert på alle enheter?"
          },
          {
            id: "q7_1_2",
            text: "Gjennomgås brannmurregler regelmessig for å sikre at de er oppdaterte?"
          }
        ]
      },
      {
        id: "2",
        name: "2. Antivirus og beskyttelse",
        questions: [
          {
            id: "q7_2_1",
            text: "Er det installert antivirusprogramvare på alle enheter?"
          },
          {
            id: "q7_2_2",
            text: "Oppdateres virusdefinisjonene automatisk og regelmessig?"
          }
        ]
      }
    ]
  },
  {
    id: "q8",
    text: "Hvordan sikrer virksomheten sitt nettverk mot uautorisert tilgang?",
    category: "Nettverkssikkerhet",
    subCategories: [
      {
        id: "1",
        name: "1. Nettverkssegmentering",
        questions: [
          {
            id: "q8_1_1",
            text: "Er nettverket segmentert for å isolere sensitive systemer?"
          },
          {
            id: "q8_1_2",
            text: "Er det implementert nettverksovervåkning for å oppdage uvanlig aktivitet?"
          }
        ]
      },
      {
        id: "2",
        name: "2. Trådløs sikkerhet",
        questions: [
          {
            id: "q8_2_1",
            text: "Er virksomhetens Wi-Fi-nettverk sikret med sterk kryptering (WPA2/WPA3)?"
          },
          {
            id: "q8_2_2",
            text: "Er gjestenettverk atskilt fra virksomhetens hovednettverk?"
          }
        ]
      }
    ]
  },
  {
    id: "q9",
    text: "Hvilke tiltak har virksomheten for fysisk sikring av IT-utstyr?",
    category: "Fysisk sikring",
    subCategories: [
      {
        id: "1",
        name: "1. Adgangskontroll",
        questions: [
          {
            id: "q9_1_1",
            text: "Er det adgangskontroll til områder med kritisk IT-infrastruktur?"
          },
          {
            id: "q9_1_2",
            text: "Registreres og kontrolleres besøkende til områder med IT-utstyr?"
          }
        ]
      },
      {
        id: "2",
        name: "2. Miljøsikring",
        questions: [
          {
            id: "q9_2_1",
            text: "Er serverrom og IT-utstyr beskyttet mot miljøtrusler (brann, vann, strømbrudd)?"
          },
          {
            id: "q9_2_2",
            text: "Har virksomheten rutiner for sikker avhending av IT-utstyr og lagringsmedier?"
          }
        ]
      }
    ]
  },
  {
    id: "q10",
    text: "Hvordan beskytter virksomheten sensitive data gjennom kryptering?",
    category: "Datakryptering",
    subCategories: [
      {
        id: "1",
        name: "1. Lagringskryptering",
        questions: [
          {
            id: "q10_1_1",
            text: "Er harddisker på bærbare enheter kryptert?"
          },
          {
            id: "q10_1_2",
            text: "Er sensitive data i databaser og filsystemer kryptert?"
          }
        ]
      },
      {
        id: "2",
        name: "2. Kommunikasjonskryptering",
        questions: [
          {
            id: "q10_2_1",
            text: "Bruker virksomheten krypterte kommunikasjonskanaler (HTTPS, VPN, etc.)?"
          },
          {
            id: "q10_2_2",
            text: "Er det rutiner for sikker utveksling av sensitive data med eksterne parter?"
          }
        ]
      }
    ]
  },
  {
    id: "q11",
    text: "Hvordan er virksomheten forberedt på å håndtere sikkerhetshendelser?",
    category: "Hendelseshåndteringsplan",
    subCategories: [
      {
        id: "1",
        name: "1. Beredskapsplan",
        questions: [
          {
            id: "q11_1_1",
            text: "Har virksomheten en dokumentert plan for håndtering av sikkerhetshendelser?"
          },
          {
            id: "q11_1_2",
            text: "Er roller og ansvar tydelig definert i hendelseshåndteringsplanen?"
          }
        ]
      },
      {
        id: "2",
        name: "2. Øvelser og oppfølging",
        questions: [
          {
            id: "q11_2_1",
            text: "Gjennomføres det regelmessige øvelser på håndtering av sikkerhetshendelser?"
          },
          {
            id: "q11_2_2",
            text: "Evalueres og oppdateres hendelseshåndteringsplanen etter hendelser eller øvelser?"
          }
        ]
      }
    ]
  },
  {
    id: "q12",
    text: "Hvilke tiltak har virksomheten for å sikre at ansatte har nødvendig kompetanse innen IT-sikkerhet?",
    category: "Opplæring",
    subCategories: [
      {
        id: "1",
        name: "1. Opplæringsprogram",
        questions: [
          {
            id: "q12_1_1",
            text: "Har virksomheten et strukturert opplæringsprogram for IT-sikkerhet?"
          },
          {
            id: "q12_1_2",
            text: "Gjennomgår alle nyansatte grunnleggende sikkerhetsopplæring?"
          }
        ]
      },
      {
        id: "2",
        name: "2. Løpende bevisstgjøring",
        questions: [
          {
            id: "q12_2_1",
            text: "Gjennomføres det regelmessige bevisstgjøringskampanjer om IT-sikkerhet?"
          },
          {
            id: "q12_2_2",
            text: "Testes ansattes årvåkenhet med simulerte phishing-angrep eller lignende?"
          }
        ]
      }
    ]
  },
  {
    id: "q13",
    text: "Hvordan arbeider virksomheten systematisk med å forbedre IT-sikkerheten?",
    category: "Forbedring",
    subCategories: [
      {
        id: "1",
        name: "1. Risikovurdering",
        questions: [
          {
            id: "q13_1_1",
            text: "Gjennomføres det regelmessige risikovurderinger av IT-sikkerheten?"
          },
          {
            id: "q13_1_2",
            text: "Følges identifiserte sårbarheter opp med konkrete tiltak?"
          }
        ]
      },
      {
        id: "2",
        name: "2. Evaluering og forbedring",
        questions: [
          {
            id: "q13_2_1",
            text: "Evalueres effekten av implementerte sikkerhetstiltak?"
          },
          {
            id: "q13_2_2",
            text: "Har virksomheten en prosess for kontinuerlig forbedring av IT-sikkerheten?"
          }
        ]
      }
    ]
  }
];

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
  const [answers, setAnswers] = useState({});
  const [showGuide, setShowGuide] = useState({});
  const [expanded, setExpanded] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Initialiser første underspørsmål til åpent
  useEffect(() => {
    // Finn første underspørsmål i gjeldende hovedspørsmål
    const currentQ = questions[currentQuestionIndex];
    if (currentQ.subCategories && currentQ.subCategories.length > 0 &&
        currentQ.subCategories[0].questions.length > 0) {
      const firstSubQuestion = currentQ.subCategories[0].questions[0];
      if (firstSubQuestion) {
        setExpanded({ [firstSubQuestion.id]: true });
      }
    }
  }, [currentQuestionIndex]);

  // Når brukeren svarer på et spørsmål, lukk det og åpne det neste
  useEffect(() => {
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
  }, [answers, currentQuestionIndex]);

  // Håndter svar på underspørsmål
  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
    
    // Lukk gjeldende spørsmål når det er besvart
    setExpanded(prev => ({
      ...prev,
      [questionId]: false
    }));
    
    // Finn alle underspørsmål i rekkefølge og åpne neste
    const currentQ = questions[currentQuestionIndex];
    const allSubQuestions = getSubQuestions(currentQ);
    const currentIndex = allSubQuestions.findIndex(q => q.id === questionId);
    
    if (currentIndex !== -1 && currentIndex < allSubQuestions.length - 1) {
      const nextQuestion = allSubQuestions[currentIndex + 1];
      // Åpne neste spørsmål hvis det ikke allerede er besvart
      if (nextQuestion && !answers[nextQuestion.id]) {
        setTimeout(() => {
          setExpanded(prev => ({
            ...prev,
            [nextQuestion.id]: true
          }));
        }, 300); // Kort forsinkelse for bedre visuell effekt
      }
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
    
    return Math.round((answeredCount / totalQuestionCount) * 100);
  };

  // Beregn fremgang for gjeldende hovedspørsmål
  const calculateQuestionProgress = () => {
    const currentQ = questions[currentQuestionIndex];
    
    // Sjekk om spørsmålet har underkategorier
    if (currentQ && currentQ.subCategories) {
      const subQuestions = currentQ.subCategories.flatMap(subCat => subCat.questions);
      const answeredSubQuestions = subQuestions.filter(q => answers[q.id] !== undefined).length;
      return Math.round((answeredSubQuestions / subQuestions.length) * 100);
    }
    
    // Hvis ikke, er det enten 0% eller 100%
    return answers[currentQ.id] !== undefined ? 100 : 0;
  };

  // Sjekk om alle spørsmål er besvart i gjeldende hovedspørsmål
  const isCurrentQuestionAnswered = () => {
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
              <span className="progress-text-q">{totalProgressPercentage}%</span>
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
            {currentQuestion.subCategories.map(subCat => (
              <div key={subCat.id} className="subcategory-section">
                <h3 className="subcategory-title">{subCat.name}</h3>
                
                {subCat.questions.map(question => {
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
            ))}
          </>
        ) : (
          /* Vis vanlige spørsmål med guide (for gamle q2-q5 format) */
          <>
            <div className="question-category">{currentQuestion.category}</div>
            <div className="question-row">
              <p className="question-text">{currentQuestion.text}</p>
              <button 
                className={`guide-toggle-button ${showGuide[currentQuestion.id] ? 'active' : ''}`}
                onClick={() => toggleGuide(currentQuestion.id)}
                aria-expanded={showGuide[currentQuestion.id]}
              >
                {showGuide[currentQuestion.id] ? 'Skjul guide' : 'Vis guide'}
              </button>
            </div>
            
            {showGuide[currentQuestion.id] && (
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
                className={answers[currentQuestion.id] === "delvis" ? "selected" : ""}
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
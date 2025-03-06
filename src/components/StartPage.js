// src/components/StartPage.js
import React, { useState, useEffect } from "react";
import "../styles/components/StartPage.css";

function StartPage({ onComplete, savedCompanyInfo }) {
  const [companyInfo, setCompanyInfo] = useState(
    savedCompanyInfo || {
      companyName: "Test",
      industry: "Bygg og Anlegg",
      employeeCount: "0-5",
      itCompetence: "ingen", // Added IT competence field
    }
  );

  useEffect(() => {
    if (savedCompanyInfo) {
      setCompanyInfo(savedCompanyInfo);
    }
  }, [savedCompanyInfo]);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const industries = [
    "Velg bransje",
    "IT og Teknologi",
    "Helse og Omsorg",
    "Finans og Forsikring",
    "Detaljhandel",
    "Produksjon",
    "Utdanning",
    "Offentlig sektor",
    "Transport og Logistikk",
    "Bygg og Anlegg",
    "Annet",
  ];

  // For å unngå validering hvis brukeren kommer tilbake til siden med lagret info
  useEffect(() => {
    if (
      companyInfo.companyName &&
      companyInfo.industry &&
      companyInfo.employeeCount &&
      companyInfo.itCompetence // Added validation check for IT competence
    ) {
      setErrors({});
    }
  }, [companyInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyInfo({
      ...companyInfo,
      [name]: value,
    });

    // Fjern eventuelle feilmeldinger ved endring
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!companyInfo.companyName.trim()) {
      newErrors.companyName = "Bedriftsnavn er påkrevd";
    }

    if (
      companyInfo.industry === "" ||
      companyInfo.industry === "Velg bransje"
    ) {
      newErrors.industry = "Vennligst velg en bransje";
    }

    if (!companyInfo.employeeCount) {
      newErrors.employeeCount = "Vennligst velg antall ansatte";
    }

    if (!companyInfo.itCompetence) {
      newErrors.itCompetence = "Vennligst velg IT-kompetansenivå";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      // Send data til hovedapplikasjonen
      onComplete(companyInfo);
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="company-info-form-card">
      <h2>Bedriftsinformasjon</h2>

      <form onSubmit={handleSubmit} className="company-info-form">
        <div className="form-group">
          <label htmlFor="companyName">Bedriftsnavn</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={companyInfo.companyName}
            onChange={handleChange}
            className={errors.companyName ? "input-error" : ""}
            placeholder="Skriv inn bedriftsnavn"
          />
          {errors.companyName && (
            <div className="error-message">{errors.companyName}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="industry">Bransje</label>
          <select
            id="industry"
            name="industry"
            value={companyInfo.industry}
            onChange={handleChange}
            className={errors.industry ? "input-error" : ""}
          >
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
          {errors.industry && (
            <div className="error-message">{errors.industry}</div>
          )}
        </div>

        <div className="form-group">
          <label>Antall ansatte</label>
          <div className="radio-group">
            <div className="radio-option">
              <input
                type="radio"
                id="small"
                name="employeeCount"
                value="0-5"
                checked={companyInfo.employeeCount === "0-5"}
                onChange={handleChange}
              />
              <label htmlFor="small">0-5</label>
            </div>

            <div className="radio-option">
              <input
                type="radio"
                id="medium"
                name="employeeCount"
                value="5-10"
                checked={companyInfo.employeeCount === "5-10"}
                onChange={handleChange}
              />
              <label htmlFor="medium">5-10</label>
            </div>

            <div className="radio-option">
              <input
                type="radio"
                id="large"
                name="employeeCount"
                value="10+"
                checked={companyInfo.employeeCount === "10+"}
                onChange={handleChange}
              />
              <label htmlFor="large">Mer enn 10</label>
            </div>
          </div>
          {errors.employeeCount && (
            <div className="error-message">{errors.employeeCount}</div>
          )}
        </div>

        <div className="form-group">
  <label>Din personlige kompetanse innen cybersikkerhet</label>
  <p className="form-description small-text">Velg alternativet som best beskriver din kunnskap om cybersikkerhet.</p>
  <div className="radio-group">
    <div className="radio-option">
      <input
        type="radio"
        id="securityNone"
        name="itCompetence"
        value="ingen"
        checked={companyInfo.itCompetence === "ingen"}
        onChange={handleChange}
      />
      <label htmlFor="securityNone" className="small-text">
        <strong>Ingen erfaring</strong>
        <p className="option-description small-text">Jeg har lite eller ingen kunnskap om IT eller cybersikkerhet.</p>
      </label>
    </div>

    <div className="radio-option">
      <input
        type="radio"
        id="securityBasic"
        name="itCompetence"
        value="grunnleggende"
        checked={companyInfo.itCompetence === "grunnleggende"}
        onChange={handleChange}
      />
      <label htmlFor="securityBasic" className="small-text">
        <strong>Grunnleggende</strong>
        <p className="option-description small-text">Jeg kjenner til enkel passordbruk og vanlige trusler.</p>
      </label>
    </div>

    <div className="radio-option">
      <input
        type="radio"
        id="securityIntermediate"
        name="itCompetence"
        value="medium"
        checked={companyInfo.itCompetence === "medium"}
        onChange={handleChange}
      />
      <label htmlFor="securityIntermediate" className="small-text">
        <strong>Middels</strong>
        <p className="option-description small-text">Jeg har IT-kunnskap eller jobber med IT, med noe sikkerhetsforståelse.</p>
      </label>
    </div>

    <div className="radio-option">
      <input
        type="radio"
        id="securityAdvanced"
        name="itCompetence"
        value="avansert"
        checked={companyInfo.itCompetence === "avansert"}
        onChange={handleChange}
      />
      <label htmlFor="securityAdvanced" className="small-text">
        <strong>Avansert</strong>
        <p className="option-description small-text">Jeg jobber med eller har spesialisert kunnskap om cybersikkerhet.</p>
      </label>
    </div>
  </div>
  {errors.itCompetence && (
    <div className="error-message small-text">{errors.itCompetence}</div>
  )}
</div>



        <div className="form-actions">
          <button
            type="submit"
            className="start-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Behandler..." : "Start sikkerhetsvurdering"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default StartPage;
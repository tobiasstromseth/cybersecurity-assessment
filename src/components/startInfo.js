// src/components/StartInfo.js
import React from "react";
import "../styles/components/StartInfo.css";

const StartInfo = ({ onComplete }) => {
  return (
    <div className="start-info-container">
      <div className="info-card">
        <h2>Start Info</h2>
        
        <div className="info-section">
          <h3>Om verktøyet</h3>
          <p>
            Dette verktøyet er designet for å hjelpe din bedrift med å evaluere og 
            forbedre sin cybersikkerhetsstilling. Ved å besvare noen enkle spørsmål 
            vil du få en individuell vurdering av din nåværende sikkerhetssituasjon 
            og anbefalinger for forbedringer.
          </p>
        </div>
        
        <div className="info-section">
          <h3>Hvordan det fungerer</h3>
          <ol>
            <li>Fyll inn grunnleggende informasjon om bedriften din</li>
            <li>Svar på spørsmål om dine nåværende sikkerhetsrutiner</li>
            <li>Motta en sikkerhetsscore og personlige anbefalinger</li>
            <li>Implementer anbefalte tiltak for å forbedre sikkerheten</li>
          </ol>
        </div>
        
        <div className="info-section">
          <h3>Fordeler</h3>
          <ul>
            <li>Rask og enkel evaluering av din sikkerhetsstilling</li>
            <li>Praktiske anbefalinger tilpasset din bedriftsstørrelse og bransje</li>
            <li>Prioriterte tiltak basert på risiko og implementeringskompleksitet</li>
            <li>Konkrete steg for å beskytte din bedrift mot cybertrusler</li>
          </ul>
        </div>
        
        <div className="info-section">
          <h3>Konfidensialitet</h3>
          <p>
            All informasjon du oppgir behandles konfidensielt og lagres lokalt 
            i din nettleser. Ingen data overføres til eksterne servere.
          </p>
        </div>
        
        <button 
          className="primary-button"
          onClick={onComplete}
        >
          Kom i gang
        </button>
      </div>
    </div>
  );
};

export default StartInfo;
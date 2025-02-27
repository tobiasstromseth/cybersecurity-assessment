// src/components/MeasuresOverview.js
import React, { useState } from "react";
import "../styles/MeasuresOverview.css";

function MeasuresOverview({ measures }) {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["all", ...new Set(measures.map((m) => m.category))];

  const filteredMeasures = measures.filter((measure) => {
    const matchesCategory = filter === "all" || measure.category === filter;
    const matchesSearch =
      measure.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      measure.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="measures-overview-container">
      <h2>Alle anbefalte tiltak</h2>

      <div className="measures-filters">
        <div className="search-container">
          <input
            type="text"
            placeholder="Søk i tiltak..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={filter === category ? "active" : ""}
              onClick={() => setFilter(category)}
            >
              {category === "all" ? "Alle kategorier" : category}
            </button>
          ))}
        </div>
      </div>

      <div className="measures-grid">
        {filteredMeasures.length > 0 ? (
          filteredMeasures.map((measure) => (
            <div key={measure.id} className="measure-card">
              <div
                className="measure-priority"
                data-priority={measure.priority.toLowerCase()}
              >
                {measure.priority} prioritet
              </div>
              <h3>{measure.title}</h3>
              <p>{measure.description}</p>
              <div className="measure-reason">{measure.reason}</div>
              <div className="measure-category">{measure.category}</div>
            </div>
          ))
        ) : (
          <div className="no-measures">
            <p>Ingen tiltak funnet med gjeldende filtre.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MeasuresOverview;

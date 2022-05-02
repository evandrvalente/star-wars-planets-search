import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchPlanets from '../service/planetsAPI';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filtersResult, setFiltersResult] = useState([]);
  const [loading, setLoading] = useState(false);
  // incluir filters

  async function getPlanets() {
    setLoading(true);
    const response = await fetchPlanets();
    const { results } = response;
    setPlanets(results);
    setFiltersResult(results);
    setLoading(false);
  }

  const contextValue = {
    planets,
    setPlanets,
    getPlanets,
    filtersResult,
    setFiltersResult,
    loading,
    // incluir filters
  };

  useEffect(() => {
    getPlanets();
  }, []);

  return (
    <PlanetsContext.Provider value={ contextValue }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PlanetsProvider;

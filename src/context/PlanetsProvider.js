import React, { useState } from 'react';
import fetchPlanets from '../service/planetsAPI';
import PlanetContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(false);
  // incluir filters

  async function getPlanets() {
    setLoading(true);
    const response = await fetchPlanets();
    const { results } = response;
    setPlanets(results);
    setLoading(false);
  }

  const contextValue = {
    planets,
    getPlanets,
    loading,
    // incluir filters
  };

  return (
    <PlanetContext.Provider value={ contextValue }>
      {children}
    </PlanetContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PlanetsProvider;

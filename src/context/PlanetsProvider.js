import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchPlanets from '../service/planetsAPI';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filtersResult, setFiltersResult] = useState([]);
  const [filterByName, setFilterByName] = useState({
    name: '',
  });
  const [activeFilters, setActiveFilters] = useState([]);
  const [filterByNumericValues, setFilterByNumericValues] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [loading, setLoading] = useState(false);

  async function getPlanets() {
    setLoading(true);
    const response = await fetchPlanets();
    const { results } = response;
    setPlanets(results);
    setFiltersResult(results);
    setLoading(false);
  }

  const tratarDados = (linha) => {
    const bools = [];

    activeFilters.forEach((filter) => {
      switch (filter.comparison) {
      case 'maior que':
        bools.push(Number(linha[filter.column]) > Number(filter.value));
        break;
      case 'menor que':
        bools.push(Number(linha[filter.column]) < Number(filter.value));
        break;
      case 'igual a':
        bools.push(Number(linha[filter.column]) === Number(filter.value));
        break;
      default:
        return true;
      }
    });
    return bools.every((el) => el);
  };

  const updateTableData = () => {
    const newTableData = planets.filter(tratarDados);
    setFiltersResult(newTableData);
  };

  const contextValue = {
    planets,
    setPlanets,
    getPlanets,
    filtersResult,
    setFiltersResult,
    filterByName,
    setFilterByName,
    activeFilters,
    setActiveFilters,
    filterByNumericValues,
    setFilterByNumericValues,
    loading,
    updateTableData,
    // incluir filters
  };

  useEffect(() => {
    getPlanets();
  }, []);

  useEffect(() => {
    updateTableData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilters]);

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

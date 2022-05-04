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
  const [columnSort, setColumnSort] = useState({
    order: {
      column: '',
      sort: 'ASC',
    },
  });

  async function getPlanets() {
    setLoading(true);
    const response = await fetchPlanets();
    const { results } = response;
    setPlanets(results);
    const firstTable = results.sort((a, b) => a.name.localeCompare(b.name));
    // método de ordenação sugerido no stackoverflow https://pt.stackoverflow.com/questions/46600/como-ordenar-uma-array-de-objetos-com-array-sort
    setFiltersResult(firstTable);
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

  const sortTable = (a, b) => {
    const { order } = columnSort;
    const { sort, column } = order;
    let sorted;
    if (sort === 'ASC') {
      sorted = Number(a[column]) - Number(b[column]);
    }
    if (sort === 'DESC') {
      sorted = Number(b[column]) - Number(a[column]);
    }
    const negativeNumber = -1;
    if (b[column] === 'unknown') return negativeNumber;

    return sorted;
  };

  const updateTableData = () => {
    const newTableData = planets.filter(tratarDados).sort(sortTable);
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
    columnSort,
    setColumnSort,
  };

  useEffect(() => {
    getPlanets();
  }, []);

  useEffect(() => {
    const { order } = columnSort;
    updateTableData();
    console.log(order);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilters, columnSort]);

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

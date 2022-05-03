import React, { useContext, useState, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function PlanetsFilters() {
  const {
    planets,
    setFiltersResult,
    filterByName,
    setFilterByName,
    activeFilters,
    setActiveFilters,
    filterByNumericValues,
    setFilterByNumericValues,
    updateTableData,
  } = useContext(PlanetsContext);
  const optionsList = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water'];

  const [columnOptions, setColumnOptions] = useState(optionsList);

  const updateColumnOptions = () => {
    setFilterByNumericValues({
      column: columnOptions[0],
      comparison: 'maior que',
      value: 0,
    });
  };

  const filterPlanetName = (value) => {
    const planetsListbyName = planets.filter(({ name }) => name.includes(value));
    setFiltersResult(planetsListbyName);
  };

  const handleNameChange = ({ target: { value } }) => {
    setFilterByName({ ...filterByName, name: value });
    filterPlanetName(value);
  };

  const handleFilterInput = ({ target: { name, value } }) => {
    setFilterByNumericValues({ ...filterByNumericValues, [name]: value });
    console.log(filterByNumericValues);
  };

  const addFilter = () => {
    setActiveFilters([...activeFilters, filterByNumericValues]);
    updateTableData();
    console.log(filterByNumericValues.column);
    const itemOut = filterByNumericValues.column;
    const newColumnsOptionsList = columnOptions.filter((item) => item !== itemOut);
    console.log(newColumnsOptionsList);
    setColumnOptions(newColumnsOptionsList);
    console.log(columnOptions);
    updateColumnOptions();
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setFilterByNumericValues({
      column: '',
      comparison: '',
      value: '',
    });
    setFiltersResult(planets);
    setColumnOptions(optionsList);
  };

  useEffect(() => {
    updateColumnOptions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnOptions]);

  return (
    <div>
      <form>
        <input
          data-testid="name-filter"
          value={ filterByName.name }
          onChange={ handleNameChange }
        />
        <select
          data-testid="column-filter"
          name="column"
          value={ filterByNumericValues.column }
          onChange={ handleFilterInput }
        >
          {columnOptions
            .map((column) => (
              <option value={ column } key={ column }>
                {column}
              </option>
            ))}
        </select>
        <select
          data-testid="comparison-filter"
          name="comparison"
          value={ filterByNumericValues.comparison }
          onChange={ handleFilterInput }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          data-testid="value-filter"
          type="number"
          name="value"
          value={ filterByNumericValues.value }
          onChange={ handleFilterInput }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ addFilter }
        >
          FILTRAR
        </button>
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ clearAllFilters }
        >
          LIMPAR FILTROS
        </button>
      </form>
      {activeFilters.map((filter, index) => (
        <div
          className="filters"
          data-testid="filter"
          key={ index }
        >
          <button
            type="button"
            className="limpar"
            onClick={ () => {
              const cloneArray = [...activeFilters];
              cloneArray.splice(index, 1);
              setActiveFilters(cloneArray);
              setFiltersResult(planets);
              setColumnOptions([...columnOptions, filter.column]);
              updateColumnOptions();
              updateTableData();
            } }
          >
            X
          </button>
          {filter.column}
          {' '}
          {filter.comparison}
          {' '}
          {filter.value}
        </div>
      ))}
    </div>
  );
}

export default PlanetsFilters;

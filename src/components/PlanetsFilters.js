import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function PlanetsFilters() {
  const {
    planets,
    // filtersResult,
    setFiltersResult,
    filterByName,
    setFilterByName,
    activeFilters,
    setActiveFilters,
    filterByNumericValues,
    setFilterByNumericValues,
    updateTableData,
  } = useContext(PlanetsContext);

  const columnOptions = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water'];

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
  };

  const handleOptions = (option) => !activeFilters
    .find((filtro) => option === filtro.column);

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
            .filter(handleOptions)
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
          onClick={ () => {
            setActiveFilters([...activeFilters, filterByNumericValues]);
            setFilterByNumericValues({
              column: '',
              comparison: '',
              value: '',
            });
            updateTableData();
          } }
        >
          FILTRAR
        </button>
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ () => {
            setActiveFilters([]);
            setFilterByNumericValues({
              column: '',
              comparison: '',
              value: '',
            });
            setFiltersResult(planets);
          } }
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
              updateTableData();
            } }
          >
            X
          </button>
          {filter.column}
          {' '}
          {filter.condition}
          {' '}
          {filter.value}
        </div>
      ))}
    </div>
  );
}

export default PlanetsFilters;

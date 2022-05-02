import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

// setar um estado para os planetas encontrados após filtros

function PlanetsFilters() {
  const { planets, setFiltersResult } = useContext(PlanetsContext);
  // const [planetName, setPlanetName] = useState('');
  const [filterByName, setFilterByName] = useState({
    name: '',
  });

  const filterPlanetName = (value) => {
    const planetsListbyName = planets.filter(({ name }) => name.includes(value));
    setFiltersResult(planetsListbyName);
  };

  const handleNameChange = ({ target: { value } }) => {
    setFilterByName({ ...filterByName, name: value });
    filterPlanetName(value);
  };

  return (
    <form>
      <input
        data-testid="name-filter"
        value={ filterByName.name }
        onChange={ handleNameChange }
      />
    </form>
  );
}

export default PlanetsFilters;

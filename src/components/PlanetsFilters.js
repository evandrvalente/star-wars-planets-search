import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

// setar um estado para os planetas encontrados após filtros

function PlanetsFilters() {
  const { planets } = useContext(PlanetsContext);
  console.log(planets);
  return (
    <div>
      filters here
    </div>
  );
}

export default PlanetsFilters;

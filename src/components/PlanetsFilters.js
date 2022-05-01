import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

// setar um estado para os planetas encontrados após filtros

function Filters() {
  const { planets } = useContext(PlanetsContext);

  console.log(planets);
  return (
    <div>
      filters here
    </div>
  );
}

export default Filters;

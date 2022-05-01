import React from 'react';
import './App.css';
import PlanetFilters from './components/PlanetsFilters';
import PlanetsTable from './components/PlanetsTable';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <div>
        <PlanetFilters />
        <PlanetsTable />
      </div>
    </PlanetsProvider>
  );
}

export default App;

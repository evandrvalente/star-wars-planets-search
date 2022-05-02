import React from 'react';
import './App.css';
import PlanetsFilters from './components/PlanetsFilters';
import PlanetsTable from './components/PlanetsTable';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <div>
        <PlanetsFilters />
        <PlanetsTable />
      </div>
    </PlanetsProvider>
  );
}

export default App;

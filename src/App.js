import React from 'react';
import './App.css';
import Filters from './components/Filters';
import PlanetsTable from './components/PlanetsTable';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <div>
        <Filters />
        <PlanetsTable />
      </div>
    </PlanetsProvider>
  );
}

export default App;

import React from 'react';

function PlanetsProvider({ children }) {
  return (
    <PlanetsProvider>
      {children}
    </PlanetsProvider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PlanetsProvider;

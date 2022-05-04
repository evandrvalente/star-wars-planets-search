import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function PlanetsTable() {
  const { filtersResult } = useContext(PlanetsContext);
  const tableHeader = [
    'Name',
    'Rotation Period',
    'Orbital Period',
    'Diameter',
    'Climate',
    'Gravity',
    'Terrain',
    'Surface Water',
    'Population',
    'Films',
    'Created',
    'Edited',
    'URL',
  ];
  return (
    <table>
      <thead>
        <tr>
          {
            tableHeader.map((el) => (
              <th key={ el }>{ el }</th>
            ))
          }
        </tr>
      </thead>

      <tbody>
        {
          filtersResult.map(({
            name, rotation_period: rotationPeriod,
            orbital_period: orbitalPeriod, diameter, climate, gravity,
            terrain, surface_water: surfaceWater, population, films, created, edited, url,
          }) => (
            <tr key={ name }>
              <td data-testid="planet-name">{name}</td>
              <td>{rotationPeriod}</td>
              <td>{orbitalPeriod}</td>
              <td>{diameter}</td>
              <td>{climate}</td>
              <td>{gravity}</td>
              <td>{terrain}</td>
              <td>{surfaceWater}</td>
              <td>{population}</td>
              <td>{films}</td>
              <td>{created}</td>
              <td>{edited}</td>
              <td>{url}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default PlanetsTable;

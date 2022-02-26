import React, { useContext } from 'react';

import StarContext from '../StarContext/StarContext';

const Table = () => {
  const { data } = useContext(StarContext);
  console.log(data);
  const filterPlanets = () => {
    const getNames = Object.keys(data[0]);
    const filterNames = getNames.filter((planetName) => planetName !== 'residents');
    return filterNames;
  };

  return (
    <table>
      <thead>
        <tr>
          {data && filterPlanets().map((names) => <th key={ names }>{names}</th>)}
        </tr>
      </thead>
      <tbody>
        {data && data.map((dataPlanets) => (
          <tr key={ dataPlanets.name }>
            <td>{dataPlanets.name}</td>
            <td>{dataPlanets.rotation_period}</td>
            <td>{dataPlanets.orbital_period}</td>
            <td>{dataPlanets.diameter}</td>
            <td>{dataPlanets.climate}</td>
            <td>{dataPlanets.gravity}</td>
            <td>{dataPlanets.terrain}</td>
            <td>{dataPlanets.surface_water}</td>
            <td>{dataPlanets.population}</td>
            <td>{dataPlanets.films}</td>
            <td>{dataPlanets.created}</td>
            <td>{dataPlanets.edited}</td>
            <td>{dataPlanets.url}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

import React, { useContext, useState } from 'react';

import StarContext from '../StarContext/StarContext';

const Table = () => {
  const { data, backupPlanets, setBackupPlanets } = useContext(StarContext);
  const filterPlanets = () => {
    const getNames = Object.keys(data[0]);
    const filterNames = getNames.filter((planetName) => planetName !== 'residents');
    return filterNames;
  };

  const [filterByName, setFilterByName] = useState({ name: '' });

  const handleInput = (event) => {
    const { value } = event.target;
    setFilterByName({ name: value });
    const filterNamePlanets = data.map((planet) => planet.name);
    const nameFilter = filterNamePlanets.filter((planet) => planet.includes(value));
    const dataPlanet = data.filter((planet) => nameFilter.includes(planet.name));
    setBackupPlanets(dataPlanet);
    console.log(dataPlanet);
  };

  return (
    <section>
      <form action="input">
        <label htmlFor="input">
          <input
            type="text"
            id="input"
            data-testid="name-filter"
            onChange={ handleInput }
          />
        </label>
      </form>
      <table>
        <thead>
          <tr>
            {backupPlanets
            && filterPlanets().map((names) => <th key={ names }>{names}</th>)}
          </tr>
        </thead>
        <tbody>
          {backupPlanets && backupPlanets.map((dataPlanets) => (
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
    </section>
  );
};

export default Table;

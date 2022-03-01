/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react';

import StarContext from '../StarContext/StarContext';

const defaultValues = { coluna: 'population', comparacao: 'maior que', valor: 0 };
const options = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water'];
const Table = () => {
  const [filterByName, setFilterByName] = useState({ name: '' });

  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [rulesObj, setRulesObj] = useState({ column: '', comparison: '', value: 0 });
  const { data, backupPlanets, setBackupPlanets } = useContext(StarContext);

  const filterPlanets = () => {
    const getNames = Object.keys(data[0]);

    const filterNames = getNames.filter((planetName) => planetName !== 'residents');

    return filterNames;
  };

  const filterOptions = () => {
    if (filterByNumericValues.length > 0) {
      /*    const test = filterByNumericValues.map((filterOption) => options.filter((filterRules) => filterOption !== filterRules.column)); */
      const newArray = filterByNumericValues
        .map((rules) => options
          .filter((column) => rules.column !== column));

      return newArray[0]
        .map((optionArray) => <option key={ optionArray }>{optionArray}</option>);
    }
    if (filterByNumericValues.length === 0) {
      return options.map((option) => <option key={ option }>{option}</option>);
    }
  };

  const handleInput = (event) => {
    const { value } = event.target;

    setFilterByName({ name: value });

    const filterNamePlanets = data.map((planet) => planet.name);

    const nameFilter = filterNamePlanets.filter((planet) => planet.includes(value));

    const dataPlanet = data.filter((planet) => nameFilter.includes(planet.name));

    setBackupPlanets(dataPlanet);
  };

  const filterButton = () => {
    setFilterByNumericValues([
      ...filterByNumericValues,
      rulesObj,
    ]);
  };

  const handleFilterArray = (column, comparison, value, planet) => {
    if (comparison === 'maior que') {
      return planet[column] > Number(value);
    }
    if (comparison === 'menor que') {
      return planet[column] < Number(value);
    }
    if (comparison === 'igual a') {
      return planet[column] === value;
    }
  };

  const getArray = (column, comparison, value) => backupPlanets
    .filter((planet) => handleFilterArray(column, comparison, value, planet));

  const takeInputText = (event) => {
    const { value, name } = event.target;
    setRulesObj({
      ...rulesObj,
      [name]: value });
  };

  useEffect(() => {
    if (filterByNumericValues.length > 0) {
      filterByNumericValues.forEach((rules) => {
        const { column, comparison, value } = rules;

        if (column && comparison && value) {
          const arrayFilter = getArray(column, comparison, value);
          setBackupPlanets(arrayFilter);
        } else {
          const { coluna, comparacao, valor } = defaultValues;
          const arrayFilter = getArray(coluna, comparacao, valor);
          setBackupPlanets(arrayFilter);
        }
      });
    }
  }, [filterByNumericValues]);

  return (
    <section>

      <div>
        {filterByName.name}
      </div>
      <form action="input">
        <label htmlFor="input">
          <input
            type="text"
            id="input"
            data-testid="name-filter"
            onChange={ handleInput }
          />
        </label>
        <select name="column" data-testid="column-filter" onChange={ takeInputText }>
          {/* {options.map((option) => <option key={ option }>{option}</option>)} */}
          {filterOptions()}
        </select>

        <select
          name="comparison"
          data-testid="comparison-filter"
          onChange={ takeInputText }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>

        <label htmlFor="input-number">
          <input
            onChange={ takeInputText }
            name="value"
            id="input-number"
            type="number"
            value={ rulesObj.value }
            data-testid="value-filter"
          />

          <button
            type="button"
            data-testid="button-filter"
            onClick={ filterButton }
          >
            Filtrar
          </button>
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

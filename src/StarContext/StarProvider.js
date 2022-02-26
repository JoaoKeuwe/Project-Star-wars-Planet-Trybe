import React,
{ useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarContext from './StarContext';
import Api from '../services/Api';

const StarProvider = ({ children }) => {
  const [planets, setPlanets] = useState();

  useEffect(() => {
    const func = async () => {
      const data = await Api();
      setPlanets(data);
    };
    func();
  }, []);
  const value = {
    data: planets,

  };
  return (
    <StarContext.Provider value={ value }>
      {children}
    </StarContext.Provider>
  );
};

StarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarProvider;

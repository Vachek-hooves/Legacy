import {createContext, useContext, useState, useEffect} from 'react';

export const AppContext = createContext({});

export const AppContextProvider = ({children}) => {
  const value = {};

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }
  return context;
};

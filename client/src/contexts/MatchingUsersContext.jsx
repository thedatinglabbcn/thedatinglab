import React, { createContext, useContext, useState } from 'react';

const MatchingUsersContext = createContext();

export const MatchingUsersProvider = ({ children }) => {
  const [matchingUsers, setMatchingUsers] = useState([]);

  return (
    <MatchingUsersContext.Provider value={{ matchingUsers, setMatchingUsers }}>
      {children}
    </MatchingUsersContext.Provider>
  );
};

export const useMatchingUsers = () => {
  return useContext(MatchingUsersContext);
};
import React from "react";

export const CurrentAddressContext = React.createContext();

export const CurrentAddressProvider = ({ children }) => {
  const [currentAddress, setCurrentAddress] = React.useState();


  return (
    <CurrentAddressContext.Provider value={{ currentAddress, setCurrentAddress }}>
      {children}
    </CurrentAddressContext.Provider>
  );
};

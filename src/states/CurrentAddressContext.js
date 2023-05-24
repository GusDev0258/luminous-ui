import React from "react";

export const CurrentAddressContext = React.createContext();

export const CurrentAddressProvider = ({ children }) => {
  const [currentAddress, setCurrentAddress] = React.useState({});

 
  React.useEffect(() => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
      setCurrentAddress(params.address);
  }, []);

  return (
    <CurrentAddressContext.Provider value={{ currentAddress, setCurrentAddress }}>
      {children}
    </CurrentAddressContext.Provider>
  );
};

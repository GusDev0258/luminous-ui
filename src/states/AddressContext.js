import { createContext, useState } from 'react';
import useToken from '../view/app/useToken';

const AddressContext = createContext();

const AddressContextProvider = ({children}) => {
    const [hasAddress, setHasAddress] = useState({});
    return (
        <AddressContext.Provider value={{hasAddress, setHasAddress}}>
            {children}
        </AddressContext.Provider>
    );
};

export { AddressContext, AddressContextProvider };
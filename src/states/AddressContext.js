import { createContext, useState } from 'react';
import useToken from '../view/app/useToken';

const AddressContext = createContext();

const AddressContextProvider = ({children}) => {
    const [hasAddress, setHasAddress] = useState({});
    const [visible, setVisible] = useState(true);
    return (
        <AddressContext.Provider value={{hasAddress, setHasAddress, visible, setVisible}}>
            {children}
        </AddressContext.Provider>
    );
};

export { AddressContext, AddressContextProvider };
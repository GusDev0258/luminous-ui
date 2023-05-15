import { useState } from "react";

export default function useAddress() {
    const [hasAddress, setHasAddress] = useState(false);

    return {
        hasAddress,
        setHasAddress
    }
}
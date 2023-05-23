import React from 'react'

const useAddress = () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get:(searchParams, prop) => searchParams.get(prop),
  });
  const [address, setAddress] = React.useState(() =>{
    return params ? params.address : 0;
  });

  React.useEffect(()=>{
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get:(searchParams, prop) => searchParams.get(prop),
    });
    setAddress(params.address);
  },[]);
  return [
    address,
    setAddress
  ]
}

export default useAddress
import React from 'react'
import useToken from './useToken';
import Login from '../login/Login';
import Home from '../home/Home';

function App() {
  const {token } = useToken();

  if(!token) {
    return <Login/>
  }

    return(
      <div>
        <Home/>
      </div>
    )
  
}

export default App;

import { useState } from 'react';
import jwt from 'jwt-decode';

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  const getPayload = () => {
    if (token)
      return jwt(token);
  }

  return {
    setToken: saveToken,
    token,
    payload: getPayload()
  }
}
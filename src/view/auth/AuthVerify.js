import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useToken from '../app/useToken';

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export default function AuthVerify() {
  const { token } = useToken();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (token && location.pathname !== "/register") {
      const decodedJwt = parseJwt(token);
      
      if (decodedJwt.exp * 1000 < Date.now()) {
        navigate("/login");
      }
    }
  }, []);

  return ;
};
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useToken from '../app/useToken';

export default function AuthVerify() {
  const {payload} = useToken();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/register") {

      if (!payload || payload.exp * 1000 < Date.now()) {
        sessionStorage.removeItem('token');
        navigate("/login");
      }
    }
  }, []);

  return;
};
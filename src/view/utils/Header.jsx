import React from "react";
import {List, Flag} from '@phosphor-icons/react';
import { useNavigate } from "react-router-dom";
import { HouseSimple } from "phosphor-react";


const Header = ({textContent}) => {
  const redirectTo = () => navigate("/tariff-flag");
  const redirectToHome = () => navigate("/");
  const navigate = useNavigate();
  return (
    <>
      <header className="default-page-header">
        <button className="icon-button" onClick={redirectToHome}>
          <HouseSimple size={24} color="#482803" />
        </button>
        <h2 className="primary-title-header">{textContent}</h2>
        <button className="icon-button" onClick={redirectTo}>
          <Flag size={24} color="#A3E635" />

        </button>
      </header>
    </>
  );
};

export default Header;

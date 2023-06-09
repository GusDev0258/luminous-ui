import React from "react";
import {List, Flag} from '@phosphor-icons/react';
const Header = ({textContent}) => {
  return (
    <>
      <header className="default-page-header">
        <button className="icon-button">
          <List size={24} color="#482803" />
        </button>
        <h2 className="primary-title-header">{textContent}</h2>
        <button className="icon-button">
          <Flag size={24} color="#A3E635" />
        </button>
      </header>
    </>
  );
};

export default Header;

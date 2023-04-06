import { useState } from 'react';

export default function useWhiteTax() {
  const getWhiteTax = () => {
    const whiteTaxString = sessionStorage.getItem('whiteTaxes');
    const whiteTax = JSON.parse(whiteTaxString);
    return whiteTax?.whiteTaxes;
  };

  const [whiteTaxes, setWhiteTax] = useState(getWhiteTax());

  const saveWhiteTax = whiteTax => {
    sessionStorage.setItem('whiteTaxes', JSON.stringify(whiteTax));
    setWhiteTax(whiteTax.whiteTaxes);
  };

  return {
    setWhiteTaxes: saveWhiteTax,
    whiteTaxes
  }
}
import useToken from "../app/useToken";
import useWhiteTax from "./useTax"
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { useEffect, useState } from "react";
import Loading from '../loading/Loading';



export default function WhiteTax() {
  const {whiteTaxes, setWhiteTaxes} = useWhiteTax();
  const {token} = useToken();
  const [selectedItem, setSelectedItem] = useState("");
  const [company, setCompany] = useState(
    {
    companyName: 
    "Amazonas Energia",
    endHourHighPrice:"23:00",
    endHourLowPrice:"18:30",
    finalEndHourMiddlePrice:
    "00:00",
    finalStartHourMiddlePrice:"23:00",
    highPrice:1.615,
    initialEndHourMiddlePrice:"20:00",
    initialStartHourMiddlePrice:"19:00",
    lowPrice: 0.709,
    middlePrice:1.07,
    regularPrice:
    0.835,
    save:
    0.12,
    startHourHighPrice:"20:00",
    startHourLowPrice:
    "00:00"}
    );
  const [prices, setPrices] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  const labels = ['00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30'
  , '05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30'
  , '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  , '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30'
  , '23:00', '23:30'];

  const getWhiteTaxes = async (token) => {
     let data = await fetch('http://localhost:8080/api/white-taxes/', {
       method: 'GET',
       headers: {
        Accept: 'application/json',
        'Authorization':`Bearer ${token}`,
        'Content-Type': 'application/json',
       },
     })
       .then(data => data.json())
       setCompany(data[0]);
       setWhiteTaxes({whiteTaxes: data});
  
  }

  const searchForExpecificCompany = (companyName) => {
    return whiteTaxes.filter((whiteTax) => whiteTax.companyName === companyName);
  }

  const handleChange = (e) => {
    const [companyData] = searchForExpecificCompany(e.target.value);
    setCompany(companyData);
    setSelectedItem(e.target.value);
    
  }
  
  // eslint-disable-next-line array-callback-return, react-hooks/exhaustive-deps
  const convertToHour = (hour) => {
    return hour === '00:00' ? '23:59' : hour;
  }

  const loadGraph = (companyy) => {
    const updatedPrices = [];
    labels.forEach((hour, index) => {
      const betweenHighPrice = hour >= companyy.startHourHighPrice && hour < companyy.endHourHighPrice;
      const betweenInitialMiddlePrice = hour >= companyy.initialStartHourMiddlePrice  && hour < companyy.initialEndHourMiddlePrice;
      const betweenFinalMiddlePrice = hour >= companyy.finalStartHourMiddlePrice && hour < convertToHour(companyy.finalEndHourMiddlePrice);
      let price;
      
        if(betweenHighPrice) {
          price = companyy.highPrice;
          
        } else if(betweenInitialMiddlePrice || betweenFinalMiddlePrice){
          price = companyy.middlePrice;
      
        } else {
          price = companyy.lowPricex;
    }

    updatedPrices[index] = price;

    })
    setPrices(updatedPrices);
  }

  useEffect(() => {
    loadGraph(company);
  }, [company]) 

  if(!whiteTaxes) {
    getWhiteTaxes(token);
    return <Loading/>
  } else {
  return (
    <div>
      <div>
        <form>
        <select onChange={(e) => handleChange(e)} name="teste" value={selectedItem}>
        {whiteTaxes.map((whiteTax, index) =>
          <option value={whiteTax.companyName} key={index}>{whiteTax.companyName}</option>
        )}
        </select>
        </form>
      </div>
     <div>
          <Chart type='bar'
          data={{
            labels: labels,
            datasets: [
              {
                id: 1,
                label: 'preços',
                data: prices,
              }
            ],
          }} />
     </div>
      
    </div>
  ) }
}
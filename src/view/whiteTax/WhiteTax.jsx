import useToken from "../app/useToken";
import useWhiteTax from "./useTax"
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { useEffect, useState } from "react";
import Loading from '../loading/Loading';
import { getWhiteTaxes } from "../../api/FetchWhiteTaxes";

export default function WhiteTax() {
  const {whiteTaxes, setWhiteTaxes} = useWhiteTax();
  const {token} = useToken();
  const [selectedItem, setSelectedItem] = useState("");
  const [company, setCompany] = useState({});
  const [prices, setPrices] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  const labels = ['00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30'
  , '05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30'
  , '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  , '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30'
  , '23:00', '23:30'];



  const searchForExpecificCompany = (companyName) => {
    return whiteTaxes.filter((whiteTax) => whiteTax.energyProvider.companyName === companyName);
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
          price = companyy.lowPrice;
    }

    updatedPrices[index] = price;

    })
    setPrices(updatedPrices);
  }

  useEffect(() => {
    loadGraph(company);
  }, [company])

  if(!whiteTaxes) {
    (async () => {
      const data = await getWhiteTaxes(token);
      setCompany(data[0]);
        setWhiteTaxes({whiteTaxes: data});
    })()
    return <Loading/>
  } else {
  return (
    <div>
      <div>
        <form>
        <select onChange={(e) => handleChange(e)} name="white-taxes" value={selectedItem}>
        {whiteTaxes.map((whiteTax, index) =>
          <option value={whiteTax.energyProvider.companyName} key={index}>{whiteTax.energyProvider.companyName}</option>
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
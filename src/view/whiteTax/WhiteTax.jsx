import useToken from "../app/useToken";
import useWhiteTax from "./useTax";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { useEffect, useState } from "react";
import Loading from "../loading/Loading";
import { getWhiteTaxes } from "../../api/FetchWhiteTaxes";

const RED_COLOR = "#FF0F00";
const YELLOW_COLOR = "#FFC700";
const GREEN_COLOR = "#24FF00";
const CYAN_COLOR = "#00BED0";

export default function WhiteTax() {
  const { whiteTaxes, setWhiteTaxes } = useWhiteTax();
  const { token } = useToken();
  const [selectedItem, setSelectedItem] = useState("");
  const [company, setCompany] = useState({});
  const [prices, setPrices] = useState(Array(48).fill(0));
  const [regularPrice, setRegularPrices] = useState(Array(48).fill(0));
  const [BGColor, setBGColor] = useState(Array(48).fill(RED_COLOR));
  const labels = [
    "00:00",
    "00:30",
    "01:00",
    "01:30",
    "02:00",
    "02:30",
    "03:00",
    "03:30",
    "04:00",
    "04:30",
    "05:00",
    "05:30",
    "06:00",
    "06:30",
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
    "23:30",
  ];

  const searchForExpecificCompany = (companyName) => {
    return whiteTaxes.filter(
      (whiteTax) => whiteTax.energyProvider.companyName === companyName
    );
  };

  const handleChange = (e) => {
    const [companyData] = searchForExpecificCompany(e.target.value);
    setCompany(companyData);
    setSelectedItem(e.target.value);
  };

  // eslint-disable-next-line array-callback-return, react-hooks/exhaustive-deps
  const convertToHour = (hour) => {
    return hour === "00:00" ? "23:59" : hour;
  };

  const loadGraph = (companyy) => {
    const updatedPrices = [];
    const backgroundColors = [];
    labels.forEach((hour, index) => {
      const betweenHighPrice =
        hour >= companyy.startHourHighPrice && hour < companyy.endHourHighPrice;
      const betweenInitialMiddlePrice =
        hour >= companyy.initialStartHourMiddlePrice &&
        hour < companyy.initialEndHourMiddlePrice;
      const betweenFinalMiddlePrice =
        hour >= companyy.finalStartHourMiddlePrice &&
        hour < convertToHour(companyy.finalEndHourMiddlePrice);
      let price;

      if (betweenHighPrice) {
        price = companyy.highPrice;
        backgroundColors[index] = RED_COLOR;
      } else if (betweenInitialMiddlePrice || betweenFinalMiddlePrice) {
        price = companyy.middlePrice;
        backgroundColors[index] = YELLOW_COLOR;
      } else {
        price = companyy.lowPrice;
        backgroundColors[index] = GREEN_COLOR;
      }
      updatedPrices[index] = price;
    });
    setBGColor(backgroundColors);
    setPrices(updatedPrices);
    setRegularPrices(regularPrice.map(() => company.regularPrice));
  };

  useEffect(() => {
    loadGraph(company);
  }, [company]);

  if (!whiteTaxes) {
    (async () => {
      const data = await getWhiteTaxes(token);
      setWhiteTaxes({whiteTaxes: data});
      setCompany(data[0]);
    })();
    return <Loading />;
  } else {
    return (
      <div>
        <form>
          <select
            onChange={(e) => handleChange(e)}
            name="white-taxes"
            value={selectedItem}
            className="default-form-input"
          >
            {whiteTaxes.map((whiteTax, index) => (
              <option value={whiteTax.energyProvider.companyName} key={index}>
                {whiteTax.energyProvider.companyName}
              </option>
            ))}
          </select>
        </form>
        <div className="chart-info-container">
          <div>Preço convencional: R${company.regularPrice}</div>
          <div>Economia KWh ao aderir a tarifa branca: R${company.save}</div>
          <div>Preço horário de ponta: R${company.highPrice}</div>
          <div>Preço horário de transição: R${company.middlePrice}</div>
          <div>Preço horário fora de ponta: R${company.lowPrice}</div>
        </div>
        <div></div>
        <div className="chart-container">
          <Chart
            type="bar"
            options={{maintainAspectRatio: false}}
            style={{display: "block", width: "1572px", height: "663px"}}
            data={{
              labels: labels,
              datasets: [
                {
                  id: 1,
                  label: "preços",
                  data: prices,
                  type: "bar",
                  backgroundColor: BGColor,
                },
                {
                  id: 2,
                  label: "valor padrão",
                  type: "line",
                  data: regularPrice,
                  backgroundColor: CYAN_COLOR,
                },
              ],
            }}
          />
        </div>
      </div>
    );
  }
}

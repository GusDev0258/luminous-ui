import React, { useState, useEffect } from "react";
import Header from "../utils/Header";
import { Chart } from "react-google-charts";
import DefaultSelection from "../utils/Form/DefaultSelection";
import { useParams, useNavigate } from "react-router-dom";
import useToken from "../app/useToken";
import { getReportAddressById } from "../../api/FetchAddress";

const AddressConsumptionReport = () => {
  //const { id } = useParams();
  const id = 10;
  const { token } = useToken();
  const navigate = useNavigate();
  const [report, setReport] = useState([]);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const report = await getReportAddressById(token, id);
        
        setReport(report);
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };

    fetchAddress();
  }, [id, token]);

  const [filter, setFilter] = useState("KWH");
  const getTitle = () => (filter === "KWH" ? "Consumo em Kwh" : "Consumo em Reais");

  const transformMonth = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "short" };
    return new Intl.DateTimeFormat("en-US", options).format(date).toUpperCase();
  };

  const generateChartData = () => {
    const devices = [...new Set(report.map((item) => item.name))];
    const chartData = [[getTitle(), ...devices]];

    const monthlyData = {};
    for (const entry of report) {
      const { period, name, energyConsumptionKWh, energyConsumptionReais } = entry;
      const month = transformMonth(period);
      const consumption = filter === "KWH" ? energyConsumptionKWh : energyConsumptionReais;

      if (!monthlyData[month]) {
        monthlyData[month] = { [name]: consumption };
      } else {
        monthlyData[month][name] = consumption;
      }
    }

    const months = Object.keys(monthlyData).sort((a, b) => new Date(a) - new Date(b));
    for (const month of months) {
      const row = [month];
      for (const device of devices) {
        const consumption = monthlyData[month][device] || 0;
        row.push(consumption);
      }
      chartData.push(row);
    }

    return chartData;
  };

  const options = {
    chart: {
      title: getTitle(),
    },
  };

  return (
    <div>
      <Header textContent="Relatório de Consumo" />
      <div>
        <DefaultSelection
          label="Filtrar por:"
          value={filter}
          setValue={setFilter}
          options={["KWH", "CRs"]}
        />
      </div>

      <Chart chartType="Bar" width="100%" height="400px" data={generateChartData()} options={options} />
    </div>
  );
};

export default AddressConsumptionReport;

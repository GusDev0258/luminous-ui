import React from "react";
import { useNavigate } from "react-router-dom";

import Header from "../utils/Header";
import ResidenciaIMG from "../../images/residencias.png";
import ConsumoIMG from "../../images/consumo.png";
import EquipamentosIMG from "../../images/equipamentos.png";
import FaturasIMG from "../../images/faturas.png";
import ManutencaoIMG from "../../images/manutencao.png";

export default function Home() {
  const navigate = useNavigate();
  const redirectToResidencias = () => navigate("/address");
  const redirectToConsumos = () => navigate("/consumption");
  const redirectToEquipamentos = () => navigate("/device");
  const redirectToFaturas = () => navigate("/energyBill");
  const redirectToManutencoes = () => navigate("/maintenance");
  return (
    <div>
      <Header textContent={"Pra onde ir?"} />
      <nav>
        <ul className="home-nav-list">
          <li>
            <button className="icon-button" onClick={redirectToResidencias}>
              <img src={ResidenciaIMG} alt="Cadastrar Residências"/>
              <span className="img-home-text">Cadastrar Residências</span>
            </button>
          </li>
          <li>
            <button className="icon-button" onClick={redirectToEquipamentos}>
              <img src={EquipamentosIMG} alt="Cadastrar Equipamentos"/>
              <span className="img-home-text">Cadastrar Equipamentos</span>
            </button>
          </li>
          <li>
            <button className="icon-button" onClick={redirectToFaturas}>
              <img src={FaturasIMG} alt="Cadastrar Faturas"/>
              <span className="img-home-text">Cadastrar Faturas</span>
            </button>
          </li>
          <li>
            <button className="icon-button" onClick={redirectToConsumos}>
              <img src={ConsumoIMG} alt="Consultar Consumo"/>
              <span className="img-home-text">Consultar Consumo</span>
            </button>
          </li>
          <li>
            <button className="icon-button" onClick={redirectToManutencoes}>
              <img src={ManutencaoIMG} alt="Consultar Manutenções"/>
              <span className="img-home-text">Consultar Manutenções</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

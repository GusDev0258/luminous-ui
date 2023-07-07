import React from 'react'
import Slider from 'react-slick';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {BASE_URL} from '../../api/DefaultUrl';
import TipCard from './TipCard';
import useToken from "../../states/useToken";
import TipImage from '../../images/tipImage.png';
import {LightbulbFilament} from 'phosphor-react';
import '../../css/Tip/TipCard.css';

const TipSlider = () => {
  const [tips, setTips] = React.useState([]);
  const {token} = useToken();

  React.useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await axios.get(`${BASE_URL}tip/getAll`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTips(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTips();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    arrows: false,
  };

  return (
    <div className="tip-card-container">
    <img src={TipImage} alt="Imagem de um parque" className="tip-card-image"/>
    <span className="tip-of-day">Dica do dia</span>
    <Slider {...settings}>
      {tips.map((tip) => (
        <TipCard key={tip.id} tip={tip} />
      ))}
    </Slider>
    </div>
  );
};

export default TipSlider;
import React from 'react'
import '../../css/Tip/TipCard.css';

const TipCard = ({tip}) => {
  return (
    <div>
      <section className="tip-card-content">
      <h3 className="tip-card-title">{tip.tipTitle}<span className="dot">.</span></h3>
      <p className="tip-card-text">{tip.tipMessage}</p>
      </section>
    </div>
  )
}

export default TipCard
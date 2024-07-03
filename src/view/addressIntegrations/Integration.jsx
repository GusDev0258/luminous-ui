import React from 'react'
import {Link} from 'react-router-dom';


const Integration = ({url, text, id}) => {
  return (
    <div className='integration-container'>
      <li className="integration-card" id={id}>
        <Link to={url} >{text}</Link>
      </li>
    </div>
  )
}

export default Integration
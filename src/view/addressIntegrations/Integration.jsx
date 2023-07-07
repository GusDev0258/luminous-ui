import React from 'react'
import {Link} from 'react-router-dom';


const Integration = ({url, text}) => {
  return (
    <div className='integration-container'>
      <li className="integration-card">
        <Link to={url} >{text}</Link>
      </li>
    </div>
  )
}

export default Integration
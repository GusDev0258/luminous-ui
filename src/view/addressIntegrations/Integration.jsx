import React from 'react'
import {Link} from 'react-router-dom';


const Integration = ({url, text}) => {
  return (
    <li className="integration-card">
      <Link to={url} >{text}</Link>
    </li>
  )
}

export default Integration
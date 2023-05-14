import { Box } from '@mantine/core'
import { FaAngular, FaNodeJs, FaHtml5, FaStackOverflow, FaAws, FaGoogle, FaReact } from 'react-icons/fa'
import React from 'react'

function TopCompany() {
  return (

    <Box mt={20} id="infinite" className="highway-slider">
      <div className="container highway-barrier">
        <ul className="highway-lane flex">
          <li className="highway-car"><FaAngular size={100} /></li>
          <li className="highway-car"><FaNodeJs size={100} /></li>
          <li className="highway-car"><FaHtml5 size={100} /></li>
          <li className="highway-car"><FaStackOverflow size={100} /></li>
          <li className="highway-car"><FaAws size={100} /></li>
          <li className="highway-car"><FaGoogle size={100} /></li>
          <li className="highway-car"><FaReact size={100} /></li>
          <li className="highway-car"><FaAngular size={100} /></li>
          <li className="highway-car"><FaNodeJs size={100} /></li>
          <li className="highway-car"><FaHtml5 size={100} /></li>
          <li className="highway-car"><FaStackOverflow size={100} /></li>
          <li className="highway-car"><FaAws size={100} /></li>
          <li className="highway-car"><FaGoogle size={100} /></li>
          <li className="highway-car"><FaReact size={100} /></li>
        </ul>
      </div>
    </Box>
  )
}

export default TopCompany
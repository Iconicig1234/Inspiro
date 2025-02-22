import React from 'react';
import logo from '../assets/RO.png';

function Logo({ width = "150px", height = "50px" }) {
  return (
    <img src={logo} style={{ width, height }} alt="logo here" />
  );
}

export default Logo;

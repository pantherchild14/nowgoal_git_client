import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import useStyles from './style';
import Navbar from './Navbar';

export default function Header() {
  const [userData, setUserData] = useState(null);



  function checkLocalStorage(itemName) {
    const storedValue = localStorage.getItem(itemName);
    return storedValue !== null;
  }
  const tokenExists = checkLocalStorage('token');
  const isLocalUser = localStorage.getItem('USER_NAME')
  const isLocalTimeZone = localStorage.getItem('TIME_ZONE')
  return (
    <Navbar title="Header" isLoggedIn={tokenExists} isLocalUser={isLocalUser} isLocalTimeZone={isLocalTimeZone} />
  );
}

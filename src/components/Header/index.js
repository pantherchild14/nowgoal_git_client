import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import useStyles from './style';
import Navbar from './Navbar';

export default function Header() {
  const [userData, setUserData] = useState(null);
  const sections = [
    { title: 'Livescore', url: '#' },
    { title: 'Favorites', url: '#' },
    { title: 'Results', url: '#' },
    { title: 'Schedule', url: '#' },
    { title: 'Community', url: '#' },
    { title: '6in1', url: 'http://localhost:3000/' },
    { title: 'Statistics', url: '#' },
  ];


  function checkLocalStorage(itemName) {
    const storedValue = localStorage.getItem(itemName);
    return storedValue !== null; 
  }
  const tokenExists = checkLocalStorage('token');
  const isLocalUser = localStorage.getItem('USER_NAME')
  return (
    <>
      <Navbar title="Header" sections={sections} isLoggedIn={tokenExists} isLocalUser={isLocalUser}/>
    </>
  );
}

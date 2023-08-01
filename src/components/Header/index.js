import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import useStyles from "./style";
import Navbar from './Navbar';

export default function Header() {
  const classes = useStyles();
  const sections = [
    { title: 'Livescore', url: '#' },
    { title: 'Favorites', url: '#' },
    { title: 'Results', url: '#' },
    { title: 'Schedule', url: '#' },
    { title: 'Community', url: '#' },
    { title: '6in1', url: '#' },
    { title: 'Statistics', url: '#' },
  ];
  return (
    <>
      {/* <Typography variant="h4" align="center" className={classes.container}>blog</Typography> */}
     <Navbar title="Header" sections={sections}/>
    </>
  )
}

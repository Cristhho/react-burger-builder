import React from 'react';
import { Link } from 'react-router-dom';

import burgerLogo from '../../assets/img/burger-logo.png';
import classes from './Logo.css';

const logo = () => (<Link to='/'><div className={classes.Logo}><img src={burgerLogo} alt="My Burger"/></div></Link>)

export default logo;
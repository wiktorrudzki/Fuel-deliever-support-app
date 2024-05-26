// import { useState } from "react";
import { Link } from 'react-router-dom';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Box, Button, Divider } from '@mui/material';

import mainLogo from '../icons/mainLogo.svg';
import './Sidebar.css';

export default function Sidebar() {
  const buttonStyles = () => ({
    margin: '10px',
    color: 'black',
    border: '1px solid #B3B3B3',
    padding: '10px 20px',
    fontSize: '20px',
    textTransform: 'none',
    width: '300px',
    height: '40px',
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: '#B3B3B3',
      color: 'white',
    },
  });
  // const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <Box className="sidebar-conatainer">
      <Box className="logo-container">
        <img src={mainLogo} alt="Main Logo" className="main-logo" />
      </Box>
      <Box className="stations-conatiner">
        <Button sx={buttonStyles} component={Link} to="/dashboard">
          Stacja nr 1
        </Button>
        <Button sx={buttonStyles} component={Link} to="/dashboard/order">
          Stacja nr 2
        </Button>
      </Box>
      <Divider sx={{ borderTop: '2px solid #B3B3B3' }} />
      <Box className="sidebar-button-group">
        <Box className="buttons2-conatiner">
          <Button sx={buttonStyles}>
            <CalendarMonthIcon className="sidebar-icon" /> Terminarz
          </Button>
          <Button sx={buttonStyles}>
            <LocalShippingIcon className="sidebar-icon" /> Dodaj dostawę{' '}
          </Button>
        </Box>
        <Box className="buttons3-conatiner">
          <Button sx={{ ...buttonStyles(), border: 'none' }}>
            Wyloguj się
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

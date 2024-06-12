import { Link, useNavigate } from 'react-router-dom';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Box, Button, Divider } from '@mui/material';

import { useUser } from '@/hooks';

import mainLogo from '../icons/mainLogo.svg';
import './Sidebar.css';

export default function Sidebar() {
  const buttonStyles = () => ({
    margin: '10px 25px',
    color: 'black',
    border: '1px solid #B3B3B3',
    padding: '10px 20px',
    fontSize: '20px',
    textTransform: 'none',
    width: '250px',
    height: '40px',
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: 'black',
      color: 'white',
    },
  });
  // const [isCollapsed, setIsCollapsed] = useState(false);

  const { setUser } = useUser();

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('Authorization');
    localStorage.removeItem('User');
    setUser(null);
    navigate('/login');
  };

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
          <Button
            sx={buttonStyles}
            component={Link}
            to="/dashboard/deliveryDetails"
          >
            <LocalShippingIcon className="sidebar-icon" /> Dodaj dostawę{' '}
          </Button>
        </Box>
        <Box>
          <Button onClick={logout} sx={buttonStyles}>
            Wyloguj się
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

import { Link, useNavigate } from 'react-router-dom';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Box, Button, Divider } from '@mui/material';

import { LoadingSpinner } from '@/components/LoadingOverlay';
import { useUser } from '@/hooks';
import { useStations } from '@/hooks';

import mainLogo from '../icons/mainLogo.svg';
import './Sidebar.css';

const buttonStyles = () => ({
  margin: '10px 0',
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

export default function Sidebar() {
  // const [isCollapsed, setIsCollapsed] = useState(false);

  const { setUser } = useUser();

  const navigate = useNavigate();

  const { stations, isLoading } = useStations();

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
        {isLoading ? (
          <LoadingSpinner />
        ) : stations.length ? (
          stations.map((s) => (
            <Button
              key={s.id}
              sx={buttonStyles}
              component={Link}
              to={`/dashboard/${s.id}`}
            >
              {s.name}
            </Button>
          ))
        ) : (
          <div>Brak stacji</div>
        )}
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
            to="/dashboard/delivery-details"
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

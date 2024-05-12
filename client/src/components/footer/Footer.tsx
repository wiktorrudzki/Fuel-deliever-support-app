import logo from './logo-group.svg';
import './style.css';

const Footer = () => {
  return (
    <div className="footer-container">
      <img src={logo} className="logo" alt="logo" />
      <div className="link-list">
        <a href="#" className="heading-link">
          Firma
        </a>
        <a href="#" className="link">
          O nas
        </a>
        <a href="#" className="link">
          Kontakt
        </a>
      </div>
    </div>
  );
};

export default Footer;

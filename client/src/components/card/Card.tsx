// project imports
import addressIcon from './icons/address_icon.svg';
import mapIcon from './icons/map_icon.svg';
import phoneIcon from './icons/phone_icon.svg';
import './style.css';

const Card = () => {
  return (
    <div className="card-container">
      <div className="card-title">
        <p className="title">Stacja nr 1</p>
      </div>
      <div className="card-content">
        <div className="phone-field content-field">
          <img src={phoneIcon} className="icon" alt="phone_icon" />
          <p className="phone content-text">tel: +48 000 000 000</p>
        </div>
        <div className="address-field content-field">
          <img src={addressIcon} className="icon" alt="address_icon" />
          <div className="address-data">
            <p className="content-text">kierownik: Imię Nazwisko</p>
            <p className="content-text">ul. Adresowa nr 1,</p>
            <p className="content-text">00-000 Miasto, Państwo</p>
          </div>
        </div>
        <div className="map-field content-field">
          <img src={mapIcon} className="map-icon" alt="map_icon" />
          <a href="/" className="map-link">
            Zobacz na mapie &gt;&gt;
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;

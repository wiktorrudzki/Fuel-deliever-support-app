// project imports
import { Station } from '@/types/station';

import addressIcon from './icons/address_icon.svg';
import mapIcon from './icons/map_icon.svg';
import phoneIcon from './icons/phone_icon.svg';
import './style.css';

type Props = {
  station: Station;
};

const Card = ({ station }: Props) => {
  return (
    <div className="card-container">
      <div className="card-title">
        <p className="title">Informacje o stacji</p>
      </div>
      <div className="card-content">
        <div className="phone-field content-field">
          <img src={phoneIcon} className="icon" alt="phone_icon" />
          <p className="phone content-text">tel: {station.phoneNumber}</p>
        </div>
        <div className="address-field content-field">
          <img src={addressIcon} className="icon" alt="address_icon" />
          <div className="address-data">
            <p className="content-text">kierownik: {station.owner}</p>
            <p className="content-text">{station.address}</p>
          </div>
        </div>
        <div className="map-field content-field">
          <img src={mapIcon} className="map-icon" alt="map_icon" />
          <a
            href={station.mapURL}
            target="_blank"
            className="map-link"
            rel="noreferrer"
          >
            Zobacz na mapie &gt;&gt;
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;

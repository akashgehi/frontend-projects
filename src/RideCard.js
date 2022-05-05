import React from 'react';
import './style.css';

export default function RideCard(currentElement) {
  return (
    <>
      <div className="rideCard" key={index}>
        <span className="imgPlaceholder">
          <img src={`${currentElement.map_url}1/400`} alt="" />
        </span>

        <span className="rideInfo">
          <li>
            Ride Id: <a> {currentElement.id}</a>
          </li>
          <li>
            Origin Station :<a>{currentElement.origin_station_code}</a>
          </li>
          <li>
            station_path : <a>{JSON.stringify(currentElement.station_path)}</a>
          </li>
          <li>
            Date : <a>{convertedDate}</a>
          </li>
          <li>
            Distance :<a> {currentElement.distance}</a>
          </li>
        </span>
        <span className="roundedPill push-left">{currentElement.city}</span>
        <span className="roundedPill">{currentElement.state}</span>
      </div>
    </>
  );
}

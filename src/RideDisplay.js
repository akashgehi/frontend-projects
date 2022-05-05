import React, { useState, useEffect } from 'react';
import './style.css';
import SortRides from './SortRides';

export default function RideDisplay({
  ridesToDisplay,
  filterFunction,
  rideCounts,
}) {
  return (
    <>
      
      <div className="rideDisplay">
        <div className="rideNavigation">
          <li id="nearestRides" onClick={(e) => filterFunction(e.target.id)}>
            Nearest Rides ({rideCounts[0]})
          </li>
          <li id="upcomingRides" onClick={(e) => filterFunction(e.target.id)}>
            Upcoming Rides ({rideCounts[1]})
          </li>
          <li
            id="pastRides"
            className=""
            onClick={(e) => filterFunction(e.target.id)}
          >
            Past Rides ({rideCounts[2]})
          </li>
          <li className="push-left" onClick="">
            <i className="fa-solid fa-bars-sort"></i>
            Filters
          </li>
        </div>

        <div className="rideList">
          {ridesToDisplay.map((currentElement, index) => {
            const convertedDate =
              new Date(
                currentElement.date.slice(6, 10),
                currentElement.date.slice(0, 2) - 1,
                currentElement.date.slice(3, 5)
              ).toDateString() +
              ' ' +
              currentElement.date.slice(11, 20);
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
                      Origin Station :
                      <a>{currentElement.origin_station_code}</a>
                    </li>
                    <li>
                      station_path :{' '}
                      <a>{JSON.stringify(currentElement.station_path)}</a>
                    </li>
                    <li>
                      Date : <a>{convertedDate}</a>
                    </li>
                    <li>
                      Distance :<a> {currentElement.distance}</a>
                    </li>
                  </span>
                  <span className="roundedPill push-left">
                    {currentElement.city}
                  </span>
                  <span className="roundedPill">{currentElement.state}</span>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

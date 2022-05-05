import React from 'react';
import './style.css';
import MainHeading from './MainHeading';
import RideDisplay from './RideDisplay';
import React, { useState, useEffect } from 'react';

export default function SortRides() {
  const [allRides, setAllRides] = useState([]); //list with all rides fetched from api
  const [userData, setUserData] = useState([]); // user data fetched from api
  const [nearestRides, setNearestRides] = useState([]); // list with rides nearest to user
  const [upcomingRides, setUpcomingRides] = useState([]); // list with upcoming rides
  const [pastRides, setPastRides] = useState([]); // list with rides having previous date
  const [filteredRides, setFilteredRides] = useState(pastRides); // final list used to display data on the basis of filter or category
  let user_station_code = 0; // using global variable to set user's station code
  let todaysDate = new Date(2022, 1, 15);
  const [active, setActive] = useState({
    activeTab: null,
    Tabs: { id: 'nearestRides', id: 'umcomingRides', id: 'pastRides' },
  });
  useEffect(() => {
    confirm(
      `I've purposefully set today's date to ${todaysDate} using "todaysDate" global variable to show rides in each category, as all the rides in the API are back dated.`
    );
    getRides(), getUser();
  }, []);

  // function for filtering rides according to category

  const filterRides = (category) => {
    if (!category) {
      document.getElementById(category).className = 'selected';
      document.getElementById('nearestRides').className = '';
      document.getElementById('upcomingRides').className = '';

      setFilteredRides(pastRides);
    }

    // displaying past rides

    if (category === 'pastRides') {
      document.getElementById(category).className = 'selected';
      document.getElementById('nearestRides').className = '';
      document.getElementById('upcomingRides').className = '';

      setFilteredRides(pastRides);
    }
    // displaying upcoming rides

    if (category === 'upcomingRides') {
      document.getElementById(category).className = 'selected';
      document.getElementById('nearestRides').className = '';
      document.getElementById('pastRides').className = '';

      setFilteredRides(upcomingRides);
    }
    // displaying nearest rides

    if (category === 'nearestRides') {
      document.getElementById(category).className = 'selected';
      document.getElementById('pastRides').className = '';
      document.getElementById('upcomingRides').className = '';

      setFilteredRides(nearestRides);
    }
  };

  // function for getting user data

  const getUser = async () => {
    let url = `https://assessment.api.vweb.app/user`;
    const response = await fetch(url);
    const data = await response.json();
    setUserData(data);
    user_station_code = data.station_code; // setting the user's station code
  };

  // function to get different ride lists
  const getRides = async () => {
    try {
      let url = `https://assessment.api.vweb.app/rides`;
      const response = await fetch(url);
      const data = await response.json();

      setAllRides(data);

      // adding the distance property to the list for calculating nearest rides

      const listWithDistance = data.map((currentObject) => {
        return {
          ...currentObject,
          distance: Math.abs(
            user_station_code -
              currentObject.station_path.reduce((a, b) => {
                return Math.abs(b - user_station_code) <
                  Math.abs(a - user_station_code)
                  ? b
                  : a;
              })
          ),
        };
      });
      // Getting the nearest rides from user's station code

      const sortedList = listWithDistance.sort((a, b) =>
        a.distance > b.distance ? 1 : -1
      );

      const nearestRidesList = sortedList;
      setNearestRides(nearestRidesList);

      // Getting the upcoming rides from current date

      const upcomingRidesList = sortedList.filter((currentElement) => {
        let convertedDate = new Date(
          currentElement.date.slice(6, 10),
          currentElement.date.slice(0, 2) - 1,
          currentElement.date.slice(3, 5)
        );
        return convertedDate >= todaysDate;
      });

      setUpcomingRides(upcomingRidesList);

      // setNearestRides(nearestRidesList);

      // Getting the upcoming rides from user's Date and time

      const pastRideList = sortedList.filter((currentElement) => {
        let convertedDate = new Date(
          currentElement.date.slice(6, 10),
          currentElement.date.slice(0, 2) - 1,
          currentElement.date.slice(3, 5)
        );
        return convertedDate < todaysDate;
      });
      setPastRides(pastRideList);

      setFilteredRides(nearestRides);

      const filters = function () {
        console.log('running filter function');
        const stateFiltered = filteredRides.filter((currentElement) => {
          if (currentElement.state === 'Kerala') return currentElement;
        });
        console.log(stateFiltered);
      };
      // Catch block
    } catch (error) {
      console.log('api error', error);
    }
  };

  RideDisplay.defaultProps;

  return (
    <>
      <MainHeading username={userData.name} profileUrl={userData.url} />

      <RideDisplay
        ridesToDisplay={filteredRides}
        filterFunction={filterRides}
        rideCounts={[
          nearestRides.length,
          upcomingRides.length,
          pastRides.length,
        ]}
      />
    </>
  );
}

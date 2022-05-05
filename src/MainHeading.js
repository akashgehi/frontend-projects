import React from 'react';
import './style.css';

export default function MainHeading({ username, profileUrl }) {

  return (
    <>
      <div className="topBar">
        <h1 className="logo">Edvora</h1>
        <h3 className="driverName">{username}</h3>
        <div className="photo">
          <img src={profileUrl} alt="" />
        </div>
      </div>
    </>
  );
}

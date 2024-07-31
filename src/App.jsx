import React, { useState } from 'react';
import NavBar from './component/client/navbar.jsx';
import Body from './component/client/body.jsx';
import Reservation from './component/client/reservation.jsx';

function App() {
  const [currentComponent, setCurrentComponent] = useState('body');

  const handleNavigation = (component) => {
    setCurrentComponent(component);
  };

  return (
    <>
      <NavBar onNavigate={handleNavigation} />
      {currentComponent === 'body' && <Body />}
      {currentComponent === 'reservation' && <Reservation />}
    </>
  );
}

export default App;

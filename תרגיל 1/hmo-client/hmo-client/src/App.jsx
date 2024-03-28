import React, { useState } from 'react';
import Member from './allMembers';
import Covids from './covid';
import MemberForm from './addMember'

function App() {
  const [showMember, setShowMember] = useState(false);
  const [showCovid, setShowCovid] = useState(false);
  const [showOtherComponent, setShowOtherComponent] = useState(false); // הוספת משתנה סטייט נוסף

  const handleMemberClick = () => {
    setShowMember(true);
    setShowCovid(false);
    setShowOtherComponent(false); // איפוס תצוגת הרכיב השלישי
  };

  const handleCovidClick = () => {
    setShowMember(false);
    setShowCovid(true);
    setShowOtherComponent(false); // איפוס תצוגת הרכיב השלישי
  };

  const handleOtherComponentClick = () => {
    setShowMember(false);
    setShowCovid(false);
    setShowOtherComponent(true); // הצגת הרכיב השלישי בלבד
  };

  return (
    <div>
      <h1>App</h1>
      <button onClick={handleMemberClick}>Show Member Component</button>
      <button onClick={handleCovidClick}>Show Covid Component</button>
      <button onClick={handleOtherComponentClick}>Show Other Component</button> {/* כפתור חדש */}
      {showMember && <Member />}
      {showCovid && <Covids />}
      {showOtherComponent && <MemberForm/>} {/* הצגת הרכיב השלישי */}
    </div>
  );
}

export default App;

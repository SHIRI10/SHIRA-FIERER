import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './covids.css'; // עיצוב עם CSS

function Covids() {
    const [covids, setCovids] = useState([]);

    // שאיבת הנתונים של כל הממברים
    useEffect(() => {
        axios.get('http://localhost:8080/covid_dataData')
            .then(response => {
                setCovids(response.data);
            })
            .catch(error => {
                alert(`Server failed: ${error}`);
                setCovids([]);
            });
    }, []);

    return (
        <div>
            <h2>Coronavirus Data</h2>
            <ul>
                {covids.map((member, index) => (
                    <li key={index} className="member-container">
                        <div className="member-details">
                            <p>Member ID: {member.member_id}</p>
                            <p>Discovery Date: {member.discovery_corona}</p>
                            <p>Recovery Date: {member.recovery}</p>
                            <p>Vaccine 1 Manufacturer: {member.manufacturer_vaccine1}</p>
                            <p>Vaccine 1 Date: {member.Vaccination1_date}</p>
                            <p>Vaccine 2 Manufacturer: {member.manufacturer_vaccine2}</p>
                            <p>Vaccine 2 Date: {member.Vaccination2_date}</p>
                            <p>Vaccine 3 Manufacturer: {member.manufacturer_vaccine3}</p>
                            <p>Vaccine 3 Date: {member.Vaccination3_date}</p>
                            <p>Vaccine 4 Manufacturer: {member.manufacturer_vaccine4}</p>
                            <p>Vaccine 4 Date: {member.Vaccination4_date}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Covids;

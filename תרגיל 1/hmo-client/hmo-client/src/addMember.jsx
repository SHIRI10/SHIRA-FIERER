import React, { useState } from 'react';
import axios from 'axios';

function MemberForm() {
    const [formData, setFormData] = useState({
        member_id: '',
        first_name: '',
        last_name: '',
        date_of_birth: '',
        city: '',
        street: '',
        building_num: '',
        phone: '',
        mobile_phone: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        axios.post('http://localhost:8080/members', formData)
            .then(response => {
                console.log('Data sent successfully:', response.data);
                // Clear the form after successful submission
                setFormData({
                    member_id: '',
                    first_name: '',
                    last_name: '',
                    date_of_birth: '',
                    city: '',
                    street: '',
                    building_num: '',
                    phone: '',
                    mobile_phone: ''
                });
            })
            .catch(error => {
                console.error('Failed to send data:', error);
            });
    };

    return (
        <div>
            <h2>Add New Member</h2>
            <form>
                <div>
                    <label htmlFor="member_id">Member ID:</label>
                    <input type="text" id="member_id" name="member_id" value={formData.member_id} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="first_name">First Name:</label>
                    <input type="text" id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="last_name">Last Name:</label>
                    <input type="text" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} />
                </div>
                {/* Add other input fields for date_of_birth, city, street, building_num, phone, mobile_phone */}
                <div>
                    <button type="button" onClick={handleSubmit}>Submit</button>
                </div>
            </form>
        </div>
    );
}

export default MemberForm;

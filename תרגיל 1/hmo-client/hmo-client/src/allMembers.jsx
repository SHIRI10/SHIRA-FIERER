import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Members.css'; // עיצוב עם CSS

function Members() {
    const [members, setMembers] = useState([]);
    const [updatedMem, setUpdatedMem] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/members');
                setMembers(response.data);
            } catch (error) {
                alert(`Server failed: ${error}`);
                setMembers([]);
            }
        };
    
        fetchData();
    }, []);

    const deleteMem = () => {
        axios.delete(`http://localhost:8080/members/${updatedMem.member_id}`)
            .then(response => {
                setUpdatedMem(null);
                setMembers(members.filter(mem => mem.member_id !== updatedMem.member_id));
            })
            .catch(error => {
                alert(`Failed to delete member: ${error}`);
            });
    }

    const handleEditSubChange = (sub, value) => {
        setUpdatedMem({ ...updatedMem, [sub]: value });
    };

    const handleSaveEdit = () => {
        console.log(updatedMem)
        axios.put(`http://localhost:8080/members/${updatedMem.member_id}`, updatedMem)
            .then(response => {
                setMembers(members.map(mem => (mem.member_id === updatedMem.member_id ? updatedMem : mem)));
                setUpdatedMem(null);
            })
            .catch(error => {
                alert(`Failed to save edited member: ${error}`);
            });
    };

    return (
        <div>
            <h2>Members List</h2>
            <ul>
                {members.map((member, index) => (
                    <li key={member.member_id} className="member-container">
                        <div className='member-details' key={member.member_id} onDoubleClick={() => { setUpdatedMem(member) }}>
                            <h6>{index + 1}</h6>
                            {updatedMem && updatedMem.member_id === member.member_id ? (
                                <>
                                    <h4>FIRST NAME:
                                        <input
                                            type="text"
                                            value={updatedMem.first_name || ''}
                                            onChange={(e) => handleEditSubChange("first_name", e.target.value)}
                                        />
                                    </h4>
                                    <h4>LAST NAME:
                                        <input
                                            type="text"
                                            value={updatedMem.last_name || ''}
                                            onChange={(e) => handleEditSubChange("last_name", e.target.value)}
                                        />
                                    </h4>
                                    <h4>date_of_birth:
                                        <input
                                            type="text"
                                            value={updatedMem.date_of_birth || ''}
                                            onChange={(e) => handleEditSubChange("date_of_birth", e.target.value)}
                                        />
                                    </h4>
                                    <h4>city:
                                        <input
                                            type="text"
                                            value={updatedMem.city || ''}
                                            onChange={(e) => handleEditSubChange("city", e.target.value)}
                                        />
                                    </h4>
                                    <h4>street:
                                        <input
                                            type="text"
                                            value={updatedMem.street || ''}
                                            onChange={(e) => handleEditSubChange("street", e.target.value)}
                                        />
                                    </h4>
                                    <h4>building_num:
                                        <input
                                            type="text"
                                            value={updatedMem.building_num || ''}
                                            onChange={(e) => handleEditSubChange("building_num", e.target.value)}
                                        />
                                    </h4>
                                    <h4>phone:
                                        <input
                                            type="text"
                                            value={updatedMem.phone || ''}
                                            onChange={(e) => handleEditSubChange("phone", e.target.value)}
                                        />
                                    </h4>
                                    <h4>mobile_phone:
                                        <input
                                            type="text"
                                            value={updatedMem.mobile_phone || ''}
                                            onChange={(e) => handleEditSubChange("mobile_phone", e.target.value)}
                                        />
                                    </h4>
                                    <button onClick={handleSaveEdit}>Save</button>
                                    <button onClick={() => setUpdatedMem(null)}>Cancel</button>
                                    <button onClick={deleteMem}>Delete</button>
                                </>
                            ) : (
                                <>
                                    <p>Member ID: {member.member_id}</p>
                                    <p>First Name: {member.first_name}</p>
                                    <p>Last Name: {member.last_name}</p>
                                </>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Members;

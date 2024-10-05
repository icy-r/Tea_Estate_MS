import React from 'react';

function EmployeeD(props) {
const {_id,firstName,lastName,Id,email,designation,address,age,dateOfBirth,
    dateOfJoining,department,salary,leavesLeft} = props.employee

    console.log(props.employee);
    return (
        <div>
            <h1>Employee Management</h1>
            <br></br>
            <h1>ID:{_id}</h1>
            <h1>First Name:{firstName}</h1>
            <h1>Last Name:{lastName}</h1>
            <h1>ID:{Id}</h1>
            <h1>Email:{email}</h1>
            <h1>Designation:{designation}</h1>
            <h1>Address:{address}</h1>
            <h1>Age:{age}</h1>
            <h1>Date of Birth:{dateOfBirth}</h1>
            <h1>Date of Joining:{dateOfJoining}</h1>
            <h1>Department:{department}</h1>
            <h1>Salary:{salary}</h1>
            <h1>Leaves Left:{leavesLeft}</h1>

        </div>
    );
};

export default EmployeeD;
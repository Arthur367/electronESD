import React, { Component, useState } from 'react'
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { createUser } from '../axios';
import InputLicense from './input_license';


function MainPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState("");
  const phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phone.match(phoneno)) {
      alert('Incorrect Phone Format');
    } else {
      const formData = {
        "fullName": fullName,
        "companyName": company,
        "contactPhone": phone,
        "email": email,
        "deviceId": "",
        "userNumbers": users
      }
      createUser(formData).then((result) => {
        console.log(result.data);
        if (result.status === 201) {
          alert(result.data["message"]);
          navigate('/license');
        }
      }).catch((err) => {
        if (err.response.status === 400) {
          alert(err.response.data["message"])
        }

      });

    }
    alert(`FullName is ${fullName}`);

  }
  const handleAnother = (e) => {
    navigate('/subUser');
  }
  return (
    <div>
      <h1>Hello world</h1>
      <button ><Link to="/subUser">User Anothers Key</Link></button>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input type="text" name="fullName" value={fullName} required={true} onChange={(e) => setFullName(e.target.value)} />
        </label>
        <label>
          Company Name:
          <input type="text" name="companyName" value={company} required={true} onChange={(e) => setCompany(e.target.value)} />
        </label>

        <label>
          Contact Phone No:
          <input type="phone" name="contactPhone" value={phone} required={true} onChange={(e) => setPhone(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={email} required={true} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Number Of Users:
          <input type="number" name="users" value={users} required={true} onChange={(e) => setUsers(e.target.value)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default MainPage

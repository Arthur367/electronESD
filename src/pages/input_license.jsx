import React, { Component, useState } from 'react'
import { Link } from 'react-router-dom'
import { signMainUser } from '../axios';

export default function InputLicense() {

  const [key, setKey] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      "deviceID": "",
      "key": key,
    }
    signMainUser(formData).then((result) => {
      console.log(result.data);
      if (result.status === 200) {
        alert(result.data["message"]);
      }


    }).catch((err) => {
      console.log(err.response.status)
      if (err.response.status === 400) {
        alert(err.response.data["message"])
      }
    });
  };
  return (
    <div>
      <div>
        <Link to="/">Go Back</Link>
        <form onSubmit={handleSubmit}>
          <label>
            License Key:
            <input type="text" name="license" value={key} required={true} onChange={(e) => setKey(e.target.value)} />
          </label>
          <input type="submit" value="Submit" />
        </form>

      </div>
    </div>
  )
}

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

function ShowPin()
{
    const [pin,setPin]=useState();
    const [apiData,setAPI]=useState(null);

    const HandlePin = (event) =>
    {
        setPin(event.target.value);
    };

    const HandleSearch = (event) => {
        event.preventDefault();
        const apiUrl = `https://api.postalpincode.in/pincode/${pin}`;
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                console.log('API Response:', data);
                setAPI(data); // Store API response data in state
      })
      .catch((error) => {
        console.error('API Error:', error);
      });
    };

    return(
        <div>
            <form onSubmit={HandleSearch}>
                <label>Enter Pincode</label><br/>
                <input type='text' placeholder='Pincode' 
                className='pincode' value={pin}  onChange={HandlePin} /><br/>
                <button>Lookup</button>
            </form>
            <div className="AddPin">
                {apiData && apiData[0].Status === 'Success' && (
                    apiData[0].PostOffice.map((office, index) => (
                        <div key={index} className="pin-item">
                            <div><span>Name </span>: {office.Name}</div>
                            <div><span>Branch Type </span>: {office.BranchType}</div>
                            <div><span>Delivery Status </span>: {office.DeliveryStatus}</div>
                            <div><span>District </span>: {office.District}</div>
                            <div><span>State </span>: {office.State}</div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

ReactDOM.render(<ShowPin/>,document.getElementById('appl'));
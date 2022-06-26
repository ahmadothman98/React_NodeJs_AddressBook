import {Map, Marker} from "pigeon-maps"
import { useState } from "react";




const MAIN_PAGE = () =>{

    const [location,setLocation] = useState([])

     function  handleMapClick ({event, latLng, pixel}) {
        console.log(latLng);
        setLocation(latLng);
        console.log(location)
    }

    function showAddForm(){}

    return(
        <div>
            <p>This is main page</p>
            <h3>Add Contact</h3>
            <div>
                <button onClick={showAddForm}>Add</button>

                <label>Name:</label>
                <input type="text" name = "name" />

                <label>Number:</label>
                <input type="number" name = "number" />

                <label>Email:</label>
                <input type="text" name="email" />

                <label>Realtion:</label>
                <select>
                    <option>Unknown</option>
                    <option>Single</option>
                    <option>In Relationship</option>
                    <option>Engaged</option>
                    <option>Married</option>
                    <option>Other</option>
                </select>
                <label>Location:</label>
                <Map
                    height={300}
                    width={1000}
                    defaultCenter={[33.8938, 35.5018]} 
                    defaultZoom={12}
                    onClick={handleMapClick}
                    >
                    <Marker width={50} anchor={location} />

                </Map>
                <input type="submit" value="Save Contact" />
            </div>    
            <div>
                <h2>My Contacts</h2>

            </div>        
        </div>
    )
}
export default MAIN_PAGE;
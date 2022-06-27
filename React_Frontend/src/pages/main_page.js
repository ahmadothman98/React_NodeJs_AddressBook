import {Map, Marker} from "pigeon-maps"
import { useEffect, useState } from "react";
import axios from "axios";



const MAIN_PAGE = () =>{
    
    const [location,setLocation] = useState([33.8962, 35.4818])
    const [contacts,setContacts] = useState([]);
    
    const  handleMapClick = ({event,latLng}) => {
        console.log(event.target);
        setLocation(latLng);
        console.log(location)
    }

     const saveContact = async (event) => {
        event.preventDefault();
        const data = {
            'name' : event.target.name.value,
            'number' : event.target.number.value,
            'email' : event.target.email.value,
            'relation' : event.target.realtion.value,
            'location' : event.target.location.value,

        }
        axios({
            method:"post",
            url: "http://localhost:3003/api/contact/add_contact",
            data: data
          }).then(function (response){
    

            
          })
        console.log(event.target.location.value)
        //send contacts data to db
    }
    

    useEffect(()=>{
        const getContacts = async () => {
            const response = await fetch("http://localhost:3003/api/contact/get_contacts?" + new URLSearchParams({
                id: '62b79a171ce247ac21d96169',
            }));
            const contactsFromDB = await response.json();
            setContacts(contactsFromDB);
        }
        getContacts();
    },[])

    const showAddForm=() => {}

    return(
        <div>
            <p>This is main page</p>
            <h3>Add Contact</h3>
            <div>
    
                <button onClick={showAddForm}>Add</button>
                <form onSubmit={saveContact}  >

                    <label>Name:</label>
                    <input type="text" name = "name" />

                    <label>Number:</label>
                    <input type="number" name = "number" />

                    <label>Email:</label>
                    <input type="text" name="email" />

                    <label>Realtion:</label>
                    <select name="relation">
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
                        <Marker width={50}  anchor={location} />
                    </Map>
                    <input name="location" value={location} hidden/>

                    <input type="submit" value="Save Contact" />
                </form>
            </div>    
            <div hidden>
                <h2>My Contacts</h2>
                {contacts.map((contact,index)=>{
                    return (
                        <div key={index}>
                            <p className="contact-name">{contact.name}</p>
                            <p className="contact-number">{contact.number}</p>
                            <p className="contact-email">{contact.email}</p>
                            <p className="contact-relation">{contact.relation}</p>
                            <Map
                                height={300}
                                width={1000}
                                defaultCenter={contact.location['coordinates']} 
                                defaultZoom={12}
                                onClick={handleMapClick}
                                id={index}
                                >
                                <Marker width={50}  anchor={contact.location['coordinates']} />

                            </Map>
                        </div> 
                    )
                })}
                {console.log(contacts)}
 
            </div>        
        </div>
        
    )

}
export default MAIN_PAGE;
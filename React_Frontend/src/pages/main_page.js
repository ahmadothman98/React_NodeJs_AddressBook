import { useEffect, useState } from "react";
import axios from "axios";
import jwt from "jwt-decode";
import {Map, Marker} from "pigeon-maps"
import CONTACT from "../components/contact"

const MAIN_PAGE = () =>{
    
    const [location,setLocation] = useState([33.8962, 35.4818])
    const [contacts,setContacts] = useState([]);
    const [showAdd,setShowAdd] = useState(false);
    const [showData,setShowData] = useState([]);
    const [search,setSearch] = useState("");
    const [searchBy,setSearchBy] = useState("name");

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
            'relation' : event.target.relation.value,
            'location' : {coordinates:event.target.location.value.split(',')},
            'user' : jwt(localStorage.getItem('token'))._id,

        }
        axios({
            method:"post",
            url: "http://localhost:3003/api/contact/add_contact",
            data: data
          }).then(function (response){
    
            console.log(response.data);
            
          })
        console.log(event.target.location.value)
        //send contacts data to db
    }
    

    useEffect(()=>{
        const getContacts = async () => {
            const response = await fetch("http://localhost:3003/api/contact/get_contacts?" + new URLSearchParams({
                id: jwt(localStorage.getItem('token'))._id,
            }));
            const contactsFromDB = await response.json();

            setContacts(contactsFromDB);
        }
        getContacts();
        setShowData(Array(contacts.length).fill(false))

    },[])

    const showAddForm=() => {
        showAdd?setShowAdd(false):setShowAdd(true);
    }

    const toggleData =  (index) => {
        let array = showData;
        array[index] = array[index]? false:true
        setShowAdd(array);
    }
    return(
        <div>
            <div>
                <button onClick={showAddForm}>Add Contact</button>
                <form onSubmit={saveContact}   className={!showAdd?"hidden":"add-form"} >
                    <h3>Add Contact</h3>

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
                    <div className="map">
                        <Map
                            height={300}
                            width={1000}
                            defaultCenter={[33.8938, 35.5018]} 
                            defaultZoom={12}
                            onClick={handleMapClick}
                            
                            >
                            <Marker width={50}  anchor={location} />
                        </Map>
                    </div>
                    <input name="location" value={location} hidden/>

                    <input type="submit" value="Save Contact" />
                </form>
            </div>    
            <div >
                <h2>My Contacts</h2>
                <input className="search" placeholder="Search" 
                onChange={e=>{setSearch(e.target.value)}}
                
                />
                {console.log("searchBy",searchBy)}
                <select onChange={e=>{setSearchBy(e.target.value)}}>
                    <option value='name'>By Name</option>
                    <option value='number'>By Number</option>
                    <option value='email'>By Email</option>
                </select>
                {contacts.map((contact,index)=>{
                   
                    if(contact[searchBy].includes(search)){
                        return (
                            <div>
                                <p className="contact-name" onClick={ () => toggleData(index)}>{contact.name}</p>
                                <CONTACT contact={contact} index={index} handleMapClick={handleMapClick} showData = {showData} />
                            </div>
                        )
                    }
                })}
                
                {console.log(contacts)}
 
            </div>        
        </div>
        
    )

}
export default MAIN_PAGE;
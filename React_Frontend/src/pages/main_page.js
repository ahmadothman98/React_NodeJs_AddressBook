import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt from "jwt-decode";
import {Map, Marker} from "pigeon-maps"
import CONTACT from "../components/contact"

const MAIN_PAGE = () =>{
    
    const [loggedIn,setLoggedIn] = useState(true);
    const [name,setName]  = useState("");
    const [email,setEmail] = useState("");
    const [number,setNumber]  = useState("");
    const [relation,setRelation] = useState("");
    const [location,setLocation] = useState([33.8962, 35.4818])
    const [contacts,setContacts] = useState([]);
    const [showAdd,setShowAdd] = useState(false);
    const [showData,setShowData] = useState([]);
    const [search,setSearch] = useState("");
    const [searchBy,setSearchBy] = useState("name");
    const navigate = useNavigate();

    useEffect(()=>{
        if(!loggedIn){
            navigate("/");
        }
    },[loggedIn])

    //
    
    const  handleMapClick = ({event,latLng}) => {
        console.log(event.target);
        setLocation(latLng);
        console.log(location)
    }

     const saveContact = async (event) => {
        event.preventDefault();
        
        const data = {
            'name' : name,
            'number' : number,
            'email' : email,
            'relation' : relation,
            'location' : {coordinates:location},
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
            setShowData(Array(contacts.length).fill(false));
        }
   
        console.log("initailize array", showData)
        getContacts();

    },[])

    const toggleData =  (index) => {
        let array = showData;
        array[index] = array[index]? false:true
        setShowData(array);
        console.log("contactData",showData);

    }

    return(
        <div>
            <div>
                <button className="logout" onClick={ () => {localStorage.removeItem('token'); setLoggedIn(false)}}>Logout</button>
                <button className="add-contact" onClick={() => {setShowAdd(!showAdd)}}>Add Contact</button>
                <form onSubmit={saveContact}   className={!showAdd?"hidden":"add-form"} >
                    <h3>Add Contact</h3>

                    <label>Name:</label>
                    <input type="text" name = "name" 
                        onChange={e=>{setName(e.target.value)}}
                    />

                    <label>Number:</label>
                    <input type="number" name = "number" 
                        onChange={e=>{setNumber(e.target.value)}}
                    />

                    <label>Email:</label>
                    <input type="text" name="email" 
                        onChange={e=>{setEmail(e.target.value)}}
                    />

                    <label>Realtion:</label>
                    <select name="relation"
                    onChange={e=>{setRelation(e.target.value)}}
                    >
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
                            <div key={index}>
                                <p className="contact-name" onClick={ () => toggleData(index)}>{contact.name}</p>
                                { <div /*className={!showData[index]?"hidden":""}*/><CONTACT contact={contact} index={index} handleMapClick={handleMapClick} /></div> }
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
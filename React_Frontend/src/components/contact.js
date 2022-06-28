import {Map, Marker} from "pigeon-maps"

const CONTACT = ({contact,index,handleMapClick}) => {
    return(
        <div key={index} >
            <p className="contact-number"><b>Number:</b> {contact.number}</p>
            <p className="contact-email"><b>Email:</b> {contact.email}</p>
            <p className="contact-relation"><b>Relationship Status:</b> {contact.relation}</p>
            <div className="map">

                <Map
                    height={300}
                    defaultCenter={contact.location['coordinates']} 
                    defaultZoom={12}
                    onClick={handleMapClick}
                    id={index}
                    >
                    <Marker width={50}  anchor={contact.location['coordinates']} />

                </Map>
            </div>
        </div> 
    )
}

export default CONTACT;
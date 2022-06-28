import {Map, Marker} from "pigeon-maps"

const CONTACT = ({contact,index,handleMapClick}) => {
    return(
        <div key={index}>
            <div >
                <p className="contact-number">{contact.number}</p>
                <p className="contact-email">{contact.email}</p>
                <p className="contact-relation">{contact.relation}</p>
                <div className="map">

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
            </div>
        </div> 
    )
}

export default CONTACT;
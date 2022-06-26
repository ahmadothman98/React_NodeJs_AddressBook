const MAIN_PAGE = () =>{
    const showAddForm = {}
    return(
        <div>
            <p>This is main page</p>
            <h3>Add Contact</h3>
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
            
        </div>
    )
}
export default MAIN_PAGE;
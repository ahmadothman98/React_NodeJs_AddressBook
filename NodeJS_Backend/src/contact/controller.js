const { addContact, getContacts} = require('./service');
const User = require('../../model/User')

async function add(req, res) {
    try {
        console.log(req.body);
        const newContact = await addContact(req.body);
        
        const updateUser = await User.updateMany(
            {
                _id: newContact.user
            },
            {
                $push: {
                    contacts: newContact._id
                }
            }
        );

        return res.status(200).send(newContact);
    } catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}

async function get(req, res){
    try{
        console.log(req.params);
        const contactsResult = await getContacts(req.query.id);
        console.log('contacts:', contactsResult);
        return res.send(contactsResult);
    } catch(err){
        console.log(err);
    }

}

module.exports = {
    add,
    get,
}
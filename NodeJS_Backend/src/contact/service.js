const Contact = require('../../model/Contact');
const User = require('../../model/User');

async function addContact(body){
    const {
        name,
        number,
        email,
        relation,
        location,
        user,

    } = body;
    const contact = new Contact({
        name,
        number,
        email,
        relation,
        location,
        user,
    });
    return await contact.save();
}

async function getContacts(id){
    const user = await User.findById(id).populate('contacts');
    return user.contacts;

}

module.exports = {
    addContact,
    getContacts,
}
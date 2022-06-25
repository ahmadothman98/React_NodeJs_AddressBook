const Contact = require('../../model/Contact');

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

async function 
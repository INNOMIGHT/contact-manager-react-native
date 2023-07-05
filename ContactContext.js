import connect, { sql } from '@databases/expo';
import React, { createContext, useState } from 'react';



const db = connect('contacts-db');
export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [favoriteContacts, setFavoriteContacts] = useState([])
  const [input, setInput] = useState()
  const [stableContacts, setStableContacts] = useState([...contacts])
  const [update, setUpdate] = useState()
  const [prevName, setPrevName] = useState()

  const addContact = (contact) => {
    setContacts([...contacts, contact])
  }

  const updateContact = (selContact) => {
    setContacts(() => contacts.map((contact) => {
      if (contact.name === prevName) {
        return {...contact, name:update.name, mobile:update.mobile, landline:update.landline, imgUrl:update.imgUrl}
      } else {
        return contact
      }
    }))
  }

  const setContactsData = (contactArr) => {

    setContacts(contactArr)
    setStableContacts(contactArr)
  }

  const addToFav = async (name) => {
    const response = await db.query(sql`
            UPDATE contacts
            SET favorite=1
            WHERE name==${name}
        `)
    console.log("addtoFavResponseStatus", response)
    console.log(name + " added to favorites")
    const selectedContact = contacts.find(obj => obj.name === name);
    selectedContact.favorite = 1;
    console.log("favorite contacts _jjjj", favoriteContacts)
    setFavoriteContacts([...favoriteContacts, selectedContact])
    console.log("Updated Fav Contactsssss: ", favoriteContacts)
  }
  const removeFav = async (name) => {
    const response = await db.query(sql`
            UPDATE contacts
            SET favorite=0
            WHERE name==${name}
        `)
    
    const selectedContact = contacts.find(obj => obj.name === name);
    selectedContact.favorite = 0;
    setFavoriteContacts([...favoriteContacts, selectedContact])
    
  }

  const getData = () => {
    return contacts
  }

  const getFavorites = async () => {
    let favCont = await db.query(sql`
        SELECT name, mobile, landline, img, favorite FROM contacts
        WHERE favorite == 1
    `)

    console.log("favCONTTTTTTT: ", favCont)
    setFavoriteContacts(favCont)
    return favCont;
  }
 
  const searchContacts = () => {
    
    let filteredContacts = stableContacts.slice()
    console.log("Stable Contacts", stableContacts)
    console.log(filteredContacts)
    console.log("inputtt", input)
    if(input){
        filteredContacts = filteredContacts.filter(cont => cont.name.toLowerCase().includes(input.toLowerCase()))
        console.log(filteredContacts)
        
    }
    setContacts(filteredContacts)
    setFavoriteContacts(filteredContacts)
    
    
    
  }

  return (
    <ContactContext.Provider value={{ contacts, prevName, removeFav, setPrevName, searchContacts, input, setInput, addContact, setContactsData, addToFav, getData, getFavorites, favoriteContacts, setFavoriteContacts, update, setUpdate, updateContact }}>
      {children}
    </ContactContext.Provider>
  );
};

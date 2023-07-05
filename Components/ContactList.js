import { Dimensions, Image, ScrollView, Text, View } from "react-native"
import { Appbar, Button, IconButton, List, MD3Colors, TextInput } from "react-native-paper"
import { styles } from "./ContactStyles"
import contacts from "./Data"
import { useContext, useEffect, useState } from "react"
import ContactDB from "../Database/ContactDB"
import connect, {sql} from '@databases/expo';
import { ContactContext } from "../ContactContext"
import { SwipeListView } from 'react-native-swipe-list-view';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

const db = connect('contacts-db');



const ContactList = ({navigation}) => {
    const [myContacts, setMyContacts] = useState([]);
    const contactContext = useContext(ContactContext);
    const [imgData, setImgData] = useState()
    const [gestureName, setGestureName] = useState()
    const [swipedContact, setSwipedContact] = useState()
    
    const onSwipeLeft = (gestureState, contact) => {
        console.log("swiped_left")
      }

    // contactContext.contacts[contactContext.contacts.length()-1].imgUrl 

    useEffect(() => {
            db.query(sql`
            CREATE TABLE IF NOT EXISTS contacts (
                name TEXT NOT NULL PRIMARY KEY,
                mobile INT NOT NULL,
                landline INT NOT NULL,
                img TEXT,
                favorite BOOLEAN
            );`,
            console.log("Table Created!")
            );  
        
        fetchData();
    },[]);

    const fetchData = async () => {
        const response = await db.query(sql`
        SELECT name, mobile, landline, img, favorite FROM contacts;`
        );
        const newData = await response;
        // console.log(newData)
        contactContext.setContactsData(newData)
        setMyContacts(newData)
        console.log(newData)
        
        
      };
    // const refreshContacts = async () => {
    //     const response = await db.query(sql`
    //     SELECT name, mobile, landline, img, favorite FROM contacts;`
    //     );
    //     const newData = await response;
    //     setMyContacts(newData)
    //   };

    async function dbCheck() {
        await db.query(sql`
          SELECT * FROM contacts;
        `)[0] || undefined;
        console.log("db_check" + db)
        console.log(await db.query(sql`
        PRAGMA table_info(contacts);`
        ))
        db.query(sql`
            DELETE FROM contacts
            WHERE name = 'Rajesh';
        `);
        

        console.log(myContacts)
    
      }

      const handleSearchInput = (e) => {
        console.log(e)
        contactContext.setInput(e)
        contactContext.searchContacts();
      }

    
    const contactData = contacts;

    const addFavorite = (name) => {
        console.log("Press add to fav")
        db.query(sql`
            UPDATE contacts
            SET favorite=1
            WHERE name==${name}
        `)
        console.log(name + " added to favorites")
        contactContext.addToFav(name);
    }


    const updateContactNav = (name, mobile, landline, img, favorite) => {
        contactContext.setPrevName(name)
        console.log("navigate to update contact page")
        let singleContactUpdate = {
            'imgUrl': img,
            'name': name,
            'mobile': mobile,
            'landline': landline,
            'favorite': favorite,
            }
        contactContext.setUpdate(singleContactUpdate)
        navigation.navigate("Update Contact")
    }

    const {height} = Dimensions.get('window')
    const [screenHeight, setScreenHeight] = useState()
    scrollEnabled = screenHeight > height;
    const onContentSizeChange = (contentWidth, contentHeight) => {
        setScreenHeight(contentHeight)
    }

    const addNavigation = () => {
        contactContext.setUpdate({name: "", img: "", mobile: "", landline: ""})
        navigation.navigate("Add Contact")
    }
    return (
        <View style={styles.container}>

        <ScrollView 
            style={{flex: 1}}
            scrollEnabled={scrollEnabled}
            onContentSizeChange={onContentSizeChange}>
                
            

        
            
            <TextInput mode="outlined" placeholder="Search Contact" value={contactContext.input} onChangeText={(e) => handleSearchInput(e)} right={<TextInput.Icon icon="magnify" />}/>
            <Text>{"\n"}</Text>
            <Button icon="heart" mode="contained" style={styles.buttonStyles} onPress={() => navigation.navigate("Favorite Contacts")}>Favorites</Button>
            <Text>{"\n"}</Text>
            <List.AccordionGroup>
                {contactContext.contacts.map((contact, idx) => {
                    return(
                        
                    <GestureRecognizer onSwipeLeft={() => updateContactNav(contact.name, String(contact.mobile), String(contact.landline), contact.img, contact.favorite)}>
                            
                    <List.Accordion title={contact.name} left={props => <List.Icon {...props} 
                    icon={({ size, color }) => (
                        <Image
                        key={Date.now()}
                        source={{ uri: contact.img}}
                        style={styles.ImageStyleIcon}
                        />
                    )} />} id={idx} key={idx}>
                    <List.Item title={"Mobile: " + contact.mobile} left={props => <List.Icon {...props} icon="calculator" />}/>
                    <List.Item title={"Landline: " + contact.landline} left={props => <List.Icon {...props} icon="phone" />}/>
                    <List.Item left={props => <List.Icon {...props} icon="heart" key={idx}/>} title={props => <Button mode="outlined" {...props} onPress={() => addFavorite(contact.name)} >Add to Favorite</Button>}/>
                    <List.Item title={props => <Button mode="outlined" onPress={() => updateContactNav(contact.name, String(contact.mobile), String(contact.landline), contact.img, contact.favorite)}>Update</Button>} left={props => <List.Icon {...props} icon="pen"/>} />
                    </List.Accordion></GestureRecognizer>
                )})}
                
            </List.AccordionGroup>
            
            
            <IconButton
                icon="plus"
                iconColor={MD3Colors.primary50}
                size={50}
                style={styles.AddButton}
                onPress={() => addNavigation()}
            />
            {/* <Button onPress={() => {dbCheck()}}>Check</Button> */}
            
        
        </ScrollView>
        </View>

    )
}

export default ContactList
import connect, { sql } from "@databases/expo";
import { useContext, useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, View } from "react-native";
import { Button, List, Text, TextInput } from "react-native-paper"
import { styles } from "./ContactStyles";
import { ContactContext } from "../ContactContext";

const db = connect('contacts-db');

const FavoriteContactList = ({navigation}) => {

        const [myContacts, setMyContacts] = useState([]);
        const [myFavoriteContacts, setMyFavoriteContacts] = useState([]);
        const contactContext = useContext(ContactContext)

        useEffect(() => {
            
            let favCont = contactContext.getFavorites();
            
        }, [])

        
        const {height} = Dimensions.get('window')
    const [screenHeight, setScreenHeight] = useState()
    scrollEnabled = screenHeight > height;
    const onContentSizeChange = (contentWidth, contentHeight) => {
        setScreenHeight(contentHeight)
    }

    const handleSearchInput = (e) => {
        console.log(e)
        contactContext.setInput(e)
        contactContext.searchContacts();
      }

      const RemoveFavorite = (name) => {
        console.log("Press Remove to fav")
        db.query(sql`
            UPDATE contacts
            SET favorite=0
            WHERE name==${name}
        `)
        console.log(name + " removed to favorites")
        contactContext.removeFav(name);
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
                {contactContext.favoriteContacts.map((contact, idx) => {
                    return(
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
                    <List.Item left={props => <List.Icon {...props} icon="heart" key={idx}/>} title={props => <Button mode="outlined" {...props} onPress={() => RemoveFavorite(contact.name)} >Remove from Favorite</Button>}/>
                    <List.Item title={props => <Button mode="outlined" onPress={() => updateContactNav()}>Update</Button>} left={props => <List.Icon {...props} icon="pen"/>} />
                    </List.Accordion>
                )})}
                
            </List.AccordionGroup>
            </ScrollView>
            </View>
    )
}

export default FavoriteContactList
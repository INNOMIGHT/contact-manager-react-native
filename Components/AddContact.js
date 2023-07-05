import { useContext, useEffect, useState } from "react";
import { Image, Text, View } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import { Button, IconButton, MD3Colors } from "react-native-paper"
import { styles } from "./ContactStyles"
import * as ImagePicker from 'expo-image-picker';
import connect, {sql} from "@databases/expo";
import { ContactContext } from "../ContactContext";




const db = connect('contacts-db');

const AddContact = ({navigation}) => {
    const contactContext = useContext(ContactContext);
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [landline, setLandline] = useState("");
    const [image, setImage] = useState("")

    useEffect(() => {
        
    })

    const updateContacts = () => {

    }

    const addContact = () => {
        
        if(name && mobile && landline){

            singleContact = {
                'imgUrl': image,
                'name': name,
                'mobile': mobile,
                'landline': landline,
                'favorite': false,
                }
            
            
            db.query(sql`
                INSERT INTO contacts (name, mobile, landline, img, favorite)
                VALUES (${singleContact.name}, ${singleContact.mobile}, ${singleContact.landline}, ${singleContact.imgUrl}, ${singleContact.favorite})
            `);
            contactContext.addContact(singleContact);
            alert("contact has been added.") 
            navigation.navigate("Contact List")
            }
            else {
                alert("Please fill the required fields")
            }
        }

        const imagePicker = async () => {
            // No permissions request is necessary for launching the image library
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });
        
            console.log(result);
        
            if (!result.canceled) {
              setImage(result.assets[0].uri);
            }
          };

          

    return (
        <View style={styles.ContactAdderStyle}>
            <IconButton
                icon="camera"
                iconColor={MD3Colors.primary50}
                size={50}
                
                onPress={imagePicker}
            />
            {image && <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 100 }} />}
            
            {/* <TextInput mode="outlined" placeholder="Search Contact" right={<TextInput.Icon icon="magnify" />}/> */}
            <TextInput
            style={styles.InputStyle}
                mode="outlined"
                placeholder="Enter contact's Name"
                label="Name"
                value={name}
                onChangeText={name => setName(name)}
                />
            <TextInput
            style={styles.InputStyle}
            placeholder="Enter contact's Mobile Number"
            label="Mobile"
            value={mobile}
            onChangeText={mobile => setMobile(mobile)}
            />
            <TextInput
            style={styles.InputStyle}
            placeholder="Enter contact's Landline Number"
            label="Landline"
            value={landline}
            onChangeText={landline => setLandline(landline)}
            />
            <Button mode="contained" onPress={() => {addContact()}}>{contactContext.update.name? "Update Contact" : "Add Contact"}</Button>
        </View>
    )
}

export default AddContact
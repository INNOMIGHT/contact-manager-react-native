import { useContext, useEffect, useState } from "react";
import { Image, Text, View } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import { Button, IconButton, MD3Colors } from "react-native-paper"
import { styles } from "./ContactStyles"
import * as ImagePicker from 'expo-image-picker';
import connect, {sql} from "@databases/expo";
import { ContactContext } from "../ContactContext";




const db = connect('contacts-db');

const UpdateContact = ({navigation}) => {
    const contactContext = useContext(ContactContext);
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [landline, setLandline] = useState("");
    const [image, setImage] = useState("")

    useEffect(() => {
        
    })

    const updateContact = () => {
        console.log(contactContext.update)
        

            singleContact = {
                'imgUrl': contactContext.update.imgUrl,
                'name': contactContext.update.name,
                'mobile': contactContext.update.mobile,
                'landline': contactContext.update.landline,
                'favorite': contactContext.update.favorite,
                }
                console.log(singleContact)
            
            
            db.query(sql`
                UPDATE contacts
                SET name=${name}, mobile=${mobile}, landline=${landline}, img=${image}
                WHERE name == ${contactContext.update.name}
            `);
            contactContext.updateContact();
            alert("contact has been updated.") 
            setName("")
            navigation.navigate("Contact List")
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
            {image && <Image source={{ uri: contactContext.update.imgUrl }} style={{ width: 100, height: 100, borderRadius: 100 }} />}
            
            {/* <TextInput mode="outlined" placeholder="Search Contact" right={<TextInput.Icon icon="magnify" />}/> */}
            <TextInput
            style={styles.InputStyle}
                mode="outlined"
                placeholder="Enter contact's Name"
                label="Name"
                value={contactContext.update.name}
                onChangeText={name => contactContext.setUpdate({...contactContext.update, name: name})}
                />
            <TextInput
            style={styles.InputStyle}
            placeholder="Enter contact's Mobile Number"
            label="Mobile"
            value={contactContext.update.mobile}
            onChangeText={mobile => contactContext.setUpdate({...contactContext.update, mobile: mobile})}
            />
            <TextInput
            style={styles.InputStyle}
            placeholder="Enter contact's Landline Number"
            label="Landline"
            value={contactContext.update.landline}
            onChangeText={landline => contactContext.setUpdate({...contactContext.update, landline: landline})}
            />
            <Button mode="contained" onPress={() => {updateContact()}}>Update Contact</Button>
        </View>
    )
}

export default UpdateContact
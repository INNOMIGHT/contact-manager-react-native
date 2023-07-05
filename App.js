import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import AddContact from './Components/AddContact';
import ContactList from './Components/ContactList';
import { NavigationContainer } from '@react-navigation/native';
import FavoriteContactList from './Components/FavoriteContactList';
import { ContactProvider } from './ContactContext';
import UpdateContact from './Components/UpdateContact';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs()

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <ContactProvider>
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='ContactList'>
        <Drawer.Screen name="Contact List" component={ContactList} />
        <Drawer.Screen name="Add Contact" component={AddContact} />
        <Drawer.Screen name="Favorite Contacts" component={FavoriteContactList} />
        <Drawer.Screen name="Update Contact" component={UpdateContact} />
      </Drawer.Navigator>
    </NavigationContainer>
    </ContactProvider>
  );
}

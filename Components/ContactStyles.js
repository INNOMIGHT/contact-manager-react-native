import {StyleSheet, Dimensions} from 'react-native';

let width = Dimensions.get('window').width;

const ContactStyles = {
    container: {
      flex : 1,

    },
    listStyle: {
        flexGrow: 1
    },
    buttonStyles: {
        width: width*0.3,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: width*0.65
    },
    ImageStyleIcon: {
        width: width *0.2,
        height: width *0.2
    },
    AddButton: {
        borderWidth: 1,
        borderRadius: 100,
        marginLeft: width*0.425,
        marginTop: width*0.15
        },
    InputStyle: {
        width: width*0.7,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        },
    ContactAdderStyle: {
        alignItems: 'center'
    }
    }
    

export const styles = StyleSheet.create(ContactStyles);
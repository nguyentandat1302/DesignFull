import { StyleSheet, View } from "react-native"
import { Avatar, Text } from "react-native-paper"

const ContactThumbnail = ({avatar,name,phone}) => {
    

    console.log(name)
    return(
        <View style = {myStyle.container}>
            <Avatar.Image source={{uri: avatar}} />
            <Text variant="headlineLarge" style= {myStyle.text}> {name}</Text>
            <Text>{phone}</Text>

        </View>
    )
}

export default ContactThumbnail

const myStyle = StyleSheet.create ({
    container:{
        flex:1,
        backgroundColor:"aqua",
        justifyContent:"center",
        alignItems:"center"
    },
    text:{
        fontWeight:"bold",
        margin:10,
    }
    
})
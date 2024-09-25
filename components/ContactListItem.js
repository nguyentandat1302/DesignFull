import { StyleSheet, TouchableHighlight, View } from "react-native"
import { Avatar, Text } from "react-native-paper"



const ContactListItem = (props) =>{
    const {avatar,name,phone,onPress} = props
    console.log(name)
    return(
        
        <TouchableHighlight
        onPress={onPress}
        >       
            <View style = {myStyle.container}>
                <Avatar.Image source={{uri:avatar}} />
                <View>
                    <Text variant="labelLarge">{name}</Text>
                    <Text>{phone}</Text>

                </View>
            </View>
        </TouchableHighlight>
    )
}


export default ContactListItem

const myStyle = StyleSheet.create({
    container: {
      flexDirection: "row",
      padding:5,
      borderBottomWidth:1
    }
  });
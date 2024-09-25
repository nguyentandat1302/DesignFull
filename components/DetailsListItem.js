import { StyleSheet, TouchableHighlight, View } from "react-native"
import { Avatar, Text } from "react-native-paper"
import MaterialIcons from   "react-native-vector-icons/MaterialIcons"


const DetailsListItem = (props) =>{
    const {icon, label, value} = props
    //console.log(name)
    return(
        
        <TouchableHighlight
        >       
            <View style = {myStyle.container}>
                <MaterialIcons name={icon} size={24} color="black" />
                <View style ={{marginLeft:10}}>
                    <Text variant="labelLarge">{label}</Text>
                    <Text>{value}</Text>

                </View>
            </View>
        </TouchableHighlight>
    )
}


export default DetailsListItem

const myStyle = StyleSheet.create({
    container: {
      flexDirection: "row",
      padding:5,
      borderBottomWidth:1
    }
  });
import { View } from "react-native"
import { Text } from "react-native-paper"
import Contact from "./Contact"
import ContactThumbnail from "../components/ContactThumbnail"
import ContactListItem from "../components/ContactListItem"
import DetailsListItem from "../components/DetailsListItem"


const Profile = ({route})=> {
    //console.log(route.params.contact)
    const {avatar,name,phone,email,cell} = route.params.contact
    return(

        <View style = {{flex:1}}>
           <View style = {{flex:1}}>
                <ContactThumbnail avatar={avatar} name={name} phone={phone} />
           </View>
           <View style = {{flex:1,


           }}>
                <DetailsListItem icon = {"email"} label ={"Email"} value={email} />
                <DetailsListItem icon = {"local-phone"} label ={"Work"} value={phone} />
                <DetailsListItem icon = {"smartphone"} label ={"Person"} value={cell} />

           </View>
        </View>
          
        
    )
}

export default Profile
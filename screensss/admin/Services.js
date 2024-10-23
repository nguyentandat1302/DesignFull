import { useEffect, useState } from "react";
import { FlatList, Image, Text, View, TouchableOpacity } from "react-native";
import { IconButton, TextInput } from "react-native-paper";
import firestore from "@react-native-firebase/firestore";
import { useMyContextController } from "../../Context";


const Services = ({ navigation }) => {
  const [controller, dispatch] = useMyContextController();
  const { userLogin } = controller;
  const [services, setServices] = useState([]);
  const [servicesData, setServicesData] =useState([]) 
  const CSERVICES = firestore().collection("SERVICES");
  const [name, setName] = useState("");

            // Fetch services from Firestore
            useEffect(() => {
                const unsubscribe = CSERVICES.onSnapshot(response => {
                const arr = [];
                response.forEach(doc => {
                    if (doc.data().id != null) {
                    arr.push(doc.data());
                    }
                });
                setServices(arr);
                setServicesData(arr);
                });

                return () => unsubscribe();
            }, []);

            const renderItem = ({ item }) => {
                const { serviceName, price } = item;
                return (
                <TouchableOpacity
                    style={{
                    flexDirection: "row",
                    borderWidth: 1,
                    height: 60,
                    borderRadius: 10,
                    margin: 5,
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 10
                    }}
                    onPress={() => navigation.navigate("servicedetail", { item })}
                >
                    <Text
                    style={{
                        fontSize: 25,
                        fontWeight: "bold"
                    }}
                    >
                    {serviceName}
                    </Text>
                    <Text>{price} VND</Text>
                </TouchableOpacity>
                );
            };
            useEffect(() =>{
              setServicesData(services.filter(s=> s.serviceName.includes(name)))
            },[name])
            return (
                <View style={{ flex: 1 }}>
                <Image
                    source={require("../../image/Spa.png")}
                    style={{
                    alignSelf: "center",
                    marginTop: 70,
                    marginBottom: 30
                    }}
                />
                <TextInput
                    label={"Search Service By Name"}
                    style={{ margin: 10 }}
                    value={name}
                    onChangeText={setName}
                />
                <View
                    style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    margin: 10
                    }}
                >
                    <Text
                    style={{
                        fontSize: 30,
                        fontWeight: "bold"
                    }}
                    >
                    Danh sách dịch vụ
                    </Text>
                    <IconButton
                    icon={"plus-circle"}
                    size={50}
                    iconColor="green"
                    onPress={() => navigation.navigate("addservice")}
                    />
                </View>
                <FlatList
                    data={servicesData}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                />
                </View>
            );
            };

            export default Services;

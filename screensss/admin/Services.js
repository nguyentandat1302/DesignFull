import React, { useEffect, useState } from "react";
import { FlatList, Text, View, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";
import { IconButton, TextInput } from "react-native-paper";
import firestore from "@react-native-firebase/firestore";
import Video from "react-native-video";

const Services = ({ navigation }) => {
  const [services, setServices] = useState([]);
  const [servicesData, setServicesData] = useState([]);
  const [cornPopServices, setCornPopServices] = useState([]);
  const [cornPopData, setCornPopData] = useState([]);
  const [name, setName] = useState("");
  const [cornPopName, setCornPopName] = useState("");

  const CSERVICES = firestore().collection("SERVICES");
  const CORNPOP = firestore().collection("CORNPOP");

  // Fetch Movie Services
  useEffect(() => {
    const unsubscribe = CSERVICES.onSnapshot(response => {
      const arr = [];
      response.forEach(doc => {
        if (doc.data().serviceName) {
          arr.push(doc.data()); // Ensure the correct data field
        }
      });
      setServices(arr);
      setServicesData(arr);
    });
    return () => unsubscribe();
  }, []);

  // Fetch CornPop Services
  useEffect(() => {
    const unsubscribe = CORNPOP.onSnapshot(response => {
      const arr = [];
      response.forEach(doc => {
        if (doc.data().serviceName) {
          arr.push({ ...doc.data(), id: doc.id });
        }
      });
      setCornPopServices(arr);
      setCornPopData(arr);
    });
    return () => unsubscribe();
  }, []);

  // Filter Movie Services
  useEffect(() => {
    setServicesData(services.filter(s => s.serviceName.includes(name)));
  }, [name]);

  // Filter CornPop Services
  useEffect(() => {
    setCornPopData(cornPopServices.filter(s => s.serviceName.includes(cornPopName)));
  }, [cornPopName]);

  // Render item for CornPop Services
  const renderCornPopItem = ({ item }) => {
    const { serviceName, price, image } = item;
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => navigation.navigate("cornpopdetail", { item })}
      >
        {image ? (
          <Image source={{ uri: image }} style={styles.thumbnail} />
        ) : (
          <View style={styles.placeholderThumbnail}>
            <Text style={styles.placeholderText}>No Image Available</Text>
          </View>
        )}
        <View style={styles.infoContainer}>
          <Text style={styles.movieTitle}>{serviceName}</Text>
          <Text style={styles.price}>{price} VND</Text>
        </View>
      </TouchableOpacity>
    );
  };

  // Render item for Movie Services
  const renderMovieItem = ({ item }) => {
    const { serviceName, price, image } = item;
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => navigation.navigate("servicedetail", { item })}
      >
        {image ? (
          <Image source={{ uri: image }} style={styles.thumbnail} />
        ) : (
          <View style={styles.placeholderThumbnail}>
            <Text style={styles.placeholderText}>No Image Available</Text>
          </View>
        )}
        <View style={styles.infoContainer}>
          <Text style={styles.movieTitle}>{serviceName}</Text>
          <Text style={styles.price}>{price} VND</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <Video
        source={require("../../image/AssetMovie.mp4")}
        style={{
          width: "100%",
          height: 200,
          alignSelf: "center",
          marginTop: 70,
          marginBottom: 30,
        }}
        resizeMode="cover"
        repeat
        paused={false}
      />

      {/* CornPop Services Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Service CornPop Online</Text>
        <IconButton
          icon={"plus-circle"}
          size={50}
          iconColor="green"
          onPress={() => navigation.navigate("addcornpopservice")}
        />
      </View>
      <FlatList
        data={cornPopData}
        keyExtractor={item => item.id}
        renderItem={renderCornPopItem}
        numColumns={2}
        contentContainerStyle={styles.listContent}
      />

      {/* Search and List for Movie Services */}
      <TextInput
        label={"Search Movie By Name"}
        style={{ margin: 10 }}
        value={name}
        onChangeText={setName}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>List Movie Online</Text>
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
        renderItem={renderMovieItem}
        numColumns={2}
        contentContainerStyle={styles.listContent}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 10,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  thumbnail: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  placeholderThumbnail: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    color: "#666",
    fontSize: 14,
  },
  infoContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  price: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default Services;

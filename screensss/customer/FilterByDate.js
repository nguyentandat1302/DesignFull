// src/screens/FilterByDate.js

import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import firestore from "@react-native-firebase/firestore";
import Icon from "react-native-vector-icons/MaterialIcons"; // Make sure you have an icon library installed

const FilterByDate = ({ route, navigation }) => {
  const { selectedDay } = route.params; // Get the selected day from the navigation params
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await firestore().collection("SERVICES").get();
      const data = response.docs.map(doc => doc.data());

      // Filter movies based on selected day
      const moviesForDay = data.filter(movie => movie.showTimes && movie.showTimes[selectedDay]);
      setFilteredMovies(moviesForDay);
    };
    fetchData();
  }, [selectedDay]);

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity
      style={styles.movieCard}
      onPress={() => navigation.navigate("detailmovie", { item })} // Navigate to detailmovie with item as param
    >
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.thumbnail} />
      ) : (
        <View style={styles.placeholderThumbnail}><Text>No Image</Text></View>
      )}
      <Text style={styles.movieTitle}>{item.serviceName}</Text>
      {/* Display showtimes specifically for the selected day */}
      <Text style={styles.showTimes}>
        Showtimes: {item.showTimes[selectedDay].join(", ")}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>
      
      <Text style={styles.headerText}>Movies Showing on {selectedDay}</Text>
      
      <FlatList
        data={filteredMovies}
        keyExtractor={item => item.id}
        renderItem={renderMovieItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
    padding: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 10,
    textAlign: "center",
  },
  movieCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    alignItems: "center",
  },
  thumbnail: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  placeholderThumbnail: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  showTimes: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default FilterByDate;

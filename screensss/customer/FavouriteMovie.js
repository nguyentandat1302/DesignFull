import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import firestore from "@react-native-firebase/firestore";
import Icon from "react-native-vector-icons/MaterialIcons";

const FavouriteMovie = ({ navigation }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const snapshot = await firestore().collection("FAVORITES").get();
      const favoriteData = snapshot.docs.map((doc) => doc.data());
      setFavoriteMovies(favoriteData);
    };

    fetchFavorites();
  }, []);

  const renderFavoriteMovie = ({ item }) => (
    <View style={styles.movieCard}>
      <Text style={styles.movieTitle}>{item.serviceName}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('detailmovie', { item })}>
        <Text style={styles.movieDetails}>View Details</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          // Remove movie from favorites
          await firestore().collection("FAVORITES").doc(item.id).delete();
          setFavoriteMovies(favoriteMovies.filter(movie => movie.id !== item.id));
        }}
      >
        <Icon name="delete" size={24} color="#F44336" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favourite Movies</Text>
      {favoriteMovies.length === 0 ? (
        <Text style={styles.noFavorites}>No favorite movies yet!</Text>
      ) : (
        <FlatList
          data={favoriteMovies}
          renderItem={renderFavoriteMovie}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  noFavorites: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
  movieCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  movieTitle: {
    fontSize: 18,
    color: "#333",
  },
  movieDetails: {
    color: "#2196F3",
  },
});

export default FavouriteMovie;

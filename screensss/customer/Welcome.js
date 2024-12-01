import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';

const Welcome = ({ navigation }) => {
  const handlePress = () => {
    navigation.navigate('login');
  };

  return (
    <View style={styles.container}>
      <Video
        source={require('../../image/Popcorn.mp4')} // Adjust the path if necessary
        style={styles.backgroundVideo}
        resizeMode="cover"
        repeat
        muted
      />
      <TouchableOpacity style={styles.textContainer} onPress={handlePress}>
        <Text style={styles.text}>Welcome to Cinemas</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Background color in case the video takes time to load
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  textContainer: {
    position: 'absolute',
    bottom: 100,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark background for text visibility
    borderRadius: 10,
  },
  text: {
    color: '#F50057', // Red text color
    fontSize: 32,     // Larger font size
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Welcome;

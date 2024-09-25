import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, TextInput, Button, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Video from 'react-native-video';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    alert(`Email: ${email}\nPassword: ${password}`);
    navigation.navigate('home');  
  };

  const navigateToCreateAccount = () => {
    navigation.navigate('create'); 
  };

  const navigateToForgotPassword = () => {
    navigation.navigate('forgot'); 
  };

  return (
    <View style={myStyle.container}>
      <Video
        source={require('../image/Home.mp4')}
        style={myStyle.video}
        resizeMode="cover"
        repeat={true}
      />
      <View style={myStyle.content}>
        <Text style={{ alignSelf: 'center', fontSize: 30, marginBottom: 50 }}>
          Welcome Back
        </Text>

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email"
          style={myStyle.input}
        />

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password"
            secureTextEntry={!showPassword}
            style={[myStyle.input, { flex: 1 }]}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <MaterialCommunityIcons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        <Button title="Login" onPress={handleLogin} color="blue" />

        <TouchableOpacity onPress={navigateToCreateAccount}>
          <Text style={myStyle.link}>Create New Account</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={navigateToForgotPassword}>
          <Text style={myStyle.link}>Forgot Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const myStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 0,
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },
  link: {
    textAlign: 'center',
    color: 'blue',
    marginTop: 10,
  },
});

export default LoginScreen;

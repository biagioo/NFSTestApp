import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/Header';
import { Button, Input } from 'react-native-elements';
import { screenHeight, screenWidth } from '../../GlobalStyles';
import { StatusBar } from 'expo-status-bar';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <Header navigation={navigation} />
      <View keyboardShouldPersistTaps='handled' style={styles.body}>
        <Text style={styles.title}>Log In</Text>
        <TextInput
          style={styles.input}
          placeholder={'Email'}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder={'Password'}
          value={password}
          onChangeText={text => setPassword(text)}
        />

        <TouchableOpacity activeOpacity={0.5}>
          <View style={styles.button}>
            <Text style={{ fontWeight: '600' }}>Log In</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate('Register')}
        >
          <View style={styles.button}>
            <Text style={{ fontWeight: '600' }}>Register</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.text}>Forgot You Password?</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  body: {
    flex: 4,
    marginTop: '15%',
    alignContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: '700',
    alignSelf: 'center',
    marginBottom: '15%',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    height: screenHeight / 17,
    width: screenWidth - 60,
    backgroundColor: '#F6F5F5',
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: '5%',
  },
  button: {
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#ADB1BB',
    borderRadius: 60,
    height: screenHeight / 17,
    width: screenWidth - 130,
    alignSelf: 'center',
    marginBottom: '5%',
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    alignSelf: 'center',
    marginBottom: '15%',
  },
});
export default LoginScreen;

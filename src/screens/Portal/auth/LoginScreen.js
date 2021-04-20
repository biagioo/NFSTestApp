import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import Header from '../../../components/Header';
import { Input } from 'react-native-elements';
import { screenHeight, screenWidth } from '../../../GlobalStyles';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase';
import { auth } from '../../../../firebase';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(authUser => {
      if (authUser) {
        navigation.replace('MainScreen');
      }
    });

    return unsubscribe;
  });

  const signIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => alert(error));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={90}
    >
      <StatusBar style='auto' />
      <Header navigation={navigation} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View keyboardShouldPersistTaps='handled' style={styles.body}>
          <Text style={styles.title}>Log In</Text>
          <Input
            style={styles.input}
            placeholder={'Email'}
            value={email}
            type='email'
            onChangeText={text => setEmail(text)}
          />
          <Input
            style={styles.input}
            secureTextEntry
            placeholder={'Password'}
            value={password}
            type='password'
            onChangeText={text => setPassword(text)}
          />
          <TouchableOpacity activeOpacity={0.5} onPress={signIn}>
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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: '700',
    alignSelf: 'center',
    marginBottom: '4%',
  },
  body: {
    flex: 2.5,
    marginTop: '15%',
    alignContent: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#F6F5F5',
    borderRadius: 60,
    marginBottom: '5%',
  },
  button: {
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#ADB1BB',
    borderRadius: 60,
    height: screenHeight / 17,
    width: screenWidth - 60,
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

import React, { useState, useEffect } from 'react';
import {
  Alert,
  View,
  Text,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import { Input } from 'react-native-elements';
import Header from '../../../components/Header';
import { screenHeight, screenWidth } from '../../../GlobalStyles';
import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase';

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const sendResetEmail = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert(
          'Check Your Email',
          'A password email reset has been sent to your email. Please follow the Instructions in the email.'
        );
        setEmail('');
        navigation.navigate('Log In');
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        Alert.alert(errorCode, errorMessage);
        // ..
      });
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
          <Text style={styles.title}>Password Reset</Text>
          <Input
            style={styles.input}
            placeholder={'Email'}
            value={email}
            type='email'
            onChangeText={text => setEmail(text)}
          />
          <TouchableOpacity activeOpacity={0.5} onPress={sendResetEmail}>
            <View style={styles.button}>
              <Text style={{ fontWeight: '600' }}>
                Send Password Reset Email
              </Text>
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
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate('Log In')}
          >
            <View style={styles.button}>
              <Text style={{ fontWeight: '600' }}>Log In</Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;

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

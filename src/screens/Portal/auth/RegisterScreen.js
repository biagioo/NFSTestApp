import React, { useState } from 'react';
import {
  Alert,
  View,
  Text,
  Keyboard,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import Header from '../../../components/Header';
import { Input } from 'react-native-elements';
import { screenHeight, screenWidth } from '../../../GlobalStyles';
import { StatusBar } from 'expo-status-bar';
import { auth, db } from '../../../../firebase';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [vinNumber, setVinNumber] = useState('');
  const [nfsCode, setNfsCode] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');

  const emptyState = () => {
    setName('');
    setEmail('');
    setPassword('');
    setVinNumber('');
    setNfsCode('');
  };

  const register = () => {
    if (!name) {
      Alert.alert('Name is Required');
    } else if (!email) {
      Alert.alert('Email is Required');
    } else if (!password) {
      Alert.alert('Password is Required');
    } else if (!vinNumber) {
      Alert.alert('The Last 6 numbers of your Vehicles Vin Number is Required');
    } else if (!nfsCode) {
      Alert.alert('NFS Code is Required, Please contact NFS to obtain a code.');
    } else {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(authUser => {
          authUser.user.updateProfile({
            displayName: name,
          });
        })
        .then(() => {
          const currentUser = auth.currentUser;
          db.collection('users').doc(currentUser.uid).set({
            email: currentUser.email,
            userId: currentUser.uid,
            name: name,
            vinNumber: vinNumber,
            nfsCode: nfsCode,
          });
        })
        .then(() => {
          navigation.navigate('Loading');
          emptyState();
        })
        .catch(error => alert(error.message));
    }
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
        <View style={styles.body}>
          <Text style={styles.title}>Register</Text>
          <ScrollView style={{ flex: 1 }}>
            <Input
              style={styles.input}
              placeholder={'Email'}
              value={email}
              inputContainerStyle={{
                borderBottomWidth: 0,
              }}
              onChangeText={text => setEmail(text)}
            />
            <Input
              style={styles.input}
              secureTextEntry
              placeholder={'Password'}
              value={password}
              inputContainerStyle={{
                borderBottomWidth: 0,
              }}
              onChangeText={text => setPassword(text)}
            />
            <Input
              style={styles.input}
              placeholder={'Name'}
              value={name}
              inputContainerStyle={{
                borderBottomWidth: 0,
              }}
              onChangeText={text => setName(text)}
            />
            <Input
              style={styles.input}
              placeholder={'Last 6 of Vehicle Vin Number'}
              value={vinNumber}
              inputContainerStyle={{
                borderBottomWidth: 0,
              }}
              onChangeText={text => setVinNumber(text)}
            />
            <Input
              style={styles.input}
              placeholder={'NFS Code'}
              value={nfsCode}
              inputContainerStyle={{
                borderBottomWidth: 0,
              }}
              onChangeText={text => setNfsCode(text)}
            />
            <Input
              style={styles.input}
              placeholder={'Profile Photo (optional)'}
              value={profilePhoto}
              inputContainerStyle={{
                borderBottomWidth: 0,
              }}
              onChangeText={text => setProfilePhoto(text)}
            />
            <TouchableOpacity activeOpacity={0.5} onPress={register}>
              <View style={styles.button}>
                <Text style={{ fontWeight: '600' }}>Register</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate('Log In')}
            >
              <View style={styles.button}>
                <Text style={{ fontWeight: '600' }}>
                  Already Registered? Log In Here
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

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
    flex: 5,
    marginTop: '15%',
    alignContent: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#F6F5F5',
    borderRadius: 60,
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

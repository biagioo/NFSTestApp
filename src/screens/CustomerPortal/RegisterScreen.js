import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import Header from '../../components/Header';
import { Input } from 'react-native-elements';
import { screenHeight, screenWidth } from '../../GlobalStyles';
import { StatusBar } from 'expo-status-bar';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [vinNumber, setVinNumber] = useState('');
  const [nfsCode, setNfsCode] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');

  const register = () => {};

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
              type='email'
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
              type='password'
              inputContainerStyle={{
                borderBottomWidth: 0,
              }}
              onChangeText={text => setPassword(text)}
            />
            <Input
              style={styles.input}
              placeholder={'Name'}
              value={name}
              type='name'
              inputContainerStyle={{
                borderBottomWidth: 0,
              }}
              onChangeText={text => setName(text)}
            />
            <Input
              style={styles.input}
              placeholder={'Last 6 of Vehicle Vin Number'}
              value={vinNumber}
              type='vinNumber'
              inputContainerStyle={{
                borderBottomWidth: 0,
              }}
              onChangeText={text => setVinNumber(text)}
            />
            <Input
              style={styles.input}
              placeholder={'NFS Code'}
              value={nfsCode}
              type='nfsCode'
              inputContainerStyle={{
                borderBottomWidth: 0,
              }}
              onChangeText={text => setNfsCode(text)}
            />
            <Input
              style={styles.input}
              placeholder={'Profile Photo (optional)'}
              value={profilePhoto}
              type='profilePhoto'
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

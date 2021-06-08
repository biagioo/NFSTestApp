import React, { useState } from 'react';
import {
  View,
  Alert,
  Keyboard,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import { Avatar, Button, Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { screenHeight, screenWidth } from '../../GlobalStyles';

const EditProfile = props => {
  const {
    userName,
    userImage,
    userEmail,
    userVinNumber,
    userPhoneNumber,
    userProfilePic,
    setEditModalOpen,
    pickImage,
    submitProfileChanges,
  } = props;

  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [email, setEmail] = useState(userEmail);
  const [name, setName] = useState(userName);
  const [vinNumber, setVinNumber] = useState(userVinNumber);
  const [phoneNumber, setPhoneNumber] = useState(userPhoneNumber);

  const emptyState = () => {
    setEmail(userEmail);
    setPassword('');
    setPasswordAgain('');
    setName(userName);
    setVinNumber(userVinNumber);
    setPhoneNumber(userPhoneNumber);
  };

  const checkInfo = () => {
    if (!name) {
      Alert.alert('Name is Required');
    } else if (!email) {
      Alert.alert('Email is Required');
    } else if (!vinNumber) {
      Alert.alert('The Last 6 numbers of your Vehicles Vin Number is Required');
    } else if (!phoneNumber) {
      Alert.alert('Please Provide your Cell Phone Number');
    } else if (password !== passwordAgain) {
      Alert.alert('Password fields do not match');
    } else {
      submitProfileChanges(email, password, name, vinNumber, phoneNumber);
      emptyState();
      setEditModalOpen(false);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.editModal}
    >
      <TouchableOpacity
        onPress={() => setEditModalOpen(false)}
        style={styles.modalBckBtn}
      >
        <Ionicons name='arrow-back-circle-outline' size={40} color='black' />
      </TouchableOpacity>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.prfofliePicContainer}>
          {userImage ? (
            <Avatar
              rounded
              size='large'
              style={styles.profilePic}
              source={{ uri: userImage }}
            />
          ) : (
            <Avatar
              size='large'
              rounded
              icon={{ name: 'users', type: 'font-awesome' }}
              style={styles.profilePic}
              source={{ uri: userProfilePic }}
              title='Loading Picture...'
            />
          )}
        </View>
      </TouchableWithoutFeedback>
      <ScrollView scrollEnabled={true} style={styles.inputScroll}>
        <Input
          style={styles.input}
          secureTextEntry
          placeholder={'New Password'}
          value={password}
          inputContainerStyle={{
            borderBottomWidth: 0,
          }}
          onChangeText={text => setPassword(text)}
        />
        <Input
          style={styles.input}
          secureTextEntry
          placeholder={'Re-enter New Password'}
          value={passwordAgain}
          inputContainerStyle={{
            borderBottomWidth: 0,
          }}
          onChangeText={text => setPasswordAgain(text)}
        />
        <Input
          style={styles.input}
          value={phoneNumber}
          inputContainerStyle={{
            borderBottomWidth: 0,
          }}
          onChangeText={text => setPhoneNumber(text)}
        />
        <Input
          style={styles.input}
          value={email}
          inputContainerStyle={{
            borderBottomWidth: 0,
          }}
          onChangeText={text => setEmail(text)}
        />
        <Input
          style={styles.input}
          value={name}
          inputContainerStyle={{
            borderBottomWidth: 0,
          }}
          onChangeText={text => setName(text)}
        />
        <Input
          style={styles.input}
          value={vinNumber}
          inputContainerStyle={{
            borderBottomWidth: 0,
          }}
          onChangeText={text => setVinNumber(text)}
        />

        <Button
          buttonStyle={styles.button}
          title='Change Profile Picture'
          onPress={pickImage}
        />
        <Button
          buttonStyle={styles.button}
          title='Submit Profile Changes'
          onPress={() => checkInfo()}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  editModal: {
    flex: 1,
  },
  prfofliePicContainer: {
    flex: 0.7,
  },
  profilePic: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: '20%',
    alignSelf: 'center',
    width: screenWidth / 2,
    height: screenHeight / 4,
    marginTop: Platform.OS === 'android' ? '17%' : '20%',
  },
  inputScroll: {
    flex: 3,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#F6F5F5',
    borderRadius: 60,
  },
  button: {
    margin: '5%',
    backgroundColor: 'rgba(0, 0, 13, 0.76)',
    borderRadius: 30,
  },
  modalBckBtn: {
    zIndex: 3,
    width: 40,
    height: 40,
    position: 'absolute',
    marginLeft: '4%',
    marginTop: '10%',
  },
  modalInfo: {
    borderRadius: 60,
    marginBottom: '5%',
    alignSelf: 'center',
    paddingVertical: 15,
    alignItems: 'center',
    paddingHorizontal: 15,
    width: screenWidth - 60,
    height: screenHeight / 17,
    backgroundColor: '#ADB1BB',
  },
});

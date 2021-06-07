import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { screenHeight, screenWidth } from '../../GlobalStyles';

const EditProfile = props => {
  const {
    name,
    email,
    vinNumber,
    phoneNumber,
    profilePic,
    setEditModalOpen,
    pickImage,
  } = props;
  return (
    <View style={styles.editModal}>
      <TouchableOpacity
        onPress={() => setEditModalOpen(false)}
        style={styles.modalBckBtn}
      >
        <Ionicons name='arrow-back-circle-outline' size={40} color='black' />
      </TouchableOpacity>

      <Avatar
        rounded
        size={200}
        containerStyle={{ alignSelf: 'center', marginBottom: '20%' }}
        source={{
          uri: profilePic,
        }}
      />

      <View style={styles.modalInfo}>
        <Text>Name: {name}</Text>
      </View>
      <View style={styles.modalInfo}>
        <Text>Email: {email}</Text>
      </View>
      <View style={styles.modalInfo}>
        <Text>Vin Number: {vinNumber}</Text>
      </View>
      <View style={styles.modalInfo}>
        <Text>Phone Number: {phoneNumber}</Text>
      </View>

      <Button
        buttonStyle={styles.button}
        title='Change Profile Picture'
        onPress={pickImage}
      />
      <Button
        buttonStyle={styles.button}
        title='Change Password'
        onPress={() => console.log('whats one more thing to do eh?')}
      />
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  button: {
    margin: '5%',
    backgroundColor: 'rgba(0, 0, 13, 0.76)',
  },
  editModal: {
    flex: 1,
  },
  modalBckBtn: {
    zIndex: 1,
    width: 40,
    height: 40,
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

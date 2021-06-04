import React from 'react';
import { Avatar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { screenHeight, screenWidth } from '../../GlobalStyles';

const CustomerCard = props => {
  const {
    customerEmail,
    customerVinNumb,
    customerName,
    setShowCustomer,
    profilePic,
  } = props;
  return (
    <View style={styles.showCustContainer}>
      <TouchableOpacity
        onPress={() => setShowCustomer(false)}
        style={styles.custBckBtn}
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

      <View style={styles.custInfo}>
        <Text>Name: {customerName}</Text>
      </View>
      <View style={styles.custInfo}>
        <Text>Email: {customerEmail}</Text>
      </View>
      <View style={styles.custInfo}>
        <Text>Vin Number: {customerVinNumb}</Text>
      </View>
      <View style={styles.custInfo}>
        <Text>Phone Number: 999-9999</Text>
      </View>
    </View>
  );
};

export default CustomerCard;

const styles = StyleSheet.create({
  showCustContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignContent: 'center',
  },
  custBckBtn: {
    height: 40,
    width: 40,
    zIndex: 1,
    marginLeft: '4%',
    marginTop: '10%',
  },
  custInfo: {
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

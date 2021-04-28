import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-elements';
import { signOut } from '../../../actions';

const CustomerProfile = ({ navigation }) => {
  const auth = useSelector(state => state.auth);

  const { name, email, vinNumber, nfsCode } = auth;

  const dispatch = useDispatch();

  const signOutUser = () => {
    dispatch(signOut());
    navigation.replace('Log In');
  };
  return (
    <View style={styles.container}>
      <StatusBar style='dark' />
      <Text>Customer Profile</Text>
      <Text>Welcome back, {name}</Text>
      <Text>The last 6 digits of your cars Vin are: {vinNumber}</Text>
      <Text>Your email is: {email}</Text>
      <Button title='Sign Out' onPress={signOutUser} />
    </View>
  );
};

export default CustomerProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

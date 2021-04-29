import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Button } from 'react-native-elements';
import { signOut, getRealtimeUsers } from '../../../actions';
import { useDispatch } from 'react-redux';
import firebase from 'firebase';

const AdminProfile = ({ navigation }) => {
  const auth = useSelector(state => state.auth);
  const { name, email, vinNumber, nfsCode } = auth;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRealtimeUsers(firebase.auth().currentUser.uid));
  }, []);

  const signOutUser = () => {
    dispatch(signOut());
    navigation.replace('Log In');
  };

  return (
    <View style={styles.container}>
      <StatusBar style='dark' />
      <Text>Admin Profile</Text>
      <Text>Welcome back, {name}</Text>
      <Text>The last 6 digits of your cars Vin are: {vinNumber}</Text>
      <Text>Your email is: {email}</Text>
      <Button title='Sign Out' onPress={signOutUser} />
    </View>
  );
};

export default AdminProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Button } from 'react-native-elements';
import { signOut, getRealtimeUsers } from '../../../actions';
import { useDispatch } from 'react-redux';

const AdminProfile = ({ navigation }) => {
  const auth = useSelector(state => state.auth);
  const { name, email, vinNumber, nfsCode } = auth;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRealtimeUsers(nfsCode));
  }, []);

  const allowNotifications = () => {
    alert('Mate, you good with notifications?');
  };

  const signOutUser = () => {
    dispatch(signOut());
    navigation.replace('Log In');
  };

  return (
    <View style={styles.container}>
      <StatusBar style='dark' />
      <Button title='Allow notifications' onPress={allowNotifications} />
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

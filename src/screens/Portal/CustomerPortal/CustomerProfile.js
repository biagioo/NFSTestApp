import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Button } from 'react-native-elements';

const CustomerProfile = ({ navigation, user: { userInfo } }) => {
  const { name, email, vinNumber, nfsCode } = userInfo;

  const signOutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.replace('Log In');
      });
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

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(CustomerProfile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

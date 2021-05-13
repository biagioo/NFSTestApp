import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { Button } from 'react-native-elements';
import { signOut, getRealtimeUsers } from '../../../actions';
import { useDispatch } from 'react-redux';

import * as Notifications from 'expo-notifications';

import Constants from 'expo-constants';
import firebase from 'firebase';

const AdminProfile = ({ navigation }) => {
  const auth = useSelector(state => state.auth);
  const { name, email, vinNumber, nfsCode } = auth;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRealtimeUsers(nfsCode));
  }, []);

  useEffect(() => {
    if (auth.token === '') {
      registerForPushNotificationsAsync();
    }
  }, []);

  const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      if (token) {
        const res = await firebase
          .firestore()
          .collection('users')
          .doc(firebase.auth().currentUser.uid)
          .set({ token }, { merge: true });
        res;
      }
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  };

  const updateProfilePic = () => {};

  const signOutUser = () => {
    dispatch(signOut());
    navigation.replace('Log In');
  };

  return (
    <View style={styles.container}>
      <StatusBar style='dark' />
      <Text>Admin Profile</Text>
      <Image
        style={{ width: 200, height: 200 }}
        source={require('../../../../assets/images/avatar.png')}
      />
      <Button title='Update Profile Pic' onPress={updateProfilePic} />
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

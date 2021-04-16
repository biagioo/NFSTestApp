import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';

const DashboardScreen = ({ navigation }) => {
  const [data, setData] = useState({});

  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace('Log In');
    });
  };

  const getUserData = () => {
    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(snapshot => {
        if (snapshot.exists) {
          console.log(snapshot.data());
        } else {
          console.log('doesnt exist');
        }
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <StatusBar style='dark' />
        <Header navigation={navigation} />
      </View>
      <View style={styles.body}>
        <Button title='Get User Info' onPress={getUserData} />
        <Text style={{ color: 'black' }}>Dashboard Screen</Text>
        <Button title='Log out' onPress={signOutUser} />
      </View>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'black',
  },
  header: {
    flex: 1,
  },
  body: {
    flex: 2,
  },
  data: {
    flex: 1,
    backgroundColor: 'green',
    width: 400,
    height: 1000,
    bottom: 100,
  },
});

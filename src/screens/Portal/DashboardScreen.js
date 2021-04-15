import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../../../firebase';
import Header from '../../components/Header';

const DashboardScreen = ({ navigation }) => {
  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace('Log In');
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <StatusBar style='dark' />
        <Header navigation={navigation} />
      </View>
      <View style={styles.body}>
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
});

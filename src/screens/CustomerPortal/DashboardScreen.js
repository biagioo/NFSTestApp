import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { auth } from '../../../firebase';

const DashboardScreen = ({ navigation }) => {
  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace('Log In');
    });
  };

  return (
    <View style={styles.container}>
      <Text>Dashboard Screen</Text>
      <Button title='Log out' onPress={signOutUser} />
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

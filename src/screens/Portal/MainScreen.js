import { StatusBar } from 'expo-status-bar';

import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { useSelector } from 'react-redux';

const MainScreen = props => {
  const auth = useSelector(state => state.auth);

  const { navigation } = props;
  const { nfsCode } = auth;

  const enterPortal = () => {
    if (nfsCode === 'NFS_AP!') {
      navigation.replace('AdminDashboard');
    } else if (nfsCode === 'NFS_CP!') {
      navigation.replace('CustomerDashboard');
    }
  };

  console.log('in main screen', auth);

  if (auth === null) {
    return <ActivityIndicator size='large' color='black' />;
  }

  return (
    <View style={styles.container}>
      <StatusBar style='dark' />
      <View style={styles.header}>{/* nfs logo here */}</View>
      <View style={styles.body}>
        <Text>Welcome to the Performance Portal!</Text>
        <Text>Click below to enter and see updates on your vehicle.</Text>
        <Button title='Enter the Performance Portal' onPress={enterPortal} />
      </View>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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

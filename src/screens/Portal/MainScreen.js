import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { getSignedInUser } from '../../actions';

const MainScreen = props => {
  const auth = useSelector(state => state.auth);
  const { navigation } = props;
  const dispatch = useDispatch();
  const { nfsCode } = auth;

  useEffect(() => {
    if (firebase.auth().currentUser && auth.email === '') {
      dispatch(getSignedInUser());
    }
  }, []);

  const enterPortal = () => {
    if (nfsCode === 'NFS_AP!') {
      navigation.replace('AdminDashboard');
    } else if (nfsCode === 'NFS_CP!') {
      navigation.replace('CustomerDashboard');
    }
  };

  if (auth.email === null) {
    return <ActivityIndicator size='large' color='black' />;
  }

  return (
    <View style={styles.container}>
      <StatusBar style='dark' />
      <View style={styles.header}>{/* nfs logo here */}</View>
      <View style={styles.body}>
        <Text>Welcome to the Performance Portal!</Text>
        <Text>
          Please keep all conversations strictly about the progress of your
          vehicle.
        </Text>
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

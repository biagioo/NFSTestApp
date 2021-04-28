import { StatusBar } from 'expo-status-bar';

import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { useDispatch, useSelector, connect } from 'react-redux';

import { getUser } from '../../actions/userActions';

const MainScreen = props => {
  const userInfo = useSelector(state => state.user.userInfo);
  const loading = useSelector(state => state.user.loading);
  const dispatch = useDispatch();
  const { navigation } = props;

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const enterPortal = () => {
    if (userInfo.nfsCode === 'NFS_AP!') {
      navigation.replace('AdminDashboard');
    } else if (userInfo.nfsCode === 'NFS_CP!') {
      navigation.replace('CustomerDashboard');
    }
  };

  if (userInfo === null || loading) {
    return <ActivityIndicator size='large' />;
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

import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { getSignedInUser } from '../../actions';

import { Image } from 'react-native';
import { screenHeight, screenWidth } from '../../GlobalStyles';

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
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require('../../../assets/images/NFSLogo.png')}
          resizeMode='contain'
        />
        <Text style={styles.title}>Welcome to the Performance Portal!</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.bodyText}>
          Please keep all conversations strictly about the progress of your
          vehicle.
        </Text>
        <Text style={styles.bodyText}>
          Thanks for choosing Need For Speed NY.
        </Text>
      </View>
      <View style={styles.footer}>
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
    flex: 2,
  },
  logo: {
    marginTop: '12%',
    marginHorizontal: '3%',
    width: screenWidth - 30,
    height: screenHeight / 6,
  },

  title: {
    fontSize: 30,
    paddingHorizontal: '5%',
    fontWeight: '700',
    fontStyle: 'italic',
  },
  body: {
    flex: 3,
    paddingHorizontal: '5%',
  },
  bodyText: {
    fontSize: 22,
    fontWeight: '400',
    padding: 10,
  },
  footer: {
    flex: 1,
  },
});

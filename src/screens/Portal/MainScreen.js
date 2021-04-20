import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
// import { useNavigation } from '@react-navigation/native';

import { getUser } from '../../actions/userActions';
// import Header from '../../components/Header';

const MainScreen = props => {
  // const { email, name, nfsCode, vinNumber } = userInfo;
  const {
    navigation,
    user: { userInfo },
    getUser,
  } = props;

  useEffect(() => {
    getUser();
  }, []);

  const signOutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.navigate('Log In');
      });
  };

  const getUserData = () => {
    console.log('userInfo', userInfo);
  };

  return (
    <View style={styles.container}>
      <StatusBar style='dark' />
      <View style={styles.header}>
        {/* <Header navigation={navigation} /> */}
      </View>
      <View style={styles.body}>
        <Button title='Get User Info' onPress={getUserData} />
        <Text style={{ color: 'black' }}>Hey</Text>
        <Button title='Log out' onPress={signOutUser} />
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  user: state.user,
});

// export default MainScreen;
export default connect(mapStateToProps, { getUser })(MainScreen);

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

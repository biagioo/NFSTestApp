import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Header from '../components/Header';

const CustomerPortal = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.body}>
        <Text style={styles.text}>Customer Portal</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  body: {
    flex: 4,
    justifyContent: 'center',
    alignContent: 'center',
  },
  text: {
    color: 'white',
    alignSelf: 'center',
  },
});
export default CustomerPortal;

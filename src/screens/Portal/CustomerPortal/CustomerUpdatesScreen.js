import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import { useSelector } from 'react-redux';
import { Button } from 'react-native';

const CustomerUpdatesScreen = () => {
  const auth = useSelector(state => state.auth);

  const listAllUpdates = () => {
    firebase
      .storage()
      .ref('images/')
      .child(`${auth.email}/`)
      .listAll()
      .then(res => {
        res.items.forEach(itemRef => {
          console.log('ItemRef', itemRef);
        });
      })
      .catch(error => {
        console.log('uh oh', error);
      });
  };

  // console.log(storageRef);
  return (
    <View style={styles.container}>
      <Text>Your Updates</Text>
      <Button title='ListAllUpdates' onPress={listAllUpdates} />
    </View>
  );
};

export default CustomerUpdatesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

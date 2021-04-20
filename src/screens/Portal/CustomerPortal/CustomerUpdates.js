import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const CustomerUpdates = () => {
  return (
    <View style={styles.container}>
      <Text>Customer Updates</Text>
    </View>
  );
};

export default CustomerUpdates;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

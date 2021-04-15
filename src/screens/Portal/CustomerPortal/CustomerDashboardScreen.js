import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const CustomerDashboardScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Customer Portal</Text>
    </View>
  );
};

export default CustomerDashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'black',
  },
});

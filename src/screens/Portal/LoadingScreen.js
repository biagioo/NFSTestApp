import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';

const LoadingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar style='dark' />
      <ActivityIndicator size='large' />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

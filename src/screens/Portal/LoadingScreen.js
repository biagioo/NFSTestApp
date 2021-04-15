import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { auth, db } from '../../../firebase';

export default function LoadingScreen({ navigation }) {
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace('Dashboard');
      } else {
        navigation.replace('Log In');
      }
    });
  });

  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

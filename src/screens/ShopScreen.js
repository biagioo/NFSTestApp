import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Header from '../components/Header';
import { WebView } from 'react-native-webview';

const ShopScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header navigation={navigation} />
      </View>
      <View style={styles.body}>
        <WebView source={{ uri: 'https://www.nfsperformance.com/' }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: { flex: 1 },
  body: {
    flex: 4,
  },
});
export default ShopScreen;

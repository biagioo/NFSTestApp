import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const MenuScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.pressable}
        title='Home'
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.text}>testing...</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  pressable: {
    backgroundColor: 'yellow',
  },
  text: {
    color: 'white',
  },
});

export default MenuScreen;

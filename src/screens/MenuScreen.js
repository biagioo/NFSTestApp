import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { screenHeight, screenWidth } from '../GlodalStyles';

const MenuScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.pressable}
        title='Home'
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={{ color: 'white' }}>BackButton</Text>
      </Pressable>
      <View style={styles.content}>
        <Text style={styles.text}>testing...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  pressable: {
    flex: 2,
    height: 40,
    width: 80,
    marginTop: '30%',
    marginLeft: '80%',
    alignSelf: 'center',
    position: 'absolute',
    // backgroundColor: 'white',
  },
  content: {
    justifyContent: 'flex-start',
    alignItems: 'baseline',
  },
  text: {
    marginTop: '20%',
    marginLeft: '5%',
    color: 'white',
    // backgroundColor: 'white',
  },
});

export default MenuScreen;

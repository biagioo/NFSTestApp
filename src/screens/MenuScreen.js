import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { MaterialIcons } from '@expo/vector-icons';
import { screenHeight, screenWidth } from '../GlobalStyles';

const MenuScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.backBtn}
          title='Home'
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name='chevron-left' size={40} color='white' />
        </Pressable>
        <Text style={styles.title}>Need For Speed NY</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.text}>Evo 7/8/9 Parts</Text>
        <Text style={styles.text}>Evo X Parts</Text>
        <Text style={styles.text}>Shop Apparel</Text>
        <Text style={styles.text}>Contact Us</Text>
        <Text style={styles.text}>Customer Portal</Text>
        <Text style={styles.text}>Social Media</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flex: 1,
    width: screenWidth - 10,
    marginTop: screenHeight / 13,
  },
  backBtn: {
    zIndex: 2,
    position: 'absolute',
    alignSelf: 'flex-end',
  },
  title: {
    fontSize: 32,
    color: 'white',
    marginLeft: '3%',
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
  body: {
    flex: 8,
    marginLeft: '5%',
    alignItems: 'baseline',
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 28,
    color: 'white',
    marginBottom: '5%',
  },
});

export default MenuScreen;

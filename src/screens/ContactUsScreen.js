import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import MapView from 'react-native-maps';
import Header from '../components/Header';
import { screenHeight, screenWidth } from '../GlobalStyles';

const ContactUs = ({ navigation }) => {
  const onPressSocialMedia = () => {
    console.warn('social media pop out here');
  };
  const onPressContactUs = () => {
    console.warn('ask to call 516-887-2601 pop out here');
  };
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.btnContainer}>
        <TouchableHighlight
          style={styles.socialBtn}
          onPress={onPressSocialMedia}
        >
          <Text style={{ fontWeight: '600' }}>Social Media</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.socialBtn} onPress={onPressContactUs}>
          <Text style={{ fontWeight: '600' }}>Contact Us</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.body}>
        <Text style={styles.address}>
          192 Horton Ave Lynbrook, Nassau County 11563 USA
        </Text>
      </View>
      <MapView style={styles.map} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    // justifyContent: 'center',
    // alignContent: 'center',
  },
  btnContainer: {
    flex: 3,
    marginTop: '40%',
  },
  body: {
    flex: 2,
    marginHorizontal: screenWidth / 25,
    justifyContent: 'center',
    alignContent: 'center',
    // backgroundColor: 'blue',
  },
  address: {
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center',
  },
  socialBtn: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 60,
    height: screenHeight / 17,
    width: screenWidth - 130,
    marginBottom: '5%',
  },
  map: {
    flex: 3,
    // justifyContent: 'center',
    alignSelf: 'center',
    width: screenWidth - 20,
    height: screenHeight - 100,
    marginBottom: '40%',
  },
});
export default ContactUs;

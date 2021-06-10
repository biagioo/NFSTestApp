import React from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as Linking from 'expo-linking';
import Header from '../components/Header';
import { screenHeight, screenWidth } from '../GlobalStyles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Touchable } from 'react-native';

const ContactUs = ({ navigation }) => {
  const onPressContactUs = () => {
    // console.warn('ask to call 516-887-2601 pop out here');

    Linking.openURL('tel:+15168872601');
  };

  const onPressFacebook = () => {
    Linking.openURL(
      'https://www.facebook.com/Need-for-speed-ny-1677742482333132/'
    );
  };
  const onPressInstagram = () => {
    Linking.openURL('https://www.instagram.com/needforspeed_ny/');
  };

  const openMap = () => {
    if (Platform.OS === 'android') {
      Linking.openURL(
        'http://maps.google.com/maps?daddr=192+horton+avenue+lynbrook+ny+11563'
      );
    } else {
      Linking.openURL(
        'http://maps.apple.com/maps?daddr=192+horton+avenue+lynbrook+ny+11563'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.btnContainer}>
        <TouchableHighlight style={styles.socialBtn} onPress={onPressContactUs}>
          <Text style={{ fontWeight: '600' }}>Call the Shop</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.socialBtn} onPress={onPressFacebook}>
          <Text style={{ fontWeight: '600' }}>Facebook</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.socialBtn} onPress={onPressInstagram}>
          <Text style={{ fontWeight: '600' }}>Instagram</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.socialBtn} onPress={openMap}>
          <Text style={{ fontWeight: '600' }}>Visit Us</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.body}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 40.6636692,
            longitude: -73.6876748,
            latitudeDelta: 0.02,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{ latitude: 40.6636692, longitude: -73.6876748 }}
          />
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  btnContainer: {
    flex: 2,
    marginTop: '30%',
  },
  socialBtn: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 60,
    height: screenHeight / 17,
    width: '80%',
    marginBottom: '5%',
  },
  body: {
    flex: 3,
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: '30%',
  },
  addressBtn: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 60,
    height: screenHeight / 17,
    width: '70%',
    textAlign: 'center',
    // top: 90,
  },
  map: {
    alignSelf: 'center',
    width: '95%',
    height: '80%',
    top: 100,
  },
});
export default ContactUs;

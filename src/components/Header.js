import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { screenWidth, screenHeight } from '../GlobalStyles';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { StatusBar } from 'expo-status-bar';

const Header = ({ navigation }) => {
  const onPressHandler = () => {
    navigation.openDrawer();
  };
  return (
    <View style={styles.header}>
      <StatusBar style='light' />
      <Image
        style={styles.logo}
        source={require('../../assets/images/NFSLogo.png')}
        resizeMode='contain'
      />
      <Pressable onPress={onPressHandler} style={styles.drawerBtn}>
        <MaterialIcons name='dehaze' size={30} color='white' />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: 'black',
  },
  drawerBtn: {
    position: 'absolute',
    zIndex: 1,
    marginTop: '15%',
    marginLeft: '2%',
  },
  logo: {
    marginTop: '12%',
    marginHorizontal: '3%',
    width: screenWidth - 30,
    height: screenHeight / 6,
  },
});

export default Header;

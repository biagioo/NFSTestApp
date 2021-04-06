import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { screenWidth, screenHeight } from '../GlodalStyles';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const Header = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <Pressable
        onPress={() => navigation.navigate('Menu')}
        style={styles.icon}
      >
        <MaterialIcons name='dehaze' size={30} color='white' />
      </Pressable>
      <Image
        style={styles.logo}
        source={require('../../assets/images/NFSLogo.png')}
        resizeMode='contain'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
  },
  button: {
    padding: 20,
    borderRadius: 5,
    backgroundColor: 'blue',
  },
  icon: {
    position: 'absolute',
    zIndex: 1,
    height: '5%',
    marginTop: '15%',
    marginLeft: '1%',
    paddingHorizontal: '2%',
  },
  logo: {
    alignSelf: 'center',
    marginTop: '12%',
    width: screenWidth - 50,
    height: screenHeight / 6,
  },
});

export default Header;

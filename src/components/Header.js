import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { screenWidth, screenHeight } from '../GlodalStyles';
const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.icon}>
        <MaterialIcons name='dehaze' size={30} color='white' />
      </View>
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
  icon: {
    position: 'absolute',
    marginTop: '15%',
    marginHorizontal: 17,
  },
  logo: {
    marginTop: '12%',
    height: screenHeight / 6,
    width: screenWidth - 50,
    alignSelf: 'center',
  },
});

export default Header;

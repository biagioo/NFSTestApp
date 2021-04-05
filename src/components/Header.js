import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

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
    marginTop: 70,
    marginHorizontal: 17,
  },
  logo: {
    marginTop: 10,
    height: 250,
    width: 350,
    alignSelf: 'center',
  },
});

export default Header;

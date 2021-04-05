import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
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
    alignItems: 'center',
  },
  logo: {
    marginTop: 10,
    height: 250,
    width: 350,
  },
});

export default Header;

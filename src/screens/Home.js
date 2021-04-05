import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

const Home = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/images/NFSLogo.png')}
        resizeMode='contain'
      />
      <Text style={styles.text}>
        Since opening our doors in August of 2015, NFS Performance has been
        offering our customers the best selection of high performance parts and
        service. Our online store offers the best quality after market parts
        that are tried and tested by our track experience. We work along side
        most of the manufacturers to help continue improving the performance and
        reliability of all the parts that we sell. We aim to bring you the
        highest quality service and parts at the most affordable price. Stop by
        the shop or enjoy shopping online.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  logo: {
    width: 350,
    height: 220,
  },
  text: {
    color: 'white',
    paddingHorizontal: 15,
    fontSize: 18,
  },
});

export default Home;

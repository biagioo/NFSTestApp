import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import Header from '../components/Header';
import { screenWidth } from '../GlobalStyles';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.scrollViewContainer}>
        <ScrollView>
          <Image
            style={styles.img}
            source={require('../../assets/images/CrisEvo.png')}
          />
          <Text style={styles.text}>
            Since opening our doors in August of 2015, NFS Performance has been
            offering our customers the best selection of high performance parts
            and service.
          </Text>
          <Image
            style={styles.img}
            source={require('../../assets/images/DragEvo.png')}
          />
          <Text style={styles.text}>
            Our online store offers the best quality after market parts that are
            tried and tested by our track experience. We work along side most of
            the manufacturers to help continue improving the performance and
            reliability of all the parts that we sell.
          </Text>
          <Image
            style={styles.img}
            source={require('../../assets/images/MikeyEvo.png')}
          />
          <Text style={styles.text}>
            We aim to bring you the highest quality service and parts at the
            most affordable price. Stop by the shop or enjoy shopping online.
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  scrollViewContainer: {
    flex: 4,
    paddingTop: 20,
    alignItems: 'center',
  },

  img: {
    width: screenWidth - 10,
    alignSelf: 'center',
  },

  text: {
    flex: 2,
    color: 'white',
    fontWeight: '400',
    fontSize: 18,
    paddingTop: 10,
    paddingBottom: 30,
    marginHorizontal: 10,
  },
});

export default Home;

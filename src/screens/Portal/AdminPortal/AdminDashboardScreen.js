import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { connect } from 'react-redux';

// tab navi

const AdminDashboardScreen = props => {
  const {
    user: { userInfo },
  } = props;
  return (
    <View style={styles.container}>
      <Text>Admin Portal</Text>
      <Text>{userInfo.email}</Text>
      <Text>{userInfo.vinNumber}</Text>
      <Text>{userInfo.name}</Text>
    </View>
  );
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(AdminDashboardScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'black',
  },
});

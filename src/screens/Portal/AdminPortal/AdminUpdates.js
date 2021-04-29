import React from 'react';
import { ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import CustomListItem from '../../../components/Portal/CustomListItem';
import firebase from 'firebase';

const AdminUpdates = () => {
  const users = useSelector(state => state.user.users);
  const auth = useSelector(state => state.auth);
  const initChat = customerId => {
    const groupIds = {
      adminId: firebase.auth().currentUser.uid,
      customerId,
    };
  };

  if (users === []) {
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size='large' color='#00ff00' />
    </View>;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      {users.map((user, index) => (
        <CustomListItem
          key={index}
          index={index}
          user={user}
          initChat={initChat}
        />
      ))}
    </ScrollView>
  );
};

export default AdminUpdates;

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    paddingTop: '15%',
  },

  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

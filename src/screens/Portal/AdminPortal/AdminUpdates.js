import React from 'react';
import { ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { createGroup } from '../../../actions';
import CustomListItem from '../../../components/Portal/CustomListItem';

const AdminUpdates = ({ navigation }) => {
  const users = useSelector(state => state.group.users);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const initChat = customer => {
    const groupInfo = {
      adminId: auth.uid,
      adminName: auth.name,
      customerId: customer.uid,
      customerEmail: customer.email,
      customerName: customer.name,
      customerVinNumb: customer.vinNumber,
    };

    dispatch(createGroup(groupInfo));
    navigation.navigate('ChatScreen', { ...groupInfo });
  };

  if (users === []) {
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size='large' color='#00ff00' />
    </View>;
  }
  // console.log(navigation);
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

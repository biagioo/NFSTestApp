import React from 'react';
import { ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import { StyleSheet, View } from 'react-native';
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
      token: customer.token,
    };

    dispatch(createGroup(groupInfo));
    navigation.navigate('AdminChatScreen', { ...groupInfo });
  };

  if (users === []) {
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size='large' color='#00ff00' />
    </View>;
  }
  // console.log(navigation);
  return (
    <SafeAreaView styl={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {users.map((user, index) => (
          <CustomListItem
            key={index}
            index={index}
            user={user}
            chat={initChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminUpdates;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    height: '90%',
  },

  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

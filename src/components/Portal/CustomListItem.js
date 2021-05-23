import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { useSelector } from 'react-redux';

const CustomListItem = ({ index, user, chat }) => {
  const { name, uid, nfsCode, vinNumber, email, profilePic } = user;
  const notification = useSelector(state => state.group.newNotification);
  const [newMsg, setnewMsg] = useState(false);

  const showMsgNoti = value => {
    setnewMsg(value);
  };

  return (
    <ListItem onPress={() => chat(user)} key={index} bottomDivider>
      {profilePic ? (
        <Avatar
          rounded
          source={{
            uri: profilePic,
          }}
        />
      ) : (
        <Avatar
          rounded
          source={{
            uri: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
          }}
        />
      )}
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: '800' }}>{name}</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
          {nfsCode === 'NFS_AP!' ? 'Admin' : `Vin Number: ${vinNumber}`}
        </ListItem.Subtitle>
        {newMsg ? <View style={styles.newMsgNotificationCircle}></View> : null}
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({
  newMsgNotificationCircle: {
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 80,
    alignSelf: 'flex-end',
    position: 'absolute',
  },
});

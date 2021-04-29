import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';

const CustomListItem = ({
  index,
  user: { name, uid, nfsCode, vinNumber },
  initchat,
}) => {
  //   const [chatMessages, setChatMessages] = useState([]);

  //   useEffect(() => {
  //     const unsubscribe = db
  //       .collection('chats')
  //       .doc(id)
  //       .collection('messages')
  //       .orderBy('timestamp', 'desc')
  //       .onSnapshot(snapshot =>
  //         setChatMessages(snapshot.docs.map(doc => doc.data()))
  //       );

  //     return unsubscribe;
  //   });

  return (
    <ListItem onPress={() => console.log(uid)} key={index} bottomDivider>
      <Avatar
        rounded
        source={{
          uri:
            'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: '800' }}>{name}</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
          {nfsCode === 'NFS_AP!' ? 'Admin' : `Vin Number: ${vinNumber}`}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});

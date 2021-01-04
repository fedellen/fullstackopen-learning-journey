import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Heading from '../Styled/Heading';
import Text from '../Styled/Text';
import Tag from '../Styled/Tag';

const styles = StyleSheet.create({
  gitHubPic: {
    height: 75,
    width: 75,
    borderRadius: 50,
    flexGrow: 0
  },

  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  headers: {
    flexGrow: 1,
    paddingRight: 80,
    paddingTop: 15,
    paddingLeft: 15
  }
});

const RepoItemHeader = ({ repo }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.gitHubPic} source={{ uri: repo.ownerAvatarUrl }} />
      <View style={styles.headers}>
        <Heading>{repo.fullName}</Heading>
        <Text>{repo.description}</Text>
        <Tag text={repo.language} />
      </View>
    </View>
  );
};

export default RepoItemHeader;

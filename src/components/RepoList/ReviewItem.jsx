import React from 'react';
import { View, StyleSheet } from 'react-native';
import theme from '../../theme';
import Heading from '../Styled/Heading';
import Text from '../Styled/Text';

const ReviewItem = ({ review }) => {
  if (!review) return null;

  return (
    <View style={styles.reviewItem}>
      <View style={styles.rating}>
        <Heading>{review.rating}</Heading>
      </View>

      <View style={{ flex: 1, padding: 5 }}>
        <View style={styles.textSpacing}>
          <Heading>{review.user.username}</Heading>
        </View>
        <View style={styles.textSpacing}>
          <Text>{review.createdAt}</Text>
        </View>
        <View style={styles.textSpacing}>
          <Text color='darkText'>{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewItem: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 20,
    paddingVertical: 30,
    paddingLeft: 10,
    paddingRight: 40,
    marginVertical: 20,
    borderColor: theme.colors.primary,
    borderWidth: 3,
    flexDirection: 'row',
    flex: 0
  },

  rating: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.colors.primary,
    borderWidth: 3,
    color: theme.colors.textSecondary,
    marginRight: 15
  },

  textSpacing: {
    paddingVertical: 2
  }
});

export default ReviewItem;

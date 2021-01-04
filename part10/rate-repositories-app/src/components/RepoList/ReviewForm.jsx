import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

import { View } from 'react-native';
import Button from '../Styled/Button';
import FormikTextInput from '../Styled/FormikTextInput';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_REVIEW } from '../../graphql/mutations';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useHistory } from 'react-router-native';

const ReviewForm = () => {
  const [mutate] = useMutation(CREATE_REVIEW);
  const history = useHistory();

  const initialValues = {
    repoUsername: '',
    repoName: '',
    ratingString: '',
    review: ''
  };

  const validationSchema = yup.object().shape({
    repoUsername: yup
      .string()
      .required('Repository owner username is required..'),
    repoName: yup.string().required('Repository name is required..'),
    ratingString: yup
      .number()
      .min(0, 'Must be a number between 0 and 100..')
      .max(100, 'Must be a number between 0 and 100..')
      .required('Rating is a required field..'),
    review: yup.string()
  });

  const onSubmit = async ({ repoUsername, repoName, ratingString, review }) => {
    const rating = parseInt(ratingString);
    try {
      const { data } = await mutate({
        variables: { repoUsername, repoName, rating, review }
      });
      console.log('Thanks for submitting a review 🔥');
      history.push(`/repo/${data.createReview.repositoryId}`);
    } catch (error) {
      console.log('We have an error here in ReviewForm => onSubmit 😲', error);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <Formik
        onSubmit={(values) => onSubmit(values)}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        {({ handleSubmit }) => (
          <View style={{ padding: 30 }}>
            <FormikTextInput
              name='repoUsername'
              placeholder='Repository owner name'
            />
            <FormikTextInput name='repoName' placeholder='Repository name' />
            <FormikTextInput
              name='ratingString'
              placeholder='Rating between 0 and 100'
            />
            <FormikTextInput name='review' placeholder='Write your review?' />
            <Button text='Create a review' onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );
};

export default ReviewForm;

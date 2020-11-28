import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

import { View } from 'react-native';
import Button from '../Styled/Button';
import FormikTextInput from '../Styled/FormikTextInput';

const ReviewForm = () => {
  const initialValues = {
    repoUsername: '',
    repoName: '',
    rating: '',
    review: ''
  };

  const validationSchema = yup.object().shape({
    repoUsername: yup
      .string()
      .required('Repository owner username is required..'),
    repoName: yup.string().required('Repository name is required..'),
    rating: yup
      .number()
      .min(0, 'Must be a number between 0 and 100..')
      .max(100, 'Must be a number between 0 and 100..')
      .required('Rating is a required field..'),
    review: yup.string()
  });

  const onSubmit = () => console.log('You passed validiation!');

  return (
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
            name='rating'
            placeholder='Rating between 0 and 100'
          />
          <FormikTextInput name='review' placeholder='Write your review?' />
          <Button text='Create a review' onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

export default ReviewForm;

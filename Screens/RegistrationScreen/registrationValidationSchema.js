import * as yup from 'yup';

export const registrationValidationSchema = yup.object().shape({
  login: yup.string().required('Login is Required'),
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

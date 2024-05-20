// src/components/auth/RegisterModal.tsx
import React from 'react';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikHelpers,
  FormikProps,
} from 'formik';
import * as Yup from 'yup';
import useAuthStore from '@/store/useAuthStore';
import useModalStore from '@/store/useModalStore';
import { Button } from 'baseui/button';
import { StyledLink } from 'baseui/link';
import { ArrowRight } from 'baseui/icon';
import CustomInput from '@/components/ui/CustomInput';
import useApiStore from '@/store/useApiStore';

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too Short!').required('Required'),
});

const RegisterModal: React.FC = () => {
  const { register } = useApiStore();
  const { setAuth } = useAuthStore();
  const { closeModal, openAuthModal } = useModalStore();
  const handleSubmit = async (
    values: RegisterFormValues,
    { setSubmitting, setErrors }: FormikHelpers<RegisterFormValues>
  ) => {
    try {
      await register(values);
      closeModal();
    } catch (error) {
      setErrors({ email: 'Email is already taken' });
    }
    setSubmitting(false);
  };

  return (
    <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-2xl">Register</h2>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={RegisterSchema}
        onSubmit={handleSubmit}
      >
        {(props: FormikProps<RegisterFormValues>) => (
          <Form>
            <div className="mb-4">
              <CustomInput label={'Name'} name={'name'} type={'text'} />
            </div>
            <div className="mb-4">
              <CustomInput label={'E-mail'} name={'email'} type={'email'} />
            </div>
            <div className="mb-4">
              <CustomInput
                label={'Password'}
                name={'password'}
                type={'password'}
              />
            </div>
            <Button
              type="submit"
              isLoading={props.isSubmitting}
              endEnhancer={() => <ArrowRight size={24} />}
              className="w-full"
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
      <Button
        onClick={closeModal}
        kind={'secondary'}
        className="bg-gray-500 hover:bg-gray-600 !my-4 w-full rounded-lg py-2 text-white transition duration-200"
      >
        Close
      </Button>
      <div className="cursor-pointer text-center">
        <StyledLink onClick={openAuthModal}>
          Already have an account? Login <ArrowRight size={20} />
        </StyledLink>
      </div>
    </div>
  );
};

export default RegisterModal;

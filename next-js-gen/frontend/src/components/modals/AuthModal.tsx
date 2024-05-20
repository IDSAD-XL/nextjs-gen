// src/components/auth/AuthModal.tsx
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

interface AuthFormValues {
  email: string;
  password: string;
}

const AuthSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too Short!').required('Required'),
});

const AuthModal: React.FC = () => {
  const { login } = useApiStore();
  const { closeModal, openRegisterModal } = useModalStore();

  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (
    values: AuthFormValues,
    { setSubmitting, setErrors }: FormikHelpers<AuthFormValues>
  ) => {
    try {
      await login(values);
      closeModal();
    } catch (error) {
      // @ts-ignore
      const data = error?.response?.data?.message;
      if (data) {
        setError(data);
      }
    }
    setSubmitting(false);
  };

  return (
    <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-2xl">Login</h2>
      {error && <p className="mb-4 text-sm text-red-medium">{error}</p>}
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={AuthSchema}
        onSubmit={handleSubmit}
      >
        {(props: FormikProps<AuthFormValues>) => (
          <Form>
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
              Login
            </Button>
          </Form>
        )}
      </Formik>
      <Button kind={'secondary'} onClick={closeModal} className="!my-4 w-full">
        Close
      </Button>
      <div className="cursor-pointer text-center">
        <StyledLink onClick={openRegisterModal}>
          Don't have an account? Register <ArrowRight size={20} />
        </StyledLink>
      </div>
    </div>
  );
};

export default AuthModal;

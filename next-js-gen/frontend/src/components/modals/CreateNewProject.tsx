import React from 'react';
import useAuthStore from '@/store/useAuthStore';
import useModalStore from '@/store/useModalStore';
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { login } from '@/utils/auth';
import CustomInput from '@/components/ui/CustomInput';
import { Button } from 'baseui/button';
import * as Yup from 'yup';
import { ArrowRight } from 'baseui/icon';
import { createNewProject } from '@/utils/createNewProject';
import useApiStore from '@/store/useApiStore';

interface CreateNewProjectFormValues {
  name: string;
}

const CreateNewProjectSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name must contain at least 3 chars')
    .required('Required'),
});

const CreateNewProject = () => {
  const { closeModal } = useModalStore();
  const { createNewProject, getProjectsByUser } = useApiStore();

  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (
    values: CreateNewProjectFormValues,
    { setSubmitting, setErrors }: FormikHelpers<CreateNewProjectFormValues>
  ) => {
    try {
      await createNewProject(values);
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
      <h2 className="mb-4 text-2xl">New project</h2>
      {error && <p className="mb-4 text-sm text-red-medium">{error}</p>}
      <Formik
        initialValues={{ name: '' }}
        validationSchema={CreateNewProjectSchema}
        onSubmit={handleSubmit}
      >
        {(props: FormikProps<CreateNewProjectFormValues>) => (
          <Form>
            <div className="mb-4">
              <CustomInput label={'Name'} name={'name'} type={'text'} />
            </div>
            <Button
              type="submit"
              isLoading={props.isSubmitting}
              endEnhancer={() => <ArrowRight size={24} />}
              className="w-full"
            >
              Create new project
            </Button>
          </Form>
        )}
      </Formik>
      <Button kind={'secondary'} onClick={closeModal} className="!my-4 w-full">
        Close
      </Button>
    </div>
  );
};

export default CreateNewProject;

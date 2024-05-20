import axios from 'axios';

export const createNewProject = async (project: { name: string }) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/projects/`,
    project
  );
  return response.data;
};

// src/utils/auth.ts
import axios from 'axios';

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
    credentials
  );
  return response.data;
};

export const register = async (credentials: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
    credentials
  );
  return response.data;
};

export const checkToken = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/check-token`,
        { token }
      );
      if (response.data.valid) {
        const { user } = response.data;
        return { token, user };
      } else {
        const refreshResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/users/refresh-token`,
          {
            token,
          }
        );
        const newToken = refreshResponse.data.token;
        const newUser = refreshResponse.data.user;
        localStorage.setItem('token', newToken);
        return { token: newToken, user: newUser };
      }
    } catch (error) {
      console.error(error);
    }
  }
  return null;
};

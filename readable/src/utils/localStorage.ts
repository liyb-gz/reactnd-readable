import { LoginData } from '../store/userSlice';

export const saveLoginData = (loginData: LoginData) => {
  localStorage.setItem('userData', JSON.stringify(loginData));
};

export const deleteLoginData = () => {
  localStorage.removeItem('userData');
};

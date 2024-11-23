import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({
  token: '',
  updateToken: (token: string) => {},
  login: '',
  updateUserName: (userName: string) => {},
  password: '',
  updatePassword: (password: string) => {},
  email: '',
  updateEmail: (email: string) => {},
  logout: () => {},
  isCreateOfferInProgress: false,
  setIsCreateOfferInProgress: (inProgress: boolean) => {},
  isDeleteOfferInProgress: false,
  setIsDeleteOfferInProgress: (inProgress: boolean) => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string>('');
  const [login, setLogin] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isCreateOfferInProgress, setIsCreateOfferInProgress] = useState(false);
  const [isDeleteOfferInProgress, setIsDeleteOfferInProgress] = useState(false);
  const [password, setPassword] = useState<string>('');

  const loadData = async () => {
    const savedToken = await AsyncStorage.getItem('token');
    const savedLogin = await AsyncStorage.getItem('login');
    const savedPassword = await AsyncStorage.getItem('password');
    const savedEmail = await AsyncStorage.getItem('email');

    if (savedToken) setToken(savedToken);
    if (savedLogin) setLogin(savedLogin);
    if (savedPassword) setPassword(savedPassword);
    if (savedEmail) setEmail(savedEmail);
  };

  useEffect(() => {
    loadData();
  }, []);

  const updateToken = async (newToken: string) => {
    setToken(newToken);
    await AsyncStorage.setItem('token', newToken);
  };

  const updateUserName = async (newLogin: string) => {
    setLogin(newLogin);
    await AsyncStorage.setItem('login', newLogin);
  };
  
  const updateEmail = async (newEmail: string) => {
    setEmail(newEmail);
    await AsyncStorage.setItem('email', newEmail);
  };

  const updatePassword = async (newPassword: string) => {
    setPassword(newPassword);
    await AsyncStorage.setItem('password', newPassword);
  };

  const logout = async () => {
    setToken('');
    setLogin('');
    setPassword('');
    await AsyncStorage.multiRemove(['token', 'login', 'password']);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        updateToken,
        login,
        updateUserName,
        password,
        updatePassword,
        email,
        updateEmail,
        logout,
        isCreateOfferInProgress,
        setIsCreateOfferInProgress,
        isDeleteOfferInProgress,
        setIsDeleteOfferInProgress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

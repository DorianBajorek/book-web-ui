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
  phoneNumber: '',
  updatePhoneNumber: (phoneNumber: string) => {},
  logout: () => {},
  isCreateOfferInProgress: false,
  setIsCreateOfferInProgress: (inProgress: boolean) => {},
  isDeleteOfferInProgress: false,
  setIsDeleteOfferInProgress: (inProgress: boolean) => {},
  isDeleteUserInProgress: false,
  setIsDeleteUserInProgress: (inProgress: boolean) => {},
  deleteUserDetails: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string>('');
  const [login, setLogin] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber ] = useState<string>('');
  const [isCreateOfferInProgress, setIsCreateOfferInProgress] = useState(false);
  const [isDeleteOfferInProgress, setIsDeleteOfferInProgress] = useState(false);
  const [isDeleteUserInProgress, setIsDeleteUserInProgress] = useState(false);
  const [password, setPassword] = useState<string>('');

  const loadData = async () => {
    const savedToken = await AsyncStorage.getItem('token');
    const savedLogin = await AsyncStorage.getItem('login');
    const savedPassword = await AsyncStorage.getItem('password');
    const savedEmail = await AsyncStorage.getItem('email');
    const savedPhoneNumber = await AsyncStorage.getItem('phoneNumber');

    if (savedToken) setToken(savedToken);
    if (savedLogin) setLogin(savedLogin);
    if (savedPassword) setPassword(savedPassword);
    if (savedEmail) setEmail(savedEmail);
    if (savedPhoneNumber) setPhoneNumber(savedPhoneNumber);
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

  const updatePhoneNumber = async (newPhoneNumber: string) => {
    setPhoneNumber(newPhoneNumber);
    await AsyncStorage.setItem('phoneNumber', newPhoneNumber);
  };

  const updatePassword = async (newPassword: string) => {
    setPassword(newPassword);
    await AsyncStorage.setItem('password', newPassword);
  };

  const logout = async () => {
    deleteUserDetails();
    await AsyncStorage.multiRemove(['token', 'login', 'password', 'email', 'phoneNumber']);
  };

  const deleteUserDetails = async () => {
    setToken('');
    setLogin('');
    setPassword('');
    setEmail('');
    setPhoneNumber('');
    await AsyncStorage.multiRemove(['token', 'login', 'password', 'email', 'phoneNumber']);
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
        phoneNumber,
        updatePhoneNumber,
        logout,
        isCreateOfferInProgress,
        setIsCreateOfferInProgress,
        isDeleteOfferInProgress,
        setIsDeleteOfferInProgress,
        isDeleteUserInProgress,
        setIsDeleteUserInProgress,
        deleteUserDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegistrationScreen from './screens/drawerScreens/RegisterScreen';
import LoginScreen from './screens/drawerScreens/LoginScreen';
import Welcome from './screens/drawerScreens/landingScreen';
import ForgotPasswordScreen from './screens/drawerScreens/ForgotPasswordScreen';
import ResetPasswordCodeScreen from './screens/drawerScreens/ResetPasswordCode';
import UpdatePasswordScreen from './screens/drawerScreens/UpdatePasswordScreen';
import HomePage from './HomePage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './AuthContext';
import { useAuth } from './AuthContext';
const Stack = createStackNavigator();

export default function AuthScreen() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

const AppNavigator = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  useEffect(() => {
    const checkToken = async () => {
      try {
        const tokenString = await AsyncStorage.getItem('userData');
        if (tokenString) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking token:', error);
      }
    };

    checkToken();
  }, [setIsAuthenticated]);

  return (
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="HomePage" component={HomePage} />
          
        </>
      ) : (
        <>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
          <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
          <Stack.Screen name="ResetCodeScreen" component={ResetPasswordCodeScreen} />
          <Stack.Screen name="UpdatePasswordScreen" component={UpdatePasswordScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}